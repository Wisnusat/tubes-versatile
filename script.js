document.addEventListener("DOMContentLoaded", () => {
  const cartCountElement = document.createElement("span");
  cartCountElement.id = "cart-count";
  document.querySelector(".fa-shopping-bag").style.position = "relative";
  document.querySelector(".fa-shopping-bag").appendChild(cartCountElement);

  // Function to update cart count
  const updateCartCount = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalCount;
    cartCountElement.style.cssText = `
        position: absolute;
        top: -10px;
        right: -10px;
        background: #ff3d3d;
        color: white;
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        font-size: 12px;
        font-weight: bold;
      `;
  };

  // Initialize cart count on page load
  updateCartCount();
  fetch("dummy.json")
    .then((response) => response.json())
    .then((data) => {
      const productContainer = document.querySelector(".product-container");

      data.products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="assets/${product.image}" alt="${product.name}">
            <h3>${product.brand}</h3>
            <p>${product.name}</p>
            <p>${product.price}k</p>
          `;

        // Redirect to detail page on click
        productCard.addEventListener("click", () => {
          window.location.href = `detail.html?id=${product.id}`;
        });

        productContainer.appendChild(productCard);
      });
    })
    .catch((error) => console.error("Error loading products:", error));
});
