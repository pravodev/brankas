<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\Goal;
use App\Http\Validators\GoalValidator;
use \Prettus\Validator\Exceptions\ValidatorException;
use \Prettus\Validator\Contracts\ValidatorInterface;

class GoalController extends Controller
{
    protected $validator;
    protected $eloquent;

    public function __construct(Goal $eloquent, GoalValidator $validator){
        $this->validator = $validator;
        $this->eloquent = $eloquent;
    }

    public function index()
    {
        return \Response::json($this->eloquent->with('transactions')->orderBy('id', 'DESC')->paginate(), 200);
    }

    public function store(Request $request, GoalValidator $validator)
    {
        try {
            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_CREATE);
            $createGoal = $this->eloquent->fill($request->all());
            $createGoal->save();
            if($request->hasFile('image') === false){
                return \Response::json([
                    'message'=>'Goal created',
                    'data'   =>$createGoal->toArray()
                ], 201);
            }
            $request->image->storeAs('images', $request->photo->name());
            if($request->file('image')->isValid()){

            }
        }catch (ValidatorException $e) {
            return \Response::json($e->toArray(), 422);
        };
    }
    public function show(Goal $goal){
        return $goal->with('transactions')->get();
    }
    public function update(Request $request, Goal $eloquent)
    {
        try {
            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_UPDATE);
            $update = $eloquent->update($request->all());
            return \Response::json([
                'message' => 'Goal Updated',
                'data' => $update->toArray()
            ]);
        }catch (ValidatorException $e) {
            return \Response::json($e->toArray(), 422);
        }
    }

    public function destroy(Goal $goal)
    {
        $goal->delete();
        return response()->json([], 204);
    }
}
