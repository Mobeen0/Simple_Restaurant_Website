/* Set rates + misc */
var GST = 0.05;
var delivery_chrg = 120.00; 
var fadePeriod = 300;


/* Assign actions */
$('.quantity input').change( function() {
  updateQuantity(this);
});

$('.removal button').click( function() {
  removeItem(this);
});


/* Recalculate cart */
function recalculateCart()
{
  var subtotal = 0;
  
  /* Sum up row totals */
  $('.product').each(function () {
    subtotal += parseFloat($(this).children('.end-price').text());
  });
  
  /* Calculate totals */
  var tax = subtotal * GST;
  var shipping = (subtotal > 0 ? delivery_chrg : 0);
  var total = subtotal + tax + shipping;
  
  /* Update totals display */
  $('.totals-value').fadeOut(fadePeriod, function() {
    $('#cart-subtotal').html(subtotal.toFixed(2));
    $('#cart-tax').html(tax.toFixed(2));
    $('#cart-shipping').html(shipping.toFixed(2));
    $('#cart-total').html(total.toFixed(2));
    if(total == 0){
      $('.cartadd').fadeOut(fadePeriod);
    }else{
      $('.cartadd').fadeIn(fadePeriod);
    }
    $('.totals-value').fadeIn(fadePeriod);
  });
}



/* Update quantity */
function updateQuantity(quantityInput)
{
  /* Calculate line price */
  var productRow = $(quantityInput).parent().parent();
  var price = parseFloat(productRow.children('.price').text());
  var quantity = $(quantityInput).val();
  var linePrice = price * quantity;
  
  /* Update line price display and recalc cart totals */
  productRow.children('.end-price').each(function () {
    $(this).fadeOut(fadePeriod, function() {
      $(this).text(linePrice.toFixed(2));
      recalculateCart();
      $(this).fadeIn(fadePeriod);
    });
  });  
}


/* Remove item from cart */
function removeItem(removeButton)
{
  /* Remove row from DOM and recalc cart total */
  var productRow = $(removeButton).parent().parent();
  productRow.slideUp(fadePeriod, function() {
    productRow.remove();
    recalculateCart();
  });
}