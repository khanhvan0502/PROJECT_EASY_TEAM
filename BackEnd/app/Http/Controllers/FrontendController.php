<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\CategoryQuiz;
use App\Models\Item;
use App\Models\News;
use App\Models\NewsItem;
use App\Models\Quiz;

class FrontendController extends Controller
{
    public function category()
    {
        $category = CategoryQuiz::where('status', '0')->get();
        return response()->json([
            'status' => 200,
            'category' => $category,
        ]);
    }

    public function item($slug)
    {
        $category = CategoryQuiz::where('slug', $slug)->where('status', '0')->first();
        if ($category) {
            $item = Item::where('category_id', $category->id)->where('status', '0')->get();
            if ($item) {
                return response()->json([
                    'status' => 200,
                    'item_data' => [
                        'item' => $item,
                        'category' => $category,
                    ],
                ]);
            } else {
                return response()->json([
                    'status' => 400,
                    'message' => 'No Item Avaiable',
                ]);
            }
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Such Category Found',
            ]);
        }
    }

    public function quiz($slug)
    {
        $item = Item::where('slug', $slug)->where('status', '0')->first();
        if ($item) {
            $quiz = Quiz::where('item_id', $item->id)->where('status', '0')->get();
            if ($quiz) {
                return response()->json([
                    'status' => 200,
                    'quiz_data' => [
                        'item' => $item,
                        'quiz' => $quiz,
                    ],
                ]);
            } else {
                return response()->json([
                    'status' => 400,
                    'message' => 'No Quiz Avaiable',
                ]);
            }
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No such Item Found',
            ]);
        }
    }

    public function news()
    {
        $news = News::where('status', '0')->get();
        return response()->json([
            'status' => 200,
            'news' => $news,
        ]);
    }

    public function newsitem($slug)
    {
        $news = News::where('slug', $slug)->where('status', '0')->first();
        if ($news) {
            $newsitem = NewsItem::where('news_id', $news->id)->where('status', '0')->get();
            if ($newsitem) {
                return response()->json([
                    'status' => 200,
                    'newsItem_data' => [
                        'newsItem' => $newsitem,
                        'news' => $news,
                    ],
                ]);
            } else {
                return response()->json([
                    'status' => 400,
                    'message' => 'No NewsItem Available',
                ]);
            }
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No such News Found',
            ]);
        }
    }

    public function viewnewsitem($news_slug, $newsitem_slug)
    {
        $news = News::where('slug', $news_slug)->where('status', '0')->first();
        if ($news) {
            $newsitem = NewsItem::where('news_id', $news->id)->where('slug', $newsitem_slug)->where('status', '0')->first();
            if ($newsitem) {
                return response()->json([
                    'status' => 200,
                        'newsItem' => $newsitem,
                ]);
            } else {
                return response()->json([
                    'status' => 400,
                    'message' => 'No NewsItem Available',
                ]);
            }
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No such News Found',
            ]);
        }
    }
}
