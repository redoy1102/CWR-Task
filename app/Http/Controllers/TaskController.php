<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    // The index method is responsible for displaying the list of tasks along with the associated user data.
    public function index(){
        return Inertia::render('Tasks/Index', [
            'tasks' => Task::with('user')->get(),
        ]);
    }

    // Task create form route
    public function create(){
        return Inertia::render('Tasks/Create');
    }

    // Task store route
    public function store(Request $request){
        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
        ]);

        Task::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'due_date' => $validated['due_date'],
            'user_id' => auth()->id(),
        ]);

        // return redirect()->route('tasks.index')->with('success', 'Task created successfully.');
    }

    // Task edit form route
    public function edit(Task $task){
        return Inertia::render('Tasks/Edit', [
            'task' => $task,
        ]);
    }

    // Task update route
    public function update(Request $request, Task $task){
        $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
        ]);

        $task->update($request->all());

        return redirect()->route('tasks.index')->with('success', 'Task updated successfully.');
    }

    // Task delete route
    public function destroy(Task $task){
        $task->delete();

        return redirect()->route('tasks.index')->with('success', 'Task deleted successfully.');
    }

    // All task delete
    public function deleteAll(){
        try{
            Task::truncate();
            return redirect()->route('tasks.index')->with('success', 'All tasks deleted successfully.');
        } catch(\Exception $e){
            return redirect()->route('tasks.index')->with('error', 'Failed to delete all tasks.');
        }
    }
}
