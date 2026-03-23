// Wait for page to load
document.addEventListener("DOMContentLoaded", function () {

  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // stop page refresh

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Get stored user
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("No account found. Please register first.");
      return;
    }

    // Validate login
    if (email === storedUser.email && password === storedUser.password) {
      alert("Login successful!");

      // Save login state
      localStorage.setItem("isLoggedIn", "true");

      // Redirect
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid email or password");
    }
  });

});