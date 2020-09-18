<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;
use App\Report;
use Illuminate\Foundation\Console\Presets\React;

class CommentController extends Controller
{
    public function index()
    {
        return Comment::all();
    }

    public function showOne(Comment $comment)
    {

        return response()->json([
            'comment' => $comment,
        ], 202);
    }

    public function show($id)
    {
        $comments = Comment::where('report_id', $id)->latest()->paginate(2);

        return response()->json([
            'comments' => $comments,
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
