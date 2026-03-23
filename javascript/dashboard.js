let allBooks = [];

document.addEventListener("DOMContentLoaded", () => {

    const user = JSON.parse(localStorage.getItem('user'));
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    const navRight = document.getElementById('nav-right');
    const logoutBtn = document.getElementById('logout-btn');

    // Navbar
    if (navRight) {
        if (user && isLoggedIn) {
            const username = user.email.split('@')[0];

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

    // Show/hide Logout button
    if (logoutBtn) {
        logoutBtn.style.display = (user && isLoggedIn) ? "flex" : "none";
    }

    loadDefaultBooks();
});


// sidebar
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


// default look
async function loadDefaultBooks() {
    const container = document.getElementById("book-results");

    container.innerHTML = `
        <p class="text-gray-500 col-span-full">Loading books...</p>
    `;

    try {
        const response = await fetch(`https://openlibrary.org/search.json?q=programming`);
        const data = await response.json();

        allBooks = data.docs || [];
        renderBooks();

    } catch (error) {
        container.innerHTML = `
            <p class="text-red-500 col-span-full">Failed to load books.</p>
        `;
    }
}


// Search books
async function searchBooks(event) {
    if (event) event.preventDefault();

    const query = document.getElementById("search-input").value;
    const container = document.getElementById("book-results");

    if (!query) return;

    container.innerHTML = `
        <p class="text-gray-500 col-span-full">Searching for "${query}"...</p>
    `;

    try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
        const data = await response.json();

        allBooks = data.docs || [];
        renderBooks();

    } catch (error) {
        container.innerHTML = `
            <p class="text-red-500 col-span-full">Error fetching books.</p>
        `;
    }
}


// Filter and sort
function renderBooks() {
    const container = document.getElementById("book-results");

    let books = [...allBooks];

    const sortValue = document.getElementById("sort-filter")?.value;
    const hasCoverOnly = document.getElementById("has-cover")?.checked;

    if (hasCoverOnly) {
        books = books.filter(book => book.cover_i);
    }

    if (sortValue === "title-asc") {
        books.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    }

    if (sortValue === "title-desc") {
        books.sort((a, b) => (b.title || "").localeCompare(a.title || ""));
    }

    if (sortValue === "year-new") {
        books.sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0));
    }

    if (sortValue === "year-old") {
        books.sort((a, b) => (a.first_publish_year || 0) - (b.first_publish_year || 0));
    }

    container.innerHTML = "";

    if (books.length === 0) {
        container.innerHTML = `
            <p class="text-gray-500 col-span-full">No books found.</p>
        `;
        return;
    }

    books.slice(0, 12).forEach(book => {

        const title = book.title || "No Title";
        const author = book.author_name?.[0] || "Unknown Author";
        const year = book.first_publish_year || "Unknown";

        const coverUrl = book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : "https://via.placeholder.com/150x225?text=No+Cover";

        const card = `
            <div class="bg-white dark:bg-gray-700 p-4 rounded-xl shadow border dark:border-gray-600 flex flex-col">

                <div class="w-full h-48 overflow-hidden rounded-md mb-3 bg-gray-200 dark:bg-gray-600">
                    <img src="${coverUrl}" class="w-full h-full object-contain">
                </div>

                <h4 class="font-bold text-sm dark:text-white">${title}</h4>
                <p class="text-xs text-gray-500">${author}</p>

                <p class="text-xs text-gray-400 mt-1">
                    Year: ${year}
                </p>

                <button onclick="orderBook('${title}', '${author}', '${coverUrl}')"
                    class="mt-auto w-full py-1 text-xs bg-blue-100 text-blue-700 rounded">
                    Borrow
                </button>

            </div>
        `;

        container.insertAdjacentHTML("beforeend", card);
    });
}


// Filter
document.getElementById("sort-filter")?.addEventListener("change", renderBooks);
document.getElementById("has-cover")?.addEventListener("change", renderBooks);


// Borrow books 
function orderBook(title, author, cover) {

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const user = JSON.parse(localStorage.getItem('user'));

    if (!isLoggedIn || !user) {
        alert("Please login first!");
        window.location.href = "login.html";
        return;
    }

    const borrowed = JSON.parse(localStorage.getItem('borrowedBooks')) || [];

    if (borrowed.length >= 5) {
        alert("You can only borrow up to 5 books.");
        return;
    }

    if (borrowed.some(b => b.title === title)) {
        alert("You already borrowed this book.");
        return;
    }

    const confirmBorrow = confirm(`Borrow "${title}"`);
    if (!confirmBorrow) return;

    const borrowDate = new Date();
    const returnDate = new Date();
    returnDate.setDate(borrowDate.getDate() + 14);

    borrowed.push({
        title,
        author,
        cover,
        borrowDate: borrowDate.toISOString(),
        returnDate: returnDate.toISOString()
    });

    localStorage.setItem('borrowedBooks', JSON.stringify(borrowed));

    alert("Book borrowed successfully!");
}


// Logout
function logout() {
    localStorage.setItem('isLoggedIn', 'false');
    window.location.href = "index.html";
}