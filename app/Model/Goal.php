<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Goal extends Model
{
    protected $fillable = [
        'title',
        'cost',
        'description',
        'start_date',
        'end_date',
        'amount_to_save',
        'pick_schedule'
    ];
    public function transactions(){
        return $this->hasMany(Transaction::class);
    }
}
