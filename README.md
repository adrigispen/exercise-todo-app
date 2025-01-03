# Todo Application

## Project Overview
Basic todo app using TypeScript, React, and Node.js. While the original requirements specified C# and MAUI, this implementation uses JavaScript ecosystem technologies.

## Architectural Decisions

### Backend Architecture
- **TypeScript + Express**: Chosen for type safety and industry-standard REST API development
- **Clean Architecture**: Separated business logic (TodoService) from API layer for better maintainability
- **In-Memory Storage**: Implemented using JavaScript Map for efficient CRUD operations
- **SOLID Principles**: Service layer is isolated and follows single responsibility principle
- **RESTful Design**: Follows REST conventions for predictable API behavior

### Type Safety
- Strong typing throughout the application using TypeScript
- Interface-based design for Todo entities
- Clear type boundaries between API and service layer

### API Features
- Full CRUD operations for Todo items
- Filter capability for completed/uncompleted todos
- Error handling and appropriate HTTP status codes
- CORS enabled for frontend integration

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone the repository
```bash
git clone [your-repo-url]
cd [your-project-name]
```

2. Install dependencies
```bash
cd backend
npm install
```

3. Start the development server
```bash
npm run dev
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/todos?showCompleted=true/false | Get all todos or only in-progress tasks |
| GET | /api/todos/:id | Get todo by ID |
| POST | /api/todos | Create new todo |
| PUT | /api/todos/:id | Update todo |
| DELETE | /api/todos/:id | Delete todo |

### Request/Response Examples

#### Create Todo
```json
POST /api/todos
{
    "title": "Complete project",
    "description": "Finish the todo app",
    "completed": false
}
```

#### Response
```json
{
    "id": "abc123",
    "title": "Complete project",
    "description": "Finish the todo app",
    "completed": false,
    "createdAt": "2024-01-03T10:00:00Z",
    "updatedAt": "2024-01-03T10:00:00Z"
}
```

## Testing
Basic api tests with Jest
