<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'amount',
        'note',
        'date',
        'type'
    ];
    public function goal(){
        return $this->belongsTo(Goal::class);
    }
}
