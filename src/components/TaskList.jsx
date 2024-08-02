import React from 'react';
import TaskItem from './UI/TaskItem/TaskItem';

const TaskList = ({tasks, deleteTask, editTask, updateCheckbox}) => {

    return (
        <ul className='task__list'>
            { tasks.map((task, index) => 
                <TaskItem 
                index={index}
                key={task.id}
                disabledEdit={task.done} 
                updateCheckbox={updateCheckbox} 
                task={task} 
                deleteTask={deleteTask} 
                editTask={() => editTask(task)}/>
            )}
            
        </ul>
    );
}

export default TaskList;
