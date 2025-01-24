# React Dashboard Application

This is a React-based web application providing distinct dashboards for teachers and students. The application includes user authentication, class schedules, and resource management functionalities.

## Features

- **User Authentication**: Register and log in securely.
- **Student Dashboard**: View class schedules and download resources.
- **Teacher Dashboard**: Upload resources and schedule classes.
- **Notifications**: Feedback and error messages using `react-toastify`.

## Tech Stack

- React
- React Router
- Styled Components
- Axios
- React Toastify
- Node.js (for API backend)

---

## Installation and Setup

### Prerequisites

Ensure the following are installed:

- [Node.js](https://nodejs.org/) (v14 or above)
- npm or yarn

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/react-dashboard-app.git
   cd react-dashboard-app
   ```

2. Install dependencies:

   ```bash
   npm install
   # Or if you use yarn
   yarn install
   ```

3. Start the development server:

   ```bash
   npm start
   # Or
   yarn start
   ```

4. Open your browser and visit:

   ```
   http://localhost:3000
   ```

---

## API Setup

This project requires a backend server. Follow the steps below to set it up:

1. Install and configure your API server (Node.js/Express).
2. Ensure the following API endpoints are implemented:

   - **POST** `/api/student/schedules`: Fetch student schedules.
   - **POST** `/api/student/resources`: Fetch downloadable resources.
   - **POST** `/api/teacher/upload`: Upload resources.
   - **POST** `/api/teacher/schedule`: Schedule a class.

3. Update the API base URL in `services/api.js` to point to your backend:

   ```javascript
   import axios from "axios";

   const instance = axios.create({
     baseURL: "http://your-backend-server.com", // Update with your API URL
   });

   export default instance;
   ```

---

## Project Structure

```plaintext
src/
├── components/
│   ├── TeacherDashboard.js
│   ├── StudentDashboard.js
├── pages/
│   ├── Register.js
│   ├── Login.js
├── services/
│   └── api.js
├── styles/
│   └── GlobalStyles.js
├── App.js
└── index.js
```

---

## Environment Variables

Set up the following environment variables in a `.env` file at the root of the project:

```env
REACT_APP_API_BASE_URL=http://localhost:5001 # Replace with your API URL
```
