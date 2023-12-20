<?php

namespace App\Http\Controllers;

use App\Models\Slide;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SlideController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $slides = Slide::orderBy('order', 'asc')->get();
        return Inertia::render('Slides/Index', [
            'slides' => $slides
        ]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'position' => ['required', 'min:2'],
            'color' => ['required', 'min:2'],
            'order' => ['required', 'integer'],
            'title' => ['required', 'min:2'],
            'description' => ['required', 'min:2'],
            'label' => ['required'],
            'action' => ['required'],
            'desktopImage' => ['required'],
            'mobileImage' => ['required'],
        ]);

        $slide = new Slide();
        $slide->position = $request->position;
        $slide->color = $request->color;
        $slide->order = $request->order;
        $slide->title = $request->title;
        $slide->description = $request->description;
        $slide->label = $request->label;
        $slide->action = $request->action;
        $slide->active = true;

        if ($request->hasFile('desktopImage')) {
            $image = $request->file('desktopImage');
            $originalName = $image->getClientOriginalName();
            $fileName = Carbon::now()->format('YmdHis') . '_' . $originalName;
            $slide->desktopImage = $image->storeAs('/images/slides', $fileName);
        }

        if ($request->hasFile('mobileImage')) {
            $image = $request->file('mobileImage');
            $originalName = $image->getClientOriginalName();
            $fileName = Carbon::now()->format('YmdHis') . '_' . $originalName;
            $slide->mobileImage = $image->storeAs('/images/slides', $fileName);
        }

        $slide->save();

        return to_route('slides.index');
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $slide = Slide::find($id);

        if ($request->filled('position')) {
            $slide->position = $request->position;
        }

        if ($request->filled('color')) {
            $slide->color = $request->color;
        }

        if ($request->filled('order')) {
            $slide->order = $request->order;
        }

        if ($request->filled('title')) {
            $slide->title = $request->title;
        }

        if ($request->filled('description')) {
            $slide->description = $request->description;
        }

        if ($request->filled('label')) {
            $slide->label = $request->label;
        }

        if ($request->filled('action')) {
            $slide->action = $request->action;
        }

        if ($request->has('active')) {
            $slide->active = $request->active;
        }

        if ($request->hasFile('desktopImage')) {
            $image = $request->file('desktopImage');
            $originalName = $image->getClientOriginalName();
            $fileName = Carbon::now()->format('YmdHis') . '_' . $originalName;
            $slide->desktopImage = $image->storeAs('/images/slides', $fileName);
        }

        if ($request->hasFile('mobileImage')) {
            $image = $request->file('mobileImage');
            $originalName = $image->getClientOriginalName();
            $fileName = Carbon::now()->format('YmdHis') . '_' . $originalName;
            $slide->mobileImage = $image->storeAs('/images/slides', $fileName);
        }

        $slide->save();

        return to_route('slides.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $slide = Slide::find($id);
        $slide->delete();

        return to_route('slides.index');
    }
}
