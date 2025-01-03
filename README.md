# Todo App

Basic full-stack todo app using TypeScript, React, and Node.js. While the original requirements specified C# and MAUI, this implementation uses technologies I'm more familiar with.

## Stack

### Backend

- TypeScript
- Express
- TypeBox for runtime validation
- Jest for testing

### Frontend

- React with TypeScript
- Styled Components for styling
- RTK Query for API state management
- Redux Toolkit for state management

## Features

- Create todos with title and description (first 50 chars become title)
- Toggle todo completion status
- Delete todos
- Filter to show/hide completed todos
- Type-safe API with runtime validation
- Clean and responsive UI

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository:

```bash
git clone [your-repository-url]
cd exercise-todo-app
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

### Running the Application

1. Start the backend server:

```bash
cd backend
npm run dev
```

2. In a new terminal tab, start the frontend

```bash
cd frontend
npm run dev
```

This will run the backend at http://localhost:3000, and you can access the application at http://localhost:5173

### Testing

```bash
cd backend
npm test
```

## Didn't implement

### Testing

- Frontend unit tests for components
- Frontend integration tests for API interactions
- E2E tests with Cypress or Playwright

### Features

If I'd had more time, I'd have added a few additional features:

- Ability to edit todo title and description
- Improved form for createing todos with separate inputs for title and description
- Due dates for todos
- Priority levels
- Categories/tags

### Technical Improvements

There are also a number of technical improvements I could make, including (but not limited to):

- Error boundary implementation
- Loading states/skeleton screens
- Proper error handling and user feedback
- API response caching
- Pagination for large lists
