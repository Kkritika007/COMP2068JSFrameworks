# COMP2068JSFrameworks
# Habit Tracker Application
A dynamic and intuitive Habit Tracker application that helps users set, monitor, and maintain habits with visual progress tracking. Built using Node.js, Express, MongoDB, and Handlebars, this application features CRUD functionality, user authentication, and a visually engaging streak chart.

## Features 
User Authentication: Secure registration and login with hashed passwords using Passport.js.
Habit Management: Create, read, update, and delete habits seamlessly.
Progress Visualization: Track habit streaks over time with charts using Chart.js.
Responsive Design: Mobile-friendly UI with Bootstrap and custom CSS.
Read-Only Mode: View habits without the ability to edit or delete them.
Persistent Storage: Data stored in MongoDB for scalability and reliability.

## Prerequisites

Before running the application, ensure the following are installed:

Node.js (v14.x or later)
npm (Node Package Manager)
MongoDB (Local or Atlas Cloud)
VS Code (Recommended IDE)

## Setup Instructions
### 1. Clone the Repository
Clone the project repository and navigate to the project folder:

bash
Copy code
git clone <repository_url>
cd habit-tracker
### 2. Install Dependencies
Run the following command to install the required packages:

bash
Copy code
npm install
### 3. Configure Environment Variables
Create a .env file in the project root directory and add the following:

env
Copy code
MongoDB_URI=your_mongo_db_connection_string
SESSION_SECRET=your_secret_key
Replace your_mongo_db_connection_string with your MongoDB URI and your_secret_key with a secure session secret.

### 4. Start the Application
Start the server with the following command:

bash
Copy code
npm start
The application will be accessible at http://localhost:3000.

## File Structure
plaintext
Copy code
project-root/
├── public/
│   ├── images/             # Image assets
│   ├── scripts/            # JavaScript for charts
│   │   └── chart.js
│   └── styles/             # CSS files for styling
│       └── styles.css
├── views/
│   ├── habits/             # Views for habit operations
│   │   ├── index.hbs
│   │   ├── create.hbs
│   │   ├── edit.hbs
│   │   ├── view.hbs
│   │   └── progress.hbs
│   ├── partials/           # Shared header and footer
│   │   ├── header.hbs
│   │   └── footer.hbs
│   └── error.hbs           # Error page
├── routes/
│   ├── index.js            # Home routes
│   ├── users.js            # User authentication routes
│   └── habits.js           # Habit CRUD routes
├── models/                 # Database models
│   ├── Habit.js
│   └── User.js
├── config/
│   └── passport.js         # Passport configuration
├── .env                    # Environment variables
├── app.js                  # Main application file
├── package.json            # Project metadata and dependencies
└── README.md               # Project documentation (this file)

## Key Functionalities
User Authentication
Register: New users can sign up with unique email addresses.
Login: Authenticate with secure credentials.
Logout: Safely terminate the session.
Habit Management
Create Habits: Set up new daily or weekly habits.
Track Progress: View streaks and performance.
Update Habits: Modify existing habit details.
Delete Habits: Remove habits no longer needed.
Progress Tracking
Uses Chart.js to display streak data in a user-friendly format.
Helps visualize consistency over time.

## Testing
Use the following tools to test and debug the application:

Postman: For API endpoint testing.
MongoDB Compass: For managing the database.
Browser DevTools: Inspect elements and debug UI.

## Styling and Themes
The application uses Bootstrap for responsive design and custom CSS (styles.css) for additional styling:

Header and Footer: Consistent design across all pages.
Charts: Interactive streak visualization with hover effects.
Mobile Optimization: Fully functional across devices.

## Recommended VS Code Extensions
Here are some extensions to enhance your development experience:

Prettier - Code formatter for consistent styling.
ESLint - Linter for identifying coding issues.
dotenv - Syntax highlighting for .env files.
GitLens - Insights into version control history.
MongoDB for VS Code - Direct database interaction.
## Demo Credentials
You can use the following credentials for testing (if a demo mode is available):

Email	Password
demo@example.com	demo123
## License
This project is licensed under the MIT License. Feel free to modify and distribute it.

## Acknowledgements
Special thanks to:

Node.js: For server-side runtime.
Express: For the application framework.
MongoDB: For data persistence.
Chart.js: For interactive visualizations.
