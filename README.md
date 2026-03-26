# Literary Oasis

This project is the creation of a modern online library system inspired by digital library platforms such as Open Library and Goodreads for my End of Module Project.

Mainly it is made in mind to work hand in hand with the physical libraries of institutions for record purposes.

## Contributor  
Albert Junior Quarshie  

### A Project Brief

Literary Oasis is a web-based digital library system that allows users to search, browse, and borrow books. It integrates with the Open Library API to provide real-time book data, including titles, authors, covers, and publication years. The system simulates a real-world library experience with borrowing limits, return tracking, and a 2-week loan period.


### B. Core Features

#### 1. Public Book Browsing  
Users can browse and search books without needing to log in, making the platform accessible to everyone.

#### 2. Book Borrowing System  
Registered users can borrow books with enforced rules such as a 5-book limit, duplicate prevention, and confirmation prompts.

#### 3. Return Tracking System  
Borrowed books include a 2-week return period with status tracking (Active / Overdue).

#### 4. Advanced Search & Filters  
Users can search books and filter results by title, year, and availability of book covers.

#### 5. Responsive UI Design  
Built with Tailwind CSS to ensure a clean, modern, and mobile-friendly interface.


### C. Technologies Used
- HTML5 - Basic web structure
- JavaScript - Logic and functionality 
- Tailwind CSS  - Styling
- Open Library API - Fetching Data
- FontAwesome - Use of Icons


### D. Usage Instruction
1. Clone the repository:
```bash 
git clone git@github.com:AlbertQuarshie/library-management-system.git
```
2. Open the project folder.

3. Open index html in any modern browser.


### D. Business Rationale

Literary Oasis aims to modernize access to books by simulating a lightweight digital library system that demonstrates how public APIs and web technologies can be combined to create scalable educational platforms. The project emphasizes accessibility, user experience, and structured borrowing logic, reflecting how digital libraries can support learning and reading culture in a digital-first environment.


### E. Future Improvements
#### 1. Admin Dashboard
- The system admin can manage the users and records such as their books. (That is add delete or edit.)

#### 2. Database System
- Since we are using localstorage, data is only persisted on the browser session. A system like Mysql, Django can be implemented at the backend of the system to store all data ranging from users to books.

#### 3. Advanced Filtering
- The current filtering system only filters by relevance, date and alphabet so later we can introduce filtering by genre, author and many others