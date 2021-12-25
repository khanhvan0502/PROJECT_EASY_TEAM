<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('category_question_id');
            $table->text('content')->nullable();
            $table->string('slug');
            $table->string('tag_id');
            $table->bigInteger('votes_couter')->nullable()->default(0);
            $table->bigInteger('views_couter')->nullable()->default(0);
            $table->bigInteger('comments_couter')->nullable()->default(0);
            $table->bigInteger('user_id')->nullable()->unsigned();
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('questions');
    }
}
