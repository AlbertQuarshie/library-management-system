// Toast function (same as signup)
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");

  if (!toast) {
    console.error("Toast element not found!");
    return;
  }

  toast.textContent = message;

  // Remove old classes
  toast.classList.remove("show", "success", "error");

  // Restart animation
  void toast.offsetWidth;

  // Add new classes
  toast.classList.add("show", type);

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Wait for page to load
document.addEventListener("DOMContentLoaded", function () {

  const form = document.querySelector("form");

  if (!form) {
    console.error("Form not found!");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault(); 

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Validate empty fields
    if (!email || !password) {
      showToast("Please enter email and password!", "error");
      return;
    }

    // Get stored user
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      showToast("No account found. Please sign up first.", "error");
      return;
    }

    // Validate login
    if (email === storedUser.email && password === storedUser.password) {
      showToast("Login successful!", "success");

      // Save login state
      localStorage.setItem("isLoggedIn", "true");

      // Redirect after short delay
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1500);

    } else {
      showToast("Invalid email or password", "error");
    }
  });

});