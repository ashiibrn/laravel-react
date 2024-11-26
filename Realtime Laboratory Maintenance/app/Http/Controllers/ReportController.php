<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    // Store the submitted report
    public function store(Request $request)
{

    // Validate incoming data
    $validated = $request->validate([
        'laboratory' => 'required|string|max:255',
        'pcnumber' => 'required|string|max:255',
        'issue_type' => 'required|string|max:255',
        'specific_issue' => 'required|string',
    ]);

    // Create the new report
    $report = Report::create($validated);

    // Return a response
    return response()->json([
        'message' => 'Report submitted successfully!',
        'report' => $report
    ], 201);
}

    public function index()
    {
        try {
            $reports = Report::all(); // Retrieve all reports
            return response()->json($reports, 200); // Return reports as JSON
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to fetch reports'], 500); // Handle errors
        }
    }

}
