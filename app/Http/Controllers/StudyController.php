<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Study;
use Illuminate\Support\Facades\Validator;


class StudyController extends Controller
{
    public function index()
    {
        return Study::all();
    }

    public function show(Study $study)
    {
        return $study;
    }

    public function store(Request $request)
    {
        // $study = Study::create($request->all());

        // return response()->json([
        //     'study' => $study,
        // ], 201);

        $rules = array(
            'study_name' => 'required',
        );

        $credentials = $request->only('study_name');

        $validator = Validator::make($credentials, $rules);

        if ($validator->fails()) {
            $errors = $validator->errors();
            return response()->json([
                'studyErrorMessage' => $errors->first('study_name'),
            ], 401);
        } else {
            return Study::create($request->all());
        }
    }

    public function update(Request $request, Study $study)
    {
        $study->update($request->all());

        return response()->json([
            'study' => $study,
        ], 202);
    }

    public function delete($study)
    {
        $study->delete();

        return response()->json([
            'study' => null,
        ], 204);
    }
}
