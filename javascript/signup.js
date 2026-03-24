// Toast function
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");

  if (!toast) {
    console.error("Toast element not found!");
    return;
  }

  toast.textContent = message;


  toast.className = "toast";


  toast.classList.add("show", type);

  // Hide after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signupForm");

  if (!form) {
    console.error("Form not found!");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const cpassword = document.getElementById("cpassword").value;

    // Basic validation
    if (!name || !email || !password || !cpassword) {
      showToast("Please fill in all fields!", "error");
      return;
    }

    // Check password match
    if (password !== cpassword) {
      showToast("Passwords do not match!", "error");
      return;
    }

    // Create user object
    const user = {
      name: name,
      email: email,
      password: password,
    };

    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(user));

    // Success toast
    showToast("Account created successfully!", "success");

    // Redirect after delay (so toast is visible)
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  });
});