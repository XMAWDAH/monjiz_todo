<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    // GET /api/todos
    public function index()
    {
        return auth()->user()->todos->map(function ($todo) {
            return [
                'id' => $todo->id,
                'title' => $todo->title,
                'details' => $todo->details,
                'is_completed' => $todo->is_completed == 1,
                'date' => $todo->date, 
            ];
        });
    }

    // POST /api/todos
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'date' => 'nullable|date' 
        ]);

        $todo = auth()->user()->todos()->create([
            'title' => $request->title,
            'details' => $request->details, 
            'is_completed' => false,
            'date' => $request->date, 
        ]);

        return response()->json($todo, 201);
    }

    // PUT /api/todos/{id}
    public function update(Request $request, $id)
    {
        $todo = auth()->user()->todos()->findOrFail($id);

        $todo->update([
            'title' => $request->title ?? $todo->title,
            'details' => $request->details ?? $todo->details,
            'is_completed' => $request->has('is_completed') ? $request->is_completed : $todo->is_completed,
            'date' => $request->date ?? $todo->date,
        ]);

        return response()->json($todo);
    }

    // DELETE /api/todos/{id}
    public function destroy($id)
    {
        auth()->user()->todos()->findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted']);
    }
}