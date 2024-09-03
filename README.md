# ToDo App

## [Hosted_Link](https://fullstack-todoapp-omega.vercel.app/)

## Description

    - A full-stack ToDo App that allows to register, login, logout user and create, get, update, and delete taska. The app is built using the MERN Stack and features user authentication, task management and responsive design with TailwindCSS.

## Features

    - User Authentication: Register, Login, and Logout functionality.
    - Task Management: Create, update, and delete tasks.
    - Responsive Design: Some Responsiveness
    - Error Handling: Basic error handling with toast message is added.

## Technologies Used

    - Frontend: ReactJs, Tailwind CSS, axios
    - Backend: NodeJs, ExpressJs
    - Database: MongoDb
    - Authentication: JWT
    - State Management: Redux
    - Others: bcrypt, cookie-parser, react-toastify

## API Endpoints

### User

    - Register: POST /api/moretask/user/register
    - Login: POST /api/moretask/user/login
    - Logout: GET /api/moretask/user/logout

### ToDo

    - Create Task: POST /api/moretask/todo/task
    - Get Tasks: GET /api/moretask/todo/tasks
    - Update Task: PUT /api/moretask/todo/:taskId
    - Delete Task: DELETE /api/moretask/todo/:taskId
