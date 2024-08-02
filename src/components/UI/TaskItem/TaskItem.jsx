import React from 'react';
import MyButton from '../MyButton/MyButton';
import cl from './TaskItem.module.css';

const TaskItem = ({task, index, updateCheckbox, deleteTask, editTask, disabledEdit }) => {
    
    return (
        <li key={task.id} className={task.done ? cl.done : ''}>
            <div className={cl.item__body}>
                <p className={cl.item__content}>{index + 1}. {task.body}</p>
                <div className={cl.button__wrapper}>
                    <label><input 
                        checked={task.done} 
                        type="checkbox" 
                        name="taskcheck" 
                        onChange={() => updateCheckbox({...task, done: !task.done})} 
                        /> Done</label>
                    <MyButton disabled={disabledEdit} onClick={() => editTask(task)}>Edit</MyButton>
                    <MyButton onClick={() => deleteTask(task)}>Delete</MyButton>
                </div>
            </div>
        </li>
    );
}

export default TaskItem;
