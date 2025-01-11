# Resume Generator

This is a Resume Generator web application that allows users to generate customizable resumes. The application consists of a frontend and a backend, and you need to configure both to get it up and running locally.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Frontend Configuration](#frontend-configuration)
  - [Backend Configuration](#backend-configuration)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)

---

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) (comes bundled with Node.js)
- [Git](https://git-scm.com/)

### API Key

This project requires an external API to generate the resume. You will need to obtain an API key from Google AI Studio.
To get your API key from Google AI Studio:

- Go to Google AI Studio API Key Page https://aistudio.google.com/app/apikeyand sign in with your Google account.
- Create or select a project.
- Click Create Credentials > API Key.
- Copy the generated API key.

---

## Installation

Follow these steps to get the project up and running locally.

### 1. Clone the Repository

Start by cloning the repository to your local machine. Open your terminal and run the following command:

```bash
git clone https://github.com/Tornshortsresumegenerator
```

## Backend Configuration

After setting up the frontend, you need to configure the backend.

### 1. Navigate to the Backend Directory

Go to the `backend` folder where the backend code is located:

```bash
cd backend

npm install
```

### 2. Create an `.env` File

Create a file named `.env` in the `backend` directory and add the required environment variables:

```
API_KEY=your_api_key_here
```

Paste the API KEY from google above

Ensure that the `.env` file is listed in the `.gitignore` file to prevent it from being committed to version control.

# Frontend Configuration

After cloning the repository, navigate to the frontend directory and install the required dependencies:

```bash
cd ResumeGenerator

npm install
```

This will install all the necessary packages listed in the `package.json` file.

## Running the Application

Start the backend server first (Terminal 1):

```bash
cd backend
node server.js
```

Start the frontend server in a new terminal (Terminal 2):

```bash
cd ResumeGenerator
npm run dev
```
