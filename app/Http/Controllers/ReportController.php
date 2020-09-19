<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Report;
use Composer\XdebugHandler\Status;

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

    public function showPerStudy($study)
    {
        $reports = Report::where('report_study', $study)->get();

        return response()->json($reports, 200);
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

    public function updateStatus($id, $status)
    {
        $report = Report::find($id);

        if ($report) {
            $report->report_status = $status;
            $report->save();
        }

        return response()->json([
            'report' => $report,
            'message' => 'Report status has been changed to '. $status
        ], 200);
    }

    public function delete($report)
    {
        $report->delete();

        return response()->json(null, 204);
    }
}
