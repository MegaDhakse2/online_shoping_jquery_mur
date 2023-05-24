class Car {
    static name(){
        let name = "mega";
        console.log(name);
        return name;
    }
}


var product_name;
var product_price;
var quantity;

$(document).ready(function(){
    // $('a').attr("href","user_form.html")
    // .html(' <span class="trackName">Track Name</span>');

    $("#user_submission").click(function(){{
         product_name = $("#product_name").val();
         product_price = $("#product_price").val();
         quantity = $("#quantity").val();
         console.log(product_name + "\n" + product_price +  "\n" + quantity);
         window.location.replace("first.html");
         $(".main_div").text("klfjkdlj");
    }});


});


function method(){
    $(".main_div").text("klfjkdlj");
}
// $(document).ready(function(){
//     $("#user_submission").click(function(){{
//         let quantity = $("#quantity").val();
//        alert(quantity);
//     }});
// });