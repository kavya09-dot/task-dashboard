import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Task as TaskModel } from '../../models/Task';
import Task from '../Task/Task';
import './Column.css';

type ColumnProps = {
  id: string;
  title: string;
  tasks: TaskModel[];
};

const Column: React.FC<ColumnProps> = ({ id, title, tasks }) => {
  return (
    <div className="column">
      <h2>{title}</h2>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div 
            className={`task-list ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
