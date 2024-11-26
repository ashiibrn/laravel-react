<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('widgets', function (Blueprint $table) {
        $table->id();
        $table->string('widget_type');
        $table->integer('drop_area_index');
        $table->string('side');
        $table->string('issue_category')->nullable();
        $table->string('specific_issue')->nullable();
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('widgets');
    }
};
