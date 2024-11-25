document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const subtotalElement = document.getElementById("subtotal");
  const totalElement = document.getElementById("total");
  const shippingCost = 100; // Fixed shipping cost

  // Retrieve cart items from localStorage
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Function to calculate subtotal
  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  // Function to render cart items
  const renderCartItems = () => {
    cartItemsContainer.innerHTML = ""; // Clear existing items

    cartItems.forEach((item, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
          <td>
            <img src="assets/${item.image}" alt="${item.name}" />
            <div>
              <div class="product-name">${item.name}</div>
              <div class="product-brand">${item.brand}</div>
            </div>
          </td>
          <td>${item.price}k</td>
          <td>
            <div class="quantity-selector">
              <button class="decrease" data-index="${index}">-</button>
              <span>${item.quantity}</span>
              <button class="increase" data-index="${index}">+</button>
            </div>
          </td>
          <td>${item.price * item.quantity}k</td>
        `;

      cartItemsContainer.appendChild(row);
    });

    updateSummary();
  };

  // Function to update summary
  const updateSummary = () => {
    const subtotal = calculateSubtotal();
    subtotalElement.textContent = `${subtotal}k`;
    totalElement.textContent = `${subtotal + shippingCost}k`;
  };

  // Event delegation for quantity buttons
  cartItemsContainer.addEventListener("click", (event) => {
    const index = event.target.dataset.index;

    if (event.target.classList.contains("decrease") && index !== undefined) {
      if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
      } else {
        cartItems.splice(index, 1); // Remove item if quantity is 0
      }
    }

    if (event.target.classList.contains("increase") && index !== undefined) {
      cartItems[index].quantity++;
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    renderCartItems();
  });

  // Initial render
  renderCartItems();
});
