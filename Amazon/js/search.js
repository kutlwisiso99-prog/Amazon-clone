window.SearchUtils = {
  byTitle: function (products, searchValue) {
    if (!searchValue) return products;
    return products.filter(function (product) {
      return product.title.toLowerCase().includes(searchValue.toLowerCase());
    });
  }
};
