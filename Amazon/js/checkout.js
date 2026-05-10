document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("checkout-form");
  var messageEl = document.getElementById("checkout-message");
  if (!form || !messageEl) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (window.Cart.getSummary().totalQuantity === 0) {
      messageEl.textContent = "Your cart is empty. Add products before checkout.";
      return;
    }

    window.Cart.clearCart();
    messageEl.textContent = "Order placed successfully! Thank you for shopping with us.";
    form.reset();

    setTimeout(function () {
      window.location.href = "index.html";
    }, 1800);
  });
});
