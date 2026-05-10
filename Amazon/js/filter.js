window.FilterUtils = {
  byCategory: function (products, category) {
    if (!category || category === "All") return products;
    return products.filter(function (product) {
      return product.category === category;
    });
  }
};
