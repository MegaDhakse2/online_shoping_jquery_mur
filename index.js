class Car {
    static name(){
        let name = "mega";
        console.log(name);
        return name;
    }
}




// $(document).ready(function(){
    // $('a').attr("href","user_form.html")
    // .html(' <span class="trackName">Track Name</span>');
    
//     $("#user_submission").click(function(){{
//          product_name = $("#product_name").val();
//          product_price = $("#product_price").val();
//          quantity = $("#quantity").val();
//          console.log(product_name + "\n" + product_price +  "\n" + quantity);
//          alert(product_name + "\n" + product_price +  "\n" + quantity);
//         //  window.location.replace("first.html");
//         //  $(".main_div").text("klfjkdlj");
//     }});
     
//    $("#add_cart_button").click(function(){
//     //   $(".main_div").text("klfjkdlj");
//       alert(product_name + "\n" + product_price +  "\n" + quantity);
//     });

// });
    var card_id = 0;

    var product_name = "";
    var product_price = 0;
    var quantity = 0;
    var tax = 0;
    var product_price_including_quantity = 0;
    var net_quantity = 0;
    var total_product_price_tax = 0;
    var total_product_price = 0;
    var shipping_charge = 0;
    var net_total = 0 ;
    // var selected;
    
    

function add_cart(){
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
    total_bar();
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

function dummy(){
    alert(product_name + "\n" + product_price +  "\n" + quantity);  
}

function appending_form_data(){
    card_id += 1;
    product_price_including_quantity = product_price * quantity;
    // $(".cards_appending_div").append("  Product :" + product_name +  "  Quantity :" + quantity  + " Tax : " + product_price_tax(product_price_including_quantity)  + "  Price :" + product_price + "<br>");
    
    var appending_html_card =`
    <div id="${card_id}" class="card" style="width: 25rem;">
        <div>
            <span >Product : ${product_name}</span> &nbsp;
            <span >Quantity :${quantity}</span>&nbsp
            <span >Tax :${product_price_tax(product_price_including_quantity)}</span>  &nbsp;
            <span >Price :${product_price}</span> &nbsp;         
         
            <button class="btn btn-outline-danger btn-sm" onclick="remove_from_cart(${card_id}, ${quantity}, 
                ${product_price_including_quantity})">del</button>
        </div>
   </div>`;

   $(".cards_appending_div").append(appending_html_card);


}

var product_price_tax = function(product_price_including_quantity){
    //let 5% tax for all products
    let tax_amount = product_price_including_quantity * tax * 1/100 ;
    total_product_price_tax += tax_amount; 
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

function total_bar(){

  total_product_price += product_price_including_quantity;
  net_total = total_product_price + total_product_price_tax;
 console.log("total product price TAX is(inside total bar) " + total_product_price_tax);
 console.log("total product PRICE  is(inside total bar) " + total_product_price);
 
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


function remove_from_cart(card_id, quantity, product_price_including_quantity){
    console.log( "removing card_id from cart:" + card_id);
    $("#" + card_id).remove();
    console.log("(before subtract)net_quantity :" + net_quantity);
    net_quantity -= quantity;
    $("#total_cart_value").text(net_quantity);
    // console.log("(after subtract)net_quantity :" + net_quantity);
    
    total_product_price_tax -= product_price_tax(product_price_including_quantity);
    $(".total_tax").text(total_product_price_tax);

    total_product_price -= product_price_including_quantity ;
    $(".total_product_price").text(total_product_price);

    net_total = total_product_price + total_product_price_tax;
    $(".net_total").text(net_total);
    
    if(net_total > 1000){
        shipping_charge = 100;
     }else{
        shipping_charge = 0;
     }
     $(".shipping_charge").text(shipping_charge);
    // product_price_tax(product_price_including_quantity)
    // console.log("total_product_price_tax :" + total_product_price_tax);
    // console.log("product_price_tax :" + product_price_tax(product_price_including_quantity));

}