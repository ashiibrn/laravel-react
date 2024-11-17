<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Widget extends Model
{
    use HasFactory;

    protected $fillable = [
        'widget_type',
        'drop_area_index',
        'side',
        'issue_category',
        'specific_issue',
    ];
}
