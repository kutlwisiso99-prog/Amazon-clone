window.Cart = (function () {
  function getCartItems() {
    return window.StorageUtils.getCart();
  }

  function setCartItems(cart) {
    window.StorageUtils.saveCart(cart);
    updateBadge();
  }

  function addToCart(productId) {
    var product = window.PRODUCTS && window.PRODUCTS.find(function (p) { return p.id === productId; });
    if (!product) return;

    var cart = getCartItems();
    var existing = cart.find(function (item) { return item.id === productId; });
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
    setCartItems(cart);
  }

  function removeFromCart(productId) {
    var cart = getCartItems().filter(function (item) {
      return item.id !== productId;
    });
    setCartItems(cart);
    renderCartPage();
  }

  function updateQuantity(productId, change) {
    var cart = getCartItems();
    var item = cart.find(function (entry) { return entry.id === productId; });
    if (!item) return;
    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter(function (entry) { return entry.id !== productId; });
    }
    setCartItems(cart);
    renderCartPage();
  }

  function clearCartAll() {
    window.StorageUtils.clearCart();
    updateBadge();
    renderCartPage();
  }

  function getSummary() {
    var cart = getCartItems();
    var subtotal = cart.reduce(function (acc, item) { return acc + item.price * item.quantity; }, 0);
    var totalQuantity = cart.reduce(function (acc, item) { return acc + item.quantity; }, 0);
    return {
      subtotal: subtotal,
      totalItems: cart.length,
      totalQuantity: totalQuantity
    };
  }

  function updateBadge() {
    var badge = document.getElementById("cart-badge");
    if (!badge) return;
    var summary = getSummary();
    badge.textContent = String(summary.totalQuantity);
  }

  function renderCartPage() {
    var container = document.getElementById("cart-items");
    if (!container) return;

    var cart = getCartItems();
    if (!cart.length) {
      container.innerHTML = "<p class='empty-state'>Your cart is empty. Start shopping on the homepage.</p>";
    } else {
      container.innerHTML = cart.map(function (item) {
        return (
          "<article class='cart-item'>" +
            "<img src='" + item.image + "' alt='" + item.title + "' />" +
            "<div class='cart-item-content'>" +
              "<h3>" + item.title + "</h3>" +
              "<p>$" + item.price.toFixed(2) + "</p>" +
              "<div class='quantity-controls'>" +
                "<button data-action='decrease' data-id='" + item.id + "'>-</button>" +
                "<span>" + item.quantity + "</span>" +
                "<button data-action='increase' data-id='" + item.id + "'>+</button>" +
              "</div>" +
              "<button class='remove-btn' data-action='remove' data-id='" + item.id + "'>Remove</button>" +
            "</div>" +
          "</article>"
        );
      }).join("");
    }

    var summary = getSummary();
    var itemsEl = document.getElementById("summary-items");
    var quantityEl = document.getElementById("summary-quantity");
    var subtotalEl = document.getElementById("summary-subtotal");
    if (itemsEl) itemsEl.textContent = String(summary.totalItems);
    if (quantityEl) quantityEl.textContent = String(summary.totalQuantity);
    if (subtotalEl) subtotalEl.textContent = "$" + summary.subtotal.toFixed(2);
  }

  function bindCartEvents() {
    var cartContainer = document.getElementById("cart-items");
    if (cartContainer) {
      cartContainer.addEventListener("click", function (event) {
        var target = event.target;
        if (!(target instanceof HTMLElement)) return;
        var id = Number(target.getAttribute("data-id"));
        var action = target.getAttribute("data-action");
        if (!id || !action) return;

        if (action === "increase") updateQuantity(id, 1);
        if (action === "decrease") updateQuantity(id, -1);
        if (action === "remove") removeFromCart(id);
      });
    }

    var clearBtn = document.getElementById("clear-cart-btn");
    if (clearBtn) {
      clearBtn.addEventListener("click", clearCartAll);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    updateBadge();
    renderCartPage();
    bindCartEvents();
  });

  return {
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    updateCart: setCartItems,
    getCart: getCartItems,
    clearCart: clearCartAll,
    getSummary: getSummary,
    updateBadge: updateBadge
  };
})();
