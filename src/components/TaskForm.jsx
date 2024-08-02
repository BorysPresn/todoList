import React, { useState } from 'react';
import MyButton from './UI/MyButton/MyButton';

const TaskForm = ({addTask}) => {
    const [todo, setTodo] = useState('')
    const addNewTask = (e) => {
        e.preventDefault();
        if(todo.trim()) {
            const newTask = {
                done: false,
                id: Date.now(),
                body: todo
            }
            addTask(newTask)
            setTodo(''); 
        }        
    }
    return (
        <form className='task-form'>
            <input
            name='taskInput' 
                type="text"
                value={todo}
                placeholder='Input task'
                onChange={e => setTodo(e.target.value)}
            />
            <MyButton onClick={addNewTask}>Add</MyButton>
        </form>
    );
}

export default TaskForm;
