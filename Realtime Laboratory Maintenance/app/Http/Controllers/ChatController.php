<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    /**
     * Get all messages for the logged-in user
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Fetch all chats where the logged-in user is either the sender or receiver
        $chats = Chat::with(['sender', 'receiver'])
            ->where(function($query) use ($user) {
                $query->where('sender_id', $user->id)
                      ->orWhere('receiver_id', $user->id);
            })
            ->orderBy('created_at', 'asc') // Orders messages by creation time
            ->get();

        // Return messages in a structured format
        return response()->json([
            'data' => $chats,
        ]);
    }

    /**
     * Store a new chat message
     */
    public function store(Request $request)
    {
        $user = $request->user();
    
        // Validate incoming data, including optional `receiver_id`
        $request->validate([
            'message' => 'required|string',
            'receiver_id' => 'nullable|exists:users,id', // Optional receiver ID
        ]);
    
        // Create a new chat message with sender and receiver IDs
        $message = Chat::create([
            'message' => $request->message,
            'sender_id' => $user->id,
            'receiver_id' => $request->receiver_id, // Store receiver_id if provided
        ]);
    
        // Load sender's details (and optionally receiver if needed)
        $message->load('sender', 'receiver');
    
        // Return response with message and sender/receiver info
        return response()->json([
            'data' => [
                'message' => $message->message,
                'sender' => [
                    'id' => $message->sender->id,
                    'name' => $message->sender->name,
                    'role' => $message->sender->position,
                ],
                'receiver' => $message->receiver ? [
                    'id' => $message->receiver->id,
                    'name' => $message->receiver->name,
                ] : null, // Return null if no receiver (e.g., group chat)
            ],
            'status' => 'Message sent successfully',
        ]);
    }
}
