<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\Transaction;
use App\Http\Validators\TransactionValidator;
use \Prettus\Validator\Exceptions\ValidatorException;
use \Prettus\Validator\Contracts\ValidatorInterface;

class TransactionController extends Controller
{
    protected $validator, $eloquent;
    protected $type = [
        'income',
        'expenditure'
    ];

    public function __construct(Transaction $eloquent, TransactionValidator $validator){
        $this->validator = $validator;
        $this->eloquent = $eloquent;
    }
    private function getType($key){
        return $this->type[$key];
    }
    private function convertDate($date){
        $date = new \DateTime($date);
        return $date->format('Y-m-d H:i:s');
    }
    public function index()
    {
        return \Response::json($this->eloquent->with('goal')->orderBy('id', 'DESC')->paginate(), 200);
    }

    public function store(Request $request, TransactionValidator $validator)
    {
        try {
            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_CREATE);
            $transaction = $this->eloquent->fill([
                'amount' => $request->amount,
                'note' => $request->note,
                'date' => $this->convertDate($request->date),
                'type' => $this->getType($request->type)
            ]);
            $transaction
                ->goal()
                ->associate(\App\Model\Goal::find($request->goal_id))
                ->save();

            return \Response::json([
                'message'=>'Transaction created',
                'data'   =>$transaction->toArray()
            ], 201);
        }catch (ValidatorException $e) {
            // dd($e->toArray());
            return \Response::json($e->toArray(), 422);
        };
    }
    public function show(Transaction $transaction){
        return $transaction->with('goal')->get();
    }
    public function update(Request $request, Transaction $eloquent)
    {
        try {
            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_UPDATE);
            $update = $eloquent->update($request->all());
            return \Response::json([
                'message' => 'Transaction Updated',
                'data' => $update->toArray()
            ]);
        }catch (ValidatorException $e) {
            return \Response::json($e->toArray(), 422);
        }
    }

    public function destroy(Transaction $transaction)
    {
        $transaction->delete();
        return response()->json([], 204);
    }
}
