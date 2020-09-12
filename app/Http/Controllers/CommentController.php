<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;

class CommentController extends Controller
{
    public function index()
    {
        return Comment::all();
    }

    public function show(Comment $comment)
    {
        return response()->json([
            'comment' => $comment,
        ], 202);
    }

    public function store(Request $request)
    {
        $comment = Comment::create($request->all());

        return response()->json([
            'comment' => $comment,
        ], 201);
    }

    public function delete($comment)
    {
        $comment->delete();

        return response()->json([
            'comment' => null,
        ], 204);
    }
}
