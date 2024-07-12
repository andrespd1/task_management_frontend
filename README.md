# Task Management Frontend

This repository contains the frontend application for the Task Management system. It is built using Next.js and is integrated with the Task Management microservices.

## Demo:

[![Task management demo](https://img.youtube.com/vi/ufrQfEe2VcE/0.jpg)](https://youtu.be/ufrQfEe2VcE)

## Features

- **Login**: Allows users to log in using their credentials.
- **Register**: Allows new users to register for an account.
- **Tasks**: Displays a list of tasks for the authenticated user.
- **Tasks**: Creates a new task if the user is authenticated.

## Constraints

- User can't access to login or register page if is already logged in.
- User can't access to tasks dashboard if it is not authenticated

## Requirements

- Node.js 14+
- npm or yarn

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/andrespd1/task_management_frontend.git
   cd task-management-frontend
   ```

2. Install dependencies:

   Using npm:

   ```bash
   npm install
   ```

   Using yarn:

   ```bash
   yarn install
   ```

## Running the App

### Development Mode

To run the application in development mode:

```bash
npm run dev
```

or

```bash
yarn dev
```

The app will be available at `http://localhost:3000`.

### Production Mode

To build and run the application in production mode:

```bash
npm run build
npm start
```

or

```bash
yarn build
yarn start
```

## Routing

### Login Page

- **Path**: `/pages/login`
- **Component**: `LoginPage`
- **Description**: Allows users to log in by providing their email and password.

### Register Page

- **Path**: `/pages/register`
- **Component**: `RegisterPage`
- **Description**: Allows new users to register by providing their name, email, and password.

### Tasks Page

- **Path**: `/pages/tasks`
- **Component**: `TasksPage`
- **Description**: Displays a list of tasks for the authenticated user. Requires the user to be logged in.
