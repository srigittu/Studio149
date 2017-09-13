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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   
        $lastProductId = Product::all()->last()->id;

        if (!$lastProductId) {
            $lastProductId = 0;
        }

        $category = Category::find($request->categoryId);

        $sizes = Size::find([$request->sizeIds]);

        $product = new Product();
        $product->code = '#PRD'.++$lastProductId.'CA'.$category->id;
        $product->creator_id = $request->userId;
        $product->save();

        $productDetail = new ProductDetail();
        $productDetail->name = $request->productName;
        $productDetail->description = $request->productDescription;
        $productDetail->color = $request->productColor;
        $productDetail->material = $request->productMaterial;
        $productDetail->image = $request->productImage;
        $productDetail->price = $request->productPrice;
        $productDetail->sizes()->sync($sizes);
        $productDetail->category()->save($category);
        $product->productDetail()->save($productDetail);

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

        $product->code = '#PRD'.$id.'CA'.$category->id;
        $product->creator_id = $request->userId;
        $product->save();

        $productDetail->name = $request->productName;
        $productDetail->description = $request->productDescription;
        $productDetail->color = $request->productColor;
        $productDetail->material = $request->productMaterial;
        $productDetail->image = $request->productImage;
        $productDetail->price = $request->productPrice;
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


    public function clientUpdate(Request $request, $clientId)
    {
        try {
            $logo = $request->file('logo');
            $clientId = $clientId;
            if (!empty($logo) && $logo->isValid()) {
                $logoName = $logo->getClientOriginalName();
                $logoExtension = $logo->getClientOriginalExtension();
                $destinationPath = public_path() . '/assets/uploads/client/logos/' .$clientId .'/' ;
                Log::info("Uploading company logo details: " . "Logo name: " . $logoName . "," . 'Destination Path: ' . $destinationPath);
                if (!file_exists($destinationPath)) {
                    if (mkdir($destinationPath, 0777, true)) {
                        $uploadedResult = $logo->move($destinationPath, $logoName);
                        if ($uploadedResult) {
                            $request->merge(array('logo' => 'Company logo saved successfully'));
                        } else {
                            $request->merge(array('logo' => 'Company logo is not uploaded'));
                        }
                    } else {
                        return false;
                    }
                } else {
                    $oldCompanyLogo = public_path() . '/assets/uploads/client/logos/' .$clientId .'/*';
                    array_map('unlink', glob($oldCompanyLogo));
                    $uploadedResult = $logo->move($destinationPath, $logoName);
                    if ($uploadedResult) {
                        $request->merge(array('logoName' => $logoName));
                    } else {
                        $request->merge(array('logoName' => $logoName));
                    }
                }
                $companyLogo = $logoName;
            } else {
                if ($request->companyLogo && $request->companyLogo != 'null' ) {
                    $companyLogo = $request->companyLogo;
                } else {
                    $companyLogo = null;
                    $oldCompanyLogo = public_path() . '/assets/uploads/client/logos/' .$clientId .'/*';
                    array_map('unlink', glob($oldCompanyLogo));
                    $request->merge(array('logoUpdateMessage' => 'client logo is not uploaded!'));
                }
            }
            $clientArray = array (
                'clnt_id' => $clientId,
                'pers_id' => $request->persId,
                'curn_id' => $request->curnId,
                'user_id' => $request->userId,
                'firstname' => $request->firstName,
                'lastname' => $request->lastName,
                'email' => $request->email,
                'company_name' => $request->company,
                'company_logo' => $companyLogo,
                'mobile_number' => $request->mobile,
                'phone' => $request->work,
                'stamp_duty_perc' => $request->stampDutyPerc,
                'gst_perc' => $request->gstPerc,
                'address1' => $request->address1,
                'address2' => $request->address2,
                'stateId' => $request->state,
                'countryId' => $request->country,
                'city' => $request->city,
                'postalCode' => $request->postalCode,
                'billTo' => $request->billedTo,
                'user_status' => $request->status,
            );
            $oUser = User::with('client', 'persondetails', 'persondetails.adddressdetails', 'persondetails.adddressdetails.countrydlt', 'persondetails.adddressdetails.statedlt','userrole')->where('user_name', $request->email)->get();

            if (isset($oUser[0]->user_inso_contact_id)) {
                $aContactData = array(
                    'FirstName' => $request->firstName,
                    'LastName' => $request->lastName,
                    'Company' => $request->company,
                    'City' => $request->city,
                    'Phone1' => $request->mobile,
                    'StreetAddress1' => $request->address1,
                    'StreetAddress2' => $request->address2,
                    'Country' => $oUser[0]->persondetails->adddressdetails->countrydlt->ctry_name,
                    'State' => $oUser[0]->persondetails->adddressdetails->statedlt->stat_name,
                    'PostalCode' => $request->postalCode,
                    'contact_id' => $oUser[0]->user_inso_contact_id,
                );
                $this->_manageInfusionSoftContacts($aContactData, 'update');
            }
            if (isset($request->addrId) && ($request->addrId != 'null')) {
                $clientArray ['addr_id'] = $request->addrId;
            }

            $CreateUser = new CreateUserJob($clientArray);
            $oCreateUser = dispatch($CreateUser);
            $CreateAddressJob = new AddressJob($clientArray);
            $respCreateAddress = dispatch($CreateAddressJob);
            $clientArray['address_id'] = $respCreateAddress['addr_id'];
            $oUser = User::where('user_name', '=', $request->email)->get();
            $CreatePersonalDetailsJob= new CreatePersonalDetailsJob($clientArray);
            $respCreatePersonalDetails = dispatch($CreatePersonalDetailsJob);
            $createClient = new CreateClientJob($clientArray);
            $responseCreateClient = dispatch($createClient);
            return response(array(
                'status' => 'success', 'message' => 'Your profile saved successfully!'
            ), 200);
        } catch (\Exception $e) {
            Log::error('In Controller:UserController, Function:clientUpdate, Err:'.$e);
            if (isset($current_pers_id) && !empty($current_pers_id)) {
                $deleteuser = PersonalDetail::where('pers_id', $current_pers_id)->delete();
            }
            return response(array(
                'status' => 'error', 'message' => $e->getMessage()
            ), 402);
        }
    }
}