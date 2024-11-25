document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get("id"), 10);

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

  // Function to display a toast notification
  const showToast = (message) => {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("fade-out");
      toast.addEventListener("transitionend", () => toast.remove());
    }, 3000); // Toast disappears after 3 seconds
  };

  // Initialize cart count on page load
  updateCartCount();

  fetch("dummy.json")
    .then((response) => response.json())
    .then((data) => {
      const product = data.products.find((item) => item.id === productId);

      if (product) {
        // Populate product details
        document.querySelector(
          ".product-image img"
        ).src = `assets/${product.image}`;
        document.querySelector(".product-info h1").textContent = product.brand;
        document.querySelector(".product-info h2").textContent = product.name;
        document.querySelector(
          ".rating span:last-child"
        ).textContent = `(${product.rating})`;
        document.querySelector(
          ".price"
        ).textContent = `Price: ${product.price}k`;
        document.querySelector(".product-description p").textContent =
          product.description;

        // Quantity selection
        let quantity = 1;
        const quantityElement = document.getElementById("quantity");
        const decreaseButton = document.getElementById("decrease");
        const increaseButton = document.getElementById("increase");

        decreaseButton.addEventListener("click", () => {
          if (quantity > 1) {
            quantity--;
            quantityElement.textContent = quantity;
          }
        });

        increaseButton.addEventListener("click", () => {
          quantity++;
          quantityElement.textContent = quantity;
        });

        // Add to cart button
        document.querySelector(".btn-primary").addEventListener("click", () => {
          const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
          cartItems.push({ ...product, quantity });
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          updateCartCount(); // Update cart count

          // Show toast notification
          showToast(`${product.brand} ${product.name} has been added to your cart.`);
        });
      } else {
        showToast("Product not found.");
      }
    })
    .catch((error) => console.error("Error loading product:", error));
});
