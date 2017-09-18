<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use App\ProductDetail;
use App\Category;
use App\Size;
use Carbon\Carbon;
use Mail;
use Log;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::with('productDetail.category', 'productDetail.sizes', 'creator')->where('status', 1)->get();

        return response(array(
                'status' => 'success',
                'products' => $products
                    ), 200);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexByCategory($categoryId)
    {
        $productsByCategory = Product::with('productDetail.category', 'productDetail.sizes', 'creator')->where('status', 1)->whereHas('productDetail', function($q) use($categoryId) {
                $q->where('category_id', $categoryId);
            })->get();

        return response(array(
                'status' => 'success',
                'products' => $productsByCategory
                    ), 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   
        
        $lastProduct = Product::all()->last();

        if (!$lastProduct) {
            $lastProductId = 0;
        } else {
            $lastProductId = $lastProduct->id;
        }
        
        $category = Category::find($request->categoryId);

        $productCode = '#PRD-'.++$lastProductId.'&CA-'.$category->id;

        $imageNames = array();
        $images = $request->file('images');
        if (count($images)) {
            foreach ($images as $image) {
                if (!empty($image) && $image->isValid()) {
                    $imageName = $image->getClientOriginalName();
                    $destinationPath = base_path() . '/assets/images/products/'.$productCode .'/' ;
                    if (!file_exists($destinationPath)) {
                        if (mkdir($destinationPath, 0777, true)) {
                            $uploadedResult = $image->move($destinationPath, $imageName);
                            $imageNames[] = $imageName;
                        } else {
                            return false;
                        }
                    } else {
                        $uploadedResult = $image->move($destinationPath, $imageName);
                        $imageNames[] = $imageName;
                    }
                }
            }
        }
        $productImages = implode(",", $imageNames);

        $sizes = Size::whereIn('size', explode(",", $request->sizes))->get();

        $product = new Product();
        $product->code = $productCode;
        $product->creator_id = $request->userId;
        $product->save();

        $productDetail = new ProductDetail();
        $productDetail->category_id = $category->id;
        $productDetail->name = $request->name;
        $productDetail->description = $request->description;
        $productDetail->color = $request->color;
        $productDetail->material = $request->material;
        $productDetail->designer = $request->designer;
        $productDetail->image = $productImages;
        $productDetail->price = $request->price;
        $product->productDetail()->save($productDetail);
        $productDetail->sizes()->sync($sizes);

        return response(array(
                'status' => 'success',
                'message' => 'Product saved successfully',
                'product' => $product
                    ), 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product = Product::with('productDetail.category', 'productDetail.sizes', 'creator')->first();

        if (!$product) {
            return response(array(
                'status' => 'success',
                'message' => 'Product not found'
                    ), 200);
        }

        return response(array(
                'status' => 'success',
                'product' => $product
                    ), 200);
    }

    /**
     * Updates the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request)
    {
        $product = Product::find($id);

        if (!$product) {
            return response(array(
                'status' => 'success',
                'message' => 'Product not found'
                    ), 200);
        }

        $productDetail = ProductDetail::firstOrNew(['product_id' => $product->id]);

        $category = Category::find($request->categoryId);

        $sizes = Size::find([$request->sizeIds]);

        $product->code = '#PRD-'.$id.'&CA-'.$category->id;
        $product->creator_id = $request->userId;
        $product->save();

        $productDetail->name = $request->name;
        $productDetail->description = $request->description;
        $productDetail->color = $request->color;
        $productDetail->material = $request->material;
        $productDetail->designer = $request->designer;
        $productDetail->image = $$productImages;
        $productDetail->price = $request->price;
        $productDetail->sizes()->sync($sizes);
        $productDetail->category()->save($category);
        $product->productDetail()->save($productDetail);

        return response(array(
                'status' => 'success',
                'message' => 'Product updated successfully',
                'product' => $product
                    ), 200);
    }
    
    /**
     * Deletes the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Product::destroy($id);

        return response(array(
                'status' => 'success',
                'message' => 'Product deleted successfully'
                    ), 200);
    }
}