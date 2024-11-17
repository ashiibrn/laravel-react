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


}
