<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;

class MessageController extends Controller
{
    public function index()
    {
        return response()->json(Message::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'sender' => 'required|string',
            'message' => 'required|string',
        ]);

        $message = Message::create([
            'sender' => $request->sender,
            'message' => $request->message,
        ]);

        return response()->json($message, 201);
    }
}
