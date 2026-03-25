function showToast(message, type = "success") {
  const toast = document.getElementById("toast");

  if (!toast) return;

  toast.textContent = message;


  toast.classList.remove("hidden", "bg-green-600", "bg-red-600");


  if (type === "success") {
    toast.classList.add("bg-green-600");
  } else {
    toast.classList.add("bg-red-600");
  }


  toast.classList.remove("hidden");


  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);
}



document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contact form");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault(); 

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

  
    if (!name || !email || !message) {
      showToast("Please fill in all fields.", "error");
      return;
    }

  
    showToast("Message sent successfully! ✅", "success");

  
    form.reset();
  });
});