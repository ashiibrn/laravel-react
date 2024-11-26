<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChatsTable extends Migration
{
    public function up()
    {
        Schema::create('chats', function (Blueprint $table) {
            $table->id();
            $table->text('message');
            $table->foreignId('sender_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('receiver_id')->nullable()->constrained('users')->onDelete('cascade'); // Ensure receiver_id exists and is nullable
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('chats');
    }
}
