## Overview

This is a React-based frontend application for a microservice backend forum website. It fetches data from a set of APIs and displays a timeline of posts. Each post shows the user's name, post title, and post body. The user can also expand a post to see its relevant comments. The posts are sorted in descending order of post ID.

## Features

- Fetch and display posts with user information.
- Expand and collapse posts to show/hide comments.
- Pagination for posts.
- Like and dislike comments with color change indicators.

## Technologies Used

- **Next.js:**
- **Redux Toolkit**
- **React-Redux**
- **Axios**
- **Tailwind CSS**
- **React Icons**

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Taufiqul7756/blog-app
   cd blog-app

   ```

2. **Install dependencies::**

   ```bash
   npm install

   ```

3. **Run the development server::**
   ```bash
   npm run dev
   ```

### Project Structure

    ```bash
    blog-app
    ├── public
    │ └── index.html
    ├── app
    │ ├── components
    │ │ └── Navbar.jsx
    │ │ └── Footer.jsx
    │ │ └── Timeline.jsx
    │ ├── redux
    │ │ ├── commentsSlice.jsx
    │ │ ├── postSlice.jsx
    │ │ └── store.jsx
    │ ├── utils
    │ │ └── service.jsx
    │ │ └── pagination.jsx
    │ ├── global.css
    │ ├── page.js
    │ ├── layout.js
    ├── package.json
    ├── README.md
    └── .gitignore
    └── tailwind.config.js
    └── package.json
    └── package-lock.json

## API Endpoints

- **Fetch post data: https://jsonplaceholder.typicode.com/posts**
- **Fetch user data: https://jsonplaceholder.typicode.com/users**
- **Fetch post comments: https://jsonplaceholder.typicode.com/comments**

## Usage

The app fetches posts and users data upon loading.

Posts are displayed in a timeline format with the user's name, post title, and post body.

Click on "Show Comments" to toggle the visibility of the comments for each post.

Use pagination controls to navigate through posts.

Click on the like or dislike icons to toggle the color indicating the user's reaction.
