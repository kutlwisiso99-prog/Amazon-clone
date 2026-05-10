document.addEventListener("DOMContentLoaded", function () {
  var productsGrid = document.getElementById("products-grid");
  var categoryGrid = document.getElementById("category-grid");
  var searchInput = document.getElementById("search-input");
  var resultText = document.getElementById("result-text");
  var heroSlides = document.querySelectorAll(".hero-slide");
  var heroPrev = document.getElementById("hero-prev");
  var heroNext = document.getElementById("hero-next");

  if (!productsGrid || !categoryGrid) return;

  var activeCategory = "All";
  var activeSearch = "";

  function renderProducts(products) {
    if (!products.length) {
      productsGrid.innerHTML = "<p class='empty-state'>No products found. Try another search term.</p>";
      resultText.textContent = "0 products found";
      return;
    }

    productsGrid.innerHTML = products.map(function (product) {
      return (
        "<article class='product-card'>" +
          "<img src='" + product.image + "' alt='" + product.title + "' />" +
          "<h3>" + product.title + "</h3>" +
          "<p class='price'>$" + product.price.toFixed(2) + "</p>" +
          "<p class='rating'>Rating: " + product.rating + " / 5</p>" +
          "<button class='btn-primary add-cart-btn' data-id='" + product.id + "'>Add to Cart</button>" +
        "</article>"
      );
    }).join("");
    resultText.textContent = products.length + " product(s) found";
  }

  function renderCategories() {
    categoryGrid.innerHTML = window.CATEGORIES.map(function (category) {
      return (
        "<button class='category-card" + (category.name === activeCategory ? " selected" : "") + "' data-category='" + category.name + "'>" +
          "<img src='" + category.image + "' alt='" + category.name + "' />" +
          "<span>" + category.name + "</span>" +
        "</button>"
      );
    }).join("");
  }

  function applyFilters() {
    var categoryFiltered = window.FilterUtils.byCategory(window.PRODUCTS, activeCategory);
    var fullyFiltered = window.SearchUtils.byTitle(categoryFiltered, activeSearch);
    renderProducts(fullyFiltered);
  }

  function setupHeroCarousel() {
    if (!heroSlides.length || !heroPrev || !heroNext) return;
    var activeIndex = 0;
    var autoSlideId;

    function setSlide(nextIndex) {
      heroSlides[activeIndex].classList.remove("active");
      activeIndex = (nextIndex + heroSlides.length) % heroSlides.length;
      heroSlides[activeIndex].classList.add("active");
    }

    function startAutoSlide() {
      autoSlideId = window.setInterval(function () {
        setSlide(activeIndex + 1);
      }, 4000);
    }

    function resetAutoSlide() {
      if (autoSlideId) window.clearInterval(autoSlideId);
      startAutoSlide();
    }

    heroPrev.addEventListener("click", function () {
      setSlide(activeIndex - 1);
      resetAutoSlide();
    });

    heroNext.addEventListener("click", function () {
      setSlide(activeIndex + 1);
      resetAutoSlide();
    });

    startAutoSlide();
  }

  productsGrid.addEventListener("click", function (event) {
    var target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.classList.contains("add-cart-btn")) {
      var id = Number(target.getAttribute("data-id"));
      window.Cart.addToCart(id);
    }
  });

  categoryGrid.addEventListener("click", function (event) {
    var target = event.target;
    if (!(target instanceof HTMLElement)) return;
    var card = target.closest(".category-card");
    if (!card) return;
    activeCategory = card.getAttribute("data-category") || "All";
    renderCategories();
    applyFilters();
  });

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      activeSearch = searchInput.value.trim();
      applyFilters();
    });
  }

  renderCategories();
  applyFilters();
  setupHeroCarousel();
});
