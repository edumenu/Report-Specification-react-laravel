<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Study;

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
        $study = Study::create($request->all());

        return response()->json([
            'study' => $study,
        ], 201);
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
