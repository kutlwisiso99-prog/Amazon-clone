window.StorageUtils = (function () {
  var CART_KEY = "amazonCloneCart";

  function getCart() {
    try {
      var raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (error) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  function clearCart() {
    localStorage.removeItem(CART_KEY);
  }

  window.saveCart = saveCart;
  window.getCart = getCart;
  window.clearCart = clearCart;

  return {
    saveCart: saveCart,
    getCart: getCart,
    updateCart: saveCart,
    clearCart: clearCart
  };
})();
