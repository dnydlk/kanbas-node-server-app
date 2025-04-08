# Kanbas: A Canvas-Inspired Learning Management System

**Kanbas** is a full-stack web application designed as a replica of the popular learning management system, Canvas. It re-creates key functionalities such as course management, assignment handling, and interactive user interfaces, delivering an experience reminiscent of Canvas while showcasing modern web development practices.

## Project Overview

- **Name:** Kanbas  
- **Description:** Kanbas is a replica of the popular LMS Canvas. The project re-creates essential features including course management, assignment tracking, and interactive interfaces, all aimed at providing a user-friendly and robust learning experience.  
- **Purpose:** Built to demonstrate advanced full-stack development skills, Kanbas not only mimics a leading educational platform but also serves as a hands-on project for building scalable, responsive applications with modern technologies.  
- **Target Audience:** This project is ideal for educators, students, and developers interested in learning management systems, as well as recruiters evaluating practical web development skills.

## Repository Structure

This project is separated into two interconnected repositories:

1. **Front-End:** [kanbas-react-web-app](https://github.com/dnydlk/kanbas-react-web-app)  
   - **Technologies:** HTML5, CSS3, JavaScript, React.js, Redux  
   - **Key Features:**  
     - Interactive and dynamic UI with drag-and-drop functionality  
     - Responsive design for optimal performance on mobile and desktop devices  
     - Seamless integration with the backend API for real-time updates

2. **Back-End:** [kanbas-node-server-app](https://github.com/dnydlk/kanbas-node-server-app)  
   - **Technologies:** Node.js, Express, MongoDB 
   - **Key Features:**  
     - RESTful API endpoints for managing courses, assignments, and user data  
     - Secure user authentication and authorization  
     - Robust and scalable handling of concurrent requests

## Key Features & Functionality

- **User Authentication:** Secure registration and login to protect user data.  
- **Course & Assignment Management:** Create, update, and delete courses and assignments, mimicking the Canvas experience.  
- **Dynamic Dashboards:** Interactive interfaces providing real-time updates and a cohesive user experience.  
- **Responsive Design:** Optimized for performance across multiple devices, ensuring accessibility on both mobile and desktop.

## Challenges & Learning Highlights

- **Asynchronous Programming:** Handling asynchronous operations between the client and server effectively.  
- **State Management:** Implementing efficient state management in React to support dynamic user interactions.  
- **API Development:** Designing, securing, and scaling RESTful API endpoints to handle diverse user tasks.

## Future Enhancements

- **Real-Time Collaboration:** Integrate features that allow live course discussions and collaborative work on assignments.  
- **Enhanced Analytics:** Add dashboards and reporting tools to monitor learning progress and course performance.  
- **UI/UX Improvements:** Further refine the user interface and experience based on user feedback.

## Getting Started

If you're interested in exploring or contributing to Kanbas, follow these steps:

1. **Clone the Repositories:**

   - **Front-End:**
     ```bash
     git clone https://github.com/dnydlk/kanbas-react-web-app.git
     ```
   - **Back-End:**
     ```bash
     git clone https://github.com/dnydlk/kanbas-node-server-app.git
     ```

2. **Install Dependencies:**
   - Navigate into each project folder and run:
     ```bash
     npm install
     ```

3. **Configure Environment Variables:**
   - Set up React app api base URL in the `.env` file of the front-end project:
     ```bash
     REACT_APP_API_URL=http://localhost:4000
     ```
   - Ensure the back-end server is configured to run on port 4000 (or adjust the front-end URL accordingly).
   - Ensure MongoDB is running locally or adjust the connection string to point to your MongoDB instance.

4. **Run the Application:**
   - Start both the server and client (concurrently or separately as per your setup):
     ```bash
     npm start
     ```