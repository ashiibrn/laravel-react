<?php

namespace App\Http\Controllers;

use App\Models\Widget;
use Illuminate\Http\Request;

class WidgetController extends Controller
{
    // Store dropped widget data
    public function store(Request $request)
    {
        $validated = $request->validate([
            'widget_type' => 'required|string',
            'drop_area_index' => 'required|integer',
            'side' => 'required|string',
            'issue_category' => 'nullable|string',
            'specific_issue' => 'nullable|string',
        ]);

        $widget = Widget::create($validated);

        return response()->json(['message' => 'Widget data saved successfully!', 'widget' => $widget], 201);
    }

    // Retrieve all stored widget data
    public function index()
    {
        $widgets = Widget::all();
        return response()->json($widgets);
    }

    public function getIssues($widgetType)
    {
        $issues = Widget::where('widget_type', $widgetType)
                        ->whereNotNull('issue_category')  // Ensure that there's an issue category
                        ->get();

        return response()->json($issues);
    }
    public function deleteWidget(Request $request)
{
    $validated = $request->validate([
        'widget_type' => 'required|string',
        'drop_area_index' => 'required|integer',
        'side' => 'required|string',
    ]);

    // Delete the widget and associated issues
    $deleted = Widget::where('widget_type', $validated['widget_type'])
    ->where('drop_area_index', $validated['drop_area_index'])
    ->where('side', $validated['side'])
    ->delete();

    if ($deleted) {
        return response()->json(['message' => 'Widget deleted successfully.'], 200);
    } else {
        return response()->json(['message' => 'Widget not found.'], 404);
    }
}
    public function getIssueCounts()
    {
        $hardwareCount = Widget::where('widget_type', 'Hardware Issue')->count();
        $softwareCount = Widget::where('widget_type', 'Software Issue')->count();
        $networkCount = Widget::where('widget_type', 'Network Issue')->count();
        $monitorCount = Widget::where('widget_type', 'Monitor')->count();

        return response()->json([
            'hardware' => $hardwareCount,
            'software' => $softwareCount,
            'network' => $networkCount,
            'monitor' => $monitorCount,
        ], 200);
    }

}
