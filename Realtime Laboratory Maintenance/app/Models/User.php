<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'users';
    
    protected $fillable = [
        'name',
        'id_number',
        'position',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // Relationship for messages sent by the user
    public function sentMessages()
    {
        return $this->hasMany(Chat::class, 'sender_id');
    }

    // Relationship for messages received by the user
    public function receivedMessages()
    {
        return $this->hasMany(Chat::class, 'receiver_id');
    }
}

