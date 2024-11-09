    <?php

    use App\Http\Controllers\AuthController;
    use App\Http\Controllers\UserController;
    use App\Http\Controllers\ChatController;
    use App\Http\Controllers\WidgetController;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Route;

    /*
    |--------------------------------------------------------------------------
    | API Routes
    |--------------------------------------------------------------------------
    |
    | Here is where you can register API routes for your application. These
    | routes are loaded by the RouteServiceProvider and all of them will
    | be assigned to the "api" middleware group. Make something great!
    |
    */

    Route::middleware('auth:sanctum')->group(function() {
        Route::get('logout',[AuthController::class,'logout']);

        Route::get('/user', function (Request $request) {
            return $request->user();
        });

        
        Route::get('/users', [AuthController::class, 'getUsers']); //i add it in here
        // Route::apiResource('/users',UserController::class);

        
        Route::post('/widgets', [WidgetController::class, 'store']);
        Route::get('/widgets', [WidgetController::class, 'index']);
    });



    Route::post('login',[AuthController::class,'login']);
    Route::post('register',[AuthController::class,'register']);
