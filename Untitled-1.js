<script>
var base_val = document.getElementById("edit_button");
var name = base_val.getAttribute("data-product_name");
var price = base_val.getAttribute("data-product_price");
var quan = base_val.getAttribute("data-quantity");
var taxy = base_val.getAttribute("data-tax");
var card_idy = base_val.getAttribute("data-card_id");
$(function(){
  $("#edit_button").click(function(){
    edit_cart(name, price, quan, taxy, card_idy);
  });    
}); console.log("from script of appending card" + name + price + quan + taxy + card_idy);
            </script>
            