<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Report;

class ReportController extends Controller
{
    public function index()
    {
        return Report::all();
    }

    public function show($id)
    {
        return Report::find($id);
    }

    public function store(Request $request)
    {
        return Report::create($request->all());
    }

    public function update(Request $request, Report $report)
    {
        $report->update($request->all());

        return response()->json($report, 200);
    }

    public function delete($report)
    {
        $report->delete();

        return response()->json(null, 204);
    }
}