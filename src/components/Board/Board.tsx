import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Task, TaskStatus } from '../../models/Task';
import Column from '../Column/Column';
import TaskForm from '../TaskForm/TaskForm';
import * as api from '../../services/api';
import './Board.css';

const Board: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const fetchedTasks = await api.fetchTasks();
      setTasks(fetchedTasks);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks. Please try again later.');
      console.error('Error fetching tasks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    // Dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Find the task that was dragged
    const taskId = draggableId;
    const newStatus = destination.droppableId as TaskStatus;

    console.log(`Moving task ${taskId} to ${newStatus}`);

    // First update locally for immediate feedback
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, status: newStatus } 
          : task
      )
    );

    // Then update in the backend
    try {
      await api.updateTaskStatus(taskId, newStatus);
    } catch (err) {
      console.error('Error updating task status:', err);
      // Revert changes if the API call fails
      fetchTasks();
    }
  };

  const handleAddTask = async (newTask: Omit<Task, 'id'>) => {
    try {
      const createdTask = await api.createTask(newTask);
      setTasks(prevTasks => [...prevTasks, createdTask]);
    } catch (err) {
      console.error('Error creating task:', err);
      setError('Failed to create task. Please try again.');
    }
  };

  const getTasksByStatus = (status: TaskStatus): Task[] => {
    return tasks.filter(task => task.status === status);
  };

  if (isLoading) {
    return <div className="loading">Loading tasks...</div>;
  }

  return (
    <div className="board-container">
      <div className="board-header">
        <h1>Task Management Dashboard</h1>
        <button className="add-task-btn" onClick={() => setShowTaskForm(true)}>
          Add New Task
        </button>
      </div>
      
      {error && <div className="error-banner">{error}</div>}
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="board">
          <Column
            id="To Do"
            title="To Do"
            tasks={getTasksByStatus('To Do')}
          />
          <Column
            id="In Progress"
            title="In Progress"
            tasks={getTasksByStatus('In Progress')}
          />
          <Column
            id="Done"
            title="Done"
            tasks={getTasksByStatus('Done')}
          />
        </div>
      </DragDropContext>
      
      {showTaskForm && (
        <TaskForm 
          onSubmit={handleAddTask} 
          onClose={() => setShowTaskForm(false)} 
        />
      )}
    </div>
  );
};

export default Board;
