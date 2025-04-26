import axios from 'axios';
import { Task, TaskStatus } from '../models/Task';

const API_URL = 'http://localhost:3001/tasks';

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await axios.get<Task[]>(API_URL);
  return response.data;
};

export const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const newTask = {
    ...task,
    id: Date.now().toString(), // Simple ID generation for demo purposes
  };
  
  const response = await axios.post<Task>(API_URL, newTask);
  return response.data;
};

export const updateTask = async (task: Task): Promise<Task> => {
  const response = await axios.put<Task>(`${API_URL}/${task.id}`, task);
  return response.data;
};

export const updateTaskStatus = async (id: string, status: TaskStatus): Promise<Task> => {
  try {
    // First get the current task
    const taskResponse = await axios.get<Task>(`${API_URL}/${id}`);
    const currentTask = taskResponse.data;
    
    // Update only the status
    const updatedTask = { ...currentTask, status };
    
    // Send the updated task back to the server
    const response = await axios.put<Task>(`${API_URL}/${id}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error("Error updating task status:", error);
    throw error;
  }
};

export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
