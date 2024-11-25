document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const usernameError = document.getElementById("username-error");
  const passwordError = document.getElementById("password-error");

  const correctUsername = "user@test.com";
  const correctPassword = "password";

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

  // Form submit event listener
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form from submitting

    let hasError = false;

    // Clear previous error messages
    usernameError.style.display = "none";
    passwordError.style.display = "none";
    usernameInput.style.marginBottom = "0";
    passwordInput.style.marginBottom = "1px";

    // Check if username is empty
    if (!usernameInput.value.trim()) {
      usernameError.textContent = "Username cannot be empty.";
      usernameError.style.display = "block";
      hasError = true;
    }

    // Check if password is empty
    if (!passwordInput.value.trim()) {
      passwordError.textContent = "Password cannot be empty.";
      passwordError.style.display = "block";
      hasError = true;
    }

    // Stop processing if there are errors
    if (hasError) return;

    // Validate credentials
    if (
      usernameInput.value === correctUsername &&
      passwordInput.value === correctPassword
    ) {
      showToast("Login successful!");
      window.location.href = "./index.html"; // Redirect to homepage
    } else {
      usernameError.textContent = "Invalid username or password.";
      usernameError.style.display = "block";
    }
  });
});
