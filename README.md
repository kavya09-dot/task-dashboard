# Task Management Dashboard

A responsive Kanban-style task management application built with React and TypeScript. The application allows users to organize tasks in three columns (To Do, In Progress, Done) and provides drag-and-drop functionality for easy task management.

## Features

- View tasks in a Kanban-style board with three status columns
- Create new tasks with title, description, and status
- Drag and drop tasks between status columns
- Responsive design that works on both desktop and mobile devices
- REST API integration for task persistence

## Technologies Used

- React
- TypeScript
- React Beautiful DnD for drag-and-drop functionality
- Axios for API calls
- CSS for styling
- json-server for mock API

## Project Structure

```
task-management-dashboard/
├── src/
│   ├── components/
│   │   ├── Board/
│   │   │   ├── Board.tsx
│   │   │   ├── Board.css
│   │   ├── Column/
│   │   │   ├── Column.tsx
│   │   │   ├── Column.css
│   │   ├── Task/
│   │   │   ├── Task.tsx
│   │   │   ├── Task.css
│   │   ├── TaskForm/
│   │   │   ├── TaskForm.tsx
│   │   │   ├── TaskForm.css
│   ├── services/
│   │   ├── api.ts
│   ├── models/
│   │   ├── Task.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.tsx
├── db.json        # For json-server mock backend
├── package.json
├── tsconfig.json
├── README.md
```

## Running the Project Locally

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/task-management-dashboard.git
   cd task-management-dashboard
   ```

2. Install dependencies
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Start the mock backend server
   ```
   npx json-server --watch db.json --port 3001
   ```

4. In a new terminal, start the React application
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Using the Application

- **View Tasks**: Tasks are automatically loaded and displayed in their respective columns based on status
- **Add Task**: Click the "Add New Task" button to open the task form, fill in the details, and submit
- **Move Tasks**: Drag a task from one column and drop it in another to change its status
- **Task Details**: Each task displays its title and description

## API Endpoints

The application uses the following API endpoints:

- `GET /tasks` - Retrieve all tasks
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update an existing task
- `DELETE /tasks/:id` - Delete a task

## Browser Support

The application has been tested and works on:
- Chrome (latest)
- Firefox (latest)
- Edge (latest)
- Safari (latest)