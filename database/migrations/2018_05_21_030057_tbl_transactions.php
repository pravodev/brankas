<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TblTransactions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->increments('id');
            $table->decimal('amount', 60, 2);
            $table->text('note')->nullable();
            $table->dateTime('date');
            $table->unsignedInteger('goal_id');
            $table->enum('type', ['income','expenditure']);
            $table->timestamps();

            $table
                ->foreign('goal_id')
                ->references('id')
                ->on('goals')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transactions');
    }
}
