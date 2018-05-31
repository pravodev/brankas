<?php

namespace App\Http\Validators;

use \Prettus\Validator\LaravelValidator;
use \Prettus\Validator\Contracts\ValidatorInterface;

class GoalValidator extends LaravelValidator
{
    protected $rules = [
        ValidatorInterface::RULE_CREATE => [
            'title' => 'required',
            'cost' => 'required|integer',
            'description' => 'nullable|min:50',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'amount_to_save' => 'nullable|integer',
            'pick_schedule' => 'nullable|string'
        ],
        ValidatorInterface::RULE_UPDATE => [
            'title' => 'nullable|string',
            'cost' => 'nullable|integer',
            'description' => 'nullable|min:50',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'amount_to_save' => 'nullable|integer',
            'pick_schedule' => 'nullable|string'
        ]
    ];
}
