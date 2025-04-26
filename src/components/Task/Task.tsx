import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Task as TaskModel } from '../../models/Task';
import './Task.css';

type TaskProps = {
  task: TaskModel;
  index: number;
};

const Task: React.FC<TaskProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`task ${snapshot.isDragging ? 'dragging' : ''}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h3>{task.title}</h3>
          {task.description && <p>{task.description}</p>}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
