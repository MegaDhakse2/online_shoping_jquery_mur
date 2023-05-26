class Car {
    static name(){
        let name = "mega";
        console.log(name);
        return name;
    }
}

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
    <div id="${card_id}" class="card" style="width: 30rem;">
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
            <button class="btn btn-outline-danger btn-sm" onclick="remove_from_cart(${card_id}, ${quantity}, 
                ${tax_amount}, ${product_price_including_quantity})">del
            </button>
            </span>
            <span> <button class="btn btn-outline-info btn-sm" onclick="edit_cart('${product_name}', ${product_price}, 
            ${quantity}, ${tax});">edit</button> </span>

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
 
 update_total_foot_bar(net_total, shipping_charge, total_product_price_tax, total_product_price);
 
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

    update_total_foot_bar(net_total, shipping_charge, total_product_price_tax, total_product_price);

}

function edit_cart(p_name, p_price, quant, gst){

    $("#product_name").val(p_name);
    $("#product_price").val(p_price);
    $("#quantity").val(quant);
    $("#GST").val(gst);
    // dummy();
    updated_base_values();
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


function updated_base_values(){
    product_name = $("#product_name").val();
    product_price = parseInt($("#product_price").val());
    quantity = parseInt($("#quantity").val());
    tax = parseInt($("#GST").val());
    alert("  product_name:" + product_name + " \n product_price:" + product_price + " \n quantity:" + quantity + typeof(quantity) + " \n tax:" + tax);
    close_form();
  
    product_price_including_quantity = product_price * quantity;  //to calculate tax amount
    product_price_tax(product_price_including_quantity);

    $("#p_name").text(product_name);
    $("#p_price").text(product_price);
    $("#quant").text(quantity);
    $("#gst").text(tax_amount);

    // update_total_foot_bar(net_total, shipping_charge, total_product_price_tax, total_product_price);
}

