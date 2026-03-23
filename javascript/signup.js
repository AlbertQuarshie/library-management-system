document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signupForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const cpassword = document.getElementById("cpassword").value;

    // Check if passwords match
    if (password !== cpassword) {
      alert("Passwords do not match!");
      return;
    }

    // Create user object
    const user = {
       name: name,
      email: email,
      password: password,
    };

    // Store in localStorage
    localStorage.setItem("user", JSON.stringify(user));

    alert("Account created successfully!");

    // Redirect to login page
    window.location.href = "login.html";
  });
});
