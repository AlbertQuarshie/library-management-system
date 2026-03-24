let allBooks = [];

// Toast function
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");

  if (!toast) return;

  toast.textContent = message;

  toast.classList.remove("show", "success", "error");
  void toast.offsetWidth;
  toast.classList.add("show", type);

  setTimeout(() => {
    toast.classList.remove("show");
  }, 5000);
}

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const navRight = document.getElementById("nav-right");
  const logoutBtn = document.getElementById("logout-btn");

  // Navbar
  if (navRight) {
    if (user && isLoggedIn) {
      const username = user.email.split("@")[0];

      navRight.innerHTML = `
        <span class="text-sm font-semibold text-white">
          Welcome, ${username}
        </span>
      `;
    } else {
      navRight.innerHTML = `
        <a href="login.html" class="text-[#8BAE66] font-bold hover:text-white">
          Login
        </a>
        <a href="signup.html" class="bg-[#8BAE66] px-3 py-1 rounded text-sm text-white hover:bg-green-600">
          Sign Up
        </a>
      `;
    }
  }

  // Logout button
  if (logoutBtn) {
    logoutBtn.style.display = user && isLoggedIn ? "flex" : "none";
  }

  displayBorrowedBooks();
});


// Sidebar
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const icon = document.getElementById("toggle-icon");

  sidebar.classList.toggle("w-64");
  sidebar.classList.toggle("w-20");
  icon.classList.toggle("rotate-180");

  document
    .querySelectorAll(".sidebar-content")
    .forEach((el) => el.classList.toggle("hidden"));
}


// Dark mode
function toggleDarkMode() {
  document.documentElement.classList.toggle("dark");
}


// Display borrowed books
function displayBorrowedBooks() {
  const container = document.getElementById("borrowed-container");

  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const books = JSON.parse(localStorage.getItem("borrowedBooks")) || [];

  // Not logged in
  if (!user || !isLoggedIn) {
    container.innerHTML = `
      <p class="text-gray-500 col-span-full">
        Please login to view your borrowed books.
      </p>
    `;
    showToast("Please login first", "error");
    return;
  }

  // Empty
  if (books.length === 0) {
    container.innerHTML = `
      <p class="text-gray-500 col-span-full">
        You haven't borrowed any books yet.
      </p>
    `;
    return;
  }

  container.innerHTML = "";

  books.forEach((book, index) => {
    const borrowDate = book.borrowDate
      ? new Date(book.borrowDate).toLocaleDateString()
      : "N/A";

    const returnDateObj = book.returnDate
      ? new Date(book.returnDate)
      : null;

    const returnDate = returnDateObj
      ? returnDateObj.toLocaleDateString()
      : "N/A";

    const today = new Date();

    let statusText = "";
    let statusColor = "text-gray-400";

    if (returnDateObj) {
      if (today > returnDateObj) {
        statusText = "OVERDUE";
        statusColor = "text-red-500 font-bold";
      } else {
        statusText = "ACTIVE";
        statusColor = "text-green-500";
      }
    }

    const card = `
      <div class="bg-white dark:bg-gray-700 p-4 rounded-xl shadow border flex flex-col h-full">

        <div class="w-full h-48 flex items-center justify-center rounded-md mb-3 bg-gray-200">
          <img src="${book.cover}" class="max-h-full max-w-full object-contain">
        </div>

        <div class="flex-1 flex flex-col">
          <h4 class="font-bold text-sm dark:text-white">
            ${book.title}
          </h4>

          <p class="text-xs text-gray-500">
            ${book.author}
          </p>

          <p class="text-xs text-gray-400 mt-2">
            Borrowed: ${borrowDate}
          </p>

          <p class="text-xs text-gray-400">
            Return by: ${returnDate}
          </p>

          <p class="text-xs mt-1 ${statusColor}">
            Status: ${statusText}
          </p>
        </div>

        <button onclick="returnBook(${index})"
          class="mt-3 w-full py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200">
          Return
        </button>

      </div>
    `;

    container.insertAdjacentHTML("beforeend", card);
  });
}


// Return book
function returnBook(index) {
  const books = JSON.parse(localStorage.getItem("borrowedBooks")) || [];

  if (!books[index]) {
    showToast("Book not found", "error");
    return;
  }

  const title = books[index].title;

  // Remove book
  books.splice(index, 1);
  localStorage.setItem("borrowedBooks", JSON.stringify(books));

  displayBorrowedBooks();

  showToast(`"${title}" returned successfully`, "success");
}


// Logout
function logout() {
  localStorage.setItem("isLoggedIn", "false");

  showToast("Logged out successfully", "success");

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1500);
}