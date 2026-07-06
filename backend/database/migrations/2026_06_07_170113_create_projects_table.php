<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('projects', function (Blueprint $table) {
        $table->id();

        $table->string('name');
        $table->string('type');
        $table->string('status');

        $table->text('description');

        $table->string('image')->nullable();

        $table->string('github_link')->nullable();
        $table->string('demo_link')->nullable();

        $table->timestamps();
    });
}
};
