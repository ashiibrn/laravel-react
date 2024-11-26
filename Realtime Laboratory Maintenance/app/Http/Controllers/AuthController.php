<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Login the user and return the token for API with role-based redirection.
     *
     * @param LoginRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginRequest $request)
    {
        $data = $request->validated();

        // Check if the user is already logged in
        if (Auth::check()) {
            return response()->json([
                'message' => 'User already logged in.',
                'user' => Auth::user(),
                'token' => Auth::user()->currentAccessToken()->plainTextToken, // Return the current token
            ]);
        }

        // Attempt to authenticate user using provided credentials
        if (!Auth::attempt(['email' => $data['email'], 'password' => $data['password']])) {
            return response()->json([ 
                'message' => 'The provided credentials are incorrect.',
            ], 401);
        }

        $user = Auth::user();

        // Create a new token for the user
        $token = $user->createToken('main')->plainTextToken;

        // Redirect based on user role
        $redirectUrl = $this->getRedirectUrlByRole($user->position);

        return response()->json([
            'user' => $user,
            'token' => $token,
            'redirect_url' => $redirectUrl,  // Include the URL for redirection
        ]);
    }

    /**
     * Get the redirect URL based on the user's role.
     *
     * @param string $role
     * @return string
     */
    private function getRedirectUrlByRole($role)
    {
        switch ($role) {
            case 'faculty':
                return '/user/homepage';
            case 'technician':
                return '/tech/homepage';
            case 'admin':
                return '/admin/homepage';
            default:
                return '/';
        }
    }

    /**
     * Register a new user and return the user details along with a token.
     *
     * @param RegisterRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        // Check if the email is already taken
        if (User::where('email', $data['email'])->exists()) {
            return response()->json([ 
                'message' => 'Email already taken.',
            ], 422);
        }

        // Create the new user
        $user = User::create([ 
            'name' => $data['name'],
            'id_number' => $data['id_number'],
            'position' => $data['position'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        // Create a new token for the user
        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    /**
     * Log the user out by invalidating all tokens for the user.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        $user = $request->user();

        if ($user) {
            // Revoke all tokens for the user
            $user->tokens->each(function ($token) {
                $token->delete();
            });

            return response()->json([
                'message' => 'Logged out successfully.',
            ], 204);  // Status code 204 means no content, but successful operation
        }

        return response()->json([ 
            'message' => 'Not authenticated, no tokens to revoke.',
        ], 401); // Return a 401 if the user is not authenticated
    }

    /**
     * Refresh the user's authentication token.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function refreshToken(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([ 
                'message' => 'Unauthorized.',
            ], 401);
        }

        // Revoke the old token and generate a new one
        $user->currentAccessToken()->delete(); // This ensures only the current token is deleted

        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    /**
     * Refresh the user's authentication token (mobile compatibility).
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function mobileRefreshToken(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([ 
                'message' => 'Unauthorized, please login again.',
            ], 401);
        }

        // Generate new token for mobile device
        $newToken = $user->createToken('mobile')->plainTextToken;

        return response()->json([ 
            'message' => 'Token refreshed successfully.',
            'token' => $newToken
        ]);
    }

    // Show login form for web version (optional if you want a view)
    public function showLoginForm()
    {
        return view('auth.login'); // Adjust this to your view's path
    }

    // Handle web login (session-based authentication)
    public function webLogin(Request $request)
    {
        $credentials = $request->validate([ 
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return redirect()->intended('dashboard'); // Redirect to a secure page
        }

        return back()->withErrors([ 
            'email' => 'The provided credentials do not match our records.',
        ]);
    }
}
