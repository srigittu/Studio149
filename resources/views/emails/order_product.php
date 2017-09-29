<!DOCTYPE html>
<html>
<head>
    <title>Order Invoice</title>
    <style type="text/css">
        div.container {
            margin: 0 10%;
        }
        th {
            height: 50px;
            background: #000;
            color: #DAA520;
        }
    </style>
</head>
<body>
    <div class="container">
        <table border="0" cellspacing="0" cellpadding="0" width="100%">
            <thead>
                <tr>
                    <th colspan="10">Studio149 Fashion</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="10">&nbsp;<br>Hello <b><?php echo $orderDetail['name']; ?></b>, <br>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;We thought you'd like to know that we've dispatched your item(s). Your order is on the way. If you need any assistance feel free to contact us info@studio149fashion.com</p></td>
                </tr>
                <tr>
                    <td colspan="5" >&nbsp;<br><b>Order details</b></td>
                    <td colspan="5"><span style="float: right;">&nbsp;<br>Id:#<?php echo $orderDetail['order_id']; ?></span></td>
                </tr>
            </tbody>
            <tbody style="background-color: #efefef;">
                <tr>
                    <td colspan="10" style="border-top: 5px solid #000;">&nbsp;</td>
                </tr>
                <tr>
                    <td colspan="5">Ordered product detail</td>
                    <td colspan="5" style="float: right;">Code: #<?php echo $product['productDetail']['code']; ?><br>
                                                          Name: <?php echo $product['productDetail']['name']; ?><br>
                                                          Color: <?php echo $product['productDetail']['color']; ?><br>
                                                          Size: <?php echo $orderDetail['selected_size']; ?><br>
                                                          </td>
                </tr>
                <tr>
                    <td colspan="10" style="border-bottom: 1px solid #666;">&nbsp;</td>
                </tr>
            </tbody>
            <tbody>
                <tr>
                    <td colspan="5"></td>
                    <td colspan="5" style="float: right;">Amount: <?php $amount = $orderDetail['amount'] / 100; echo number_format($amount, 2);?> INR</td>
                </tr>
                <tr>
                    <td colspan="10" style="border-top: 1px solid #666;">&nbsp;</td>
                </tr>
                <tr>
                    <td colspan="5">Your package was sent to:</td>
                </tr>
                <tr>
                    <td colspan="10">&nbsp;<br><?php echo $orderDetail['name']; ?><br>
                                                            Address: <?php echo $orderDetail['address']; ?><br>
                                                            <?php echo $orderDetail['email']; ?><br>
                                                            <?php echo $orderDetail['phone']; ?>
                                                          </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>
</html>