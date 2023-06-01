

    var card_id = 0;

    var product_name = "";
    var product_price = 0;
    var quantity = 0;
    var tax = 0;
    var tax_amount = 0;
    var product_price_including_quantity = 0;
    var net_quantity = 0;
    var total_product_price_tax = 0;
    var total_product_price = 0;
    var shipping_charge = 0;
    var net_total = 0 ;
    // var selected;
    
    $(function(){

        total_cart_value();
        update_total_foot_bar(net_total, shipping_charge, total_product_price_tax, total_product_price);

    });

function add_cart(){
   
      if(!$("#product_name").val()){
        alert("product NAME must be filled");
      } else if (!$("#product_price").val()){
        alert("product PRICE must be filled");    
      }else if ($("#GST").val() > 20){
        alert("Tax percentage must be below 20");    
      } else{
         
    product_name = $("#product_name").val();
    product_price = parseInt($("#product_price").val());
    quantity = parseInt($("#quantity").val());
    tax = parseInt($("#GST").val());
    // localStorage.setItem(user_name, 'john');
    alert(product_name + "\n" + product_price +  "\n" + quantity + "\n" + tax );
    $(".user_form").css({"display":"none"});
    appending_form_data();
    console.log("quantity after appending data" + quantity);
    console.log("net quantity after appending data" + net_quantity);
    total_cart_value();
    total_foot_bar();
      }
}

function open_form(){
    $(".user_form").css({"display":"block"});
    $("#product_name").val("");
    $("#product_price").val("");
    $("#quantity").val("1");
    $("#GST").val("1");

}

function close_form(){
   $(".user_form").css({"display":"none"});
}


function appending_form_data(){
    card_id += 1;
    product_price_including_quantity = product_price * quantity;  //to calculate tax amount
    product_price_tax(product_price_including_quantity);

    var appending_html_card =`
    <div id="${card_id}" class="card" style="width: 40rem;">
        <div>
            <span> Product : </span> 
             <span id="p_name"> ${product_name} </span> &nbsp;
            <span> Quantity : </span> 
             <span id="quant"> ${quantity} </span>&nbsp
            <span> Tax : </span> 
             <span id="gst"> ${tax_amount} </span>  &nbsp;
            <span>  Price : </span> 
             <span id="p_price"> ${product_price} </span> &nbsp;        
            <span>
            <button class="btn btn-outline-danger btn-sm" id="del_button" onclick="remove_from_cart(${card_id}, ${quantity}, ${tax_amount}, ${product_price_including_quantity});">del
            </button>
            </span>
            <span> 
            <button class="btn btn-outline-info btn-sm" id="edit_button" onclick="edit_cart('${product_name}', ${product_price}, ${quantity}, ${tax}, ${card_id})">edit
            </button> 
            </span>
            
        </div>
   </div>`;

   $(".cards_appending_div").append(appending_html_card);
   
}

var product_price_tax = function(product_price_including_quantity){
    //let 5% tax for all products
    tax_amount = product_price_including_quantity * tax * 1/100 ;
    // total_product_price_tax += tax_amount; 
    console.log("total_product_price_tax inside product_price_tax(appending)" + total_product_price_tax);
    return tax_amount;
}

function total_cart_value(){
    console.log("quantity value before adding  " + quantity);
    console.log("quantity data type  " + typeof(quantity));
   
    net_quantity += quantity;

    console.log("quantity value after adding  " + quantity);
    console.log("quantity data type  " + typeof(quantity));
    $("#total_cart_value").text(net_quantity);
}

function total_foot_bar(){
  total_product_price_tax += tax_amount; 
  total_product_price += product_price_including_quantity;
  net_total = total_product_price + total_product_price_tax;
 console.log("total product price TAX is(inside total bar) " + total_product_price_tax);
 console.log("total product PRICE  is(inside total bar) " + total_product_price);
 
//  update_total_foot_bar(net_total, shipping_charge, total_product_price_tax, total_product_price);
total_val_by_jquery();
}


function remove_from_cart(card_id, quantity, tax_amount, product_price_including_quantity){
    console.log( "removing card_id from cart:" + card_id);
    $("#" + card_id).remove();
    
    console.log("(before subtract)net_quantity :" + net_quantity);
    net_quantity -= quantity;
    total_product_price_tax -= tax_amount;
    total_product_price -= product_price_including_quantity ;
    net_total = total_product_price + total_product_price_tax;
    $("#total_cart_value").text(net_quantity);

    // update_total_foot_bar(net_total, shipping_charge, total_product_price_tax, total_product_price);
    total_val_by_jquery();
}

function edit_cart(p_name, p_price, quant, gst, card_id){
     
    
    $(".user_form").css({"display":"block"});
    $("#product_name").val(p_name);
    $("#product_price").val(p_price);
    $("#quantity").val(quant);
    $("#GST").val(gst);

    alert("\n card_id" + card_id);
    $("#user_submission").css({"display":"none"});
    $(".update_form").css({"display":"inline-block"});
    
    var new_net_quantity = net_quantity - quant;
    var new_total_product_price_tax = total_product_price_tax - p_price * quant * gst * 1/100;
    var new_total_product_price = total_product_price -  p_price * quant;

    $(".update_form").click(function(){
      
        updated_base_values(card_id, new_net_quantity, new_total_product_price_tax, new_total_product_price);
        $('.update_form').unbind("click");
      });

   
}

function update_total_foot_bar(net_total, shipping_charge, total_product_price_tax, total_product_price){
    if(net_total > 1000){
        shipping_charge = 100;
     }else{
        shipping_charge = 0;
     }
     console.log("shipping_charge" + shipping_charge);
        $(".total_tax").text(total_product_price_tax);
        $(".total_product_price").text(total_product_price);
        $(".net_total").text(net_total);
        $(".shipping_charge").text(shipping_charge);
}


function updated_base_values(card_id, new_net_quantity, new_total_product_price_tax, new_total_product_price){
    // var cardId = $(this).closest('.card').data('card-id');
    $("#user_submission").css({"display":"inline-block"});
    $(".update_form").css({"display":"none"});

    $("#update_").css({"display":"none"});
    product_name = $("#product_name").val();
    product_price = parseInt($("#product_price").val());
    quantity = parseInt($("#quantity").val());
    tax = parseInt($("#GST").val());
    alert("product_name:" + product_name + " \n product_price:" + product_price + " \n quantity:" + quantity + typeof(quantity) + " \n tax:" + tax + "\n card_id" + card_id );
    close_form();
  
    product_price_including_quantity = product_price * quantity;  //to calculate tax amount
    product_price_tax(product_price_including_quantity);
   
    // $('#'+card_id).find('#p_name').text(product_name);
    $('[id="' + card_id + '"]').find('#p_name').text(product_name);
    $('[id="' + card_id + '"]').find('#p_price').text(product_price);
    $('[id="' + card_id + '"]').find('#quant').html(quantity);
    $('[id="' + card_id + '"]').find('#gst').text(tax_amount);

    net_quantity = new_net_quantity + quantity;
    // $("#total_cart_value").text(net_quantity);

    total_product_price_tax = new_total_product_price_tax + tax_amount; 
    // $(".total_tax").text(total_product_price_tax);

    total_product_price =  new_total_product_price + product_price_including_quantity;
    // $(".total_product_price").text(total_product_price);

    net_total = total_product_price + total_product_price_tax;
    // $(".net_total").text(net_total);

 
    
    total_val_by_jquery();
}



function total_val_by_jquery(){
    var totalPrice = 0;
    var totalQuant = 0;
    var totalTaxAmount = 0;
    var shippingCharge = 0;
    var netTotal = 0;
    $(".card").each(function(){
        var priceText = $(this).find("#p_price").text();
        var quanT = $(this).find("#quant").text();
        var price = parseInt(priceText);
        var quan = parseInt(quanT);
        totalPrice += price * quan ;    
    });
    $(".card").find("#quant").each(function(){
        var quantText = $(this).text();
        var quant = parseInt(quantText);
        totalQuant += quant;    
    });
    
    $(".card").find("#gst").each(function(){
        var gstText = $(this).text();
        var gst = parseInt(gstText);
        totalTaxAmount += gst;    
    });
    netTotal = totalTaxAmount + totalPrice;

    $("#total_cart_value").text(totalQuant);
    update_total_foot_bar(netTotal, shippingCharge, totalTaxAmount, totalPrice);
}
