$(document).ready(function() {
  calcTotal();
});

$('.btn-remove').click(function(e) {
  var td = e.target.parentElement;
  var tr = td.parentElement;
  tr.remove();
  calcTotal();
})


function calcTotal() {
  var total = getSum($('.price-value'));
  $('#total-amount').text(total);
  $('#discoundt').text(total/100);
  $('#total-discount').text(total - total/100);
}

function getSum(items) {
  var total = 0;
  for (i = 0; i < items.length; i++) {
    var price = parseInt(items[i].value);
    total += price;
  }
  return total;
}