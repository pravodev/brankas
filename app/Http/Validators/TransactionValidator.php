<?php

namespace App\Http\Validators;

use \Prettus\Validator\LaravelValidator;
use \Prettus\Validator\Contracts\ValidatorInterface;

class TransactionValidator extends LaravelValidator
{
    protected $rules = [
        ValidatorInterface::RULE_CREATE => [
            'amount' => 'required|integer',
            'note' => 'nullable|string',
            'date' => 'required|date',
            'type' => 'required'
        ]
    ];
}
