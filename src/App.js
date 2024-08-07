import React, { useState } from 'react'
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './styles/App.css'
import EditTaskModal from './components/UI/EditTaskModal/EditTaskModal';

function App() {
  const [tasks, setTasks] = useState(getStoredTasks);
  const [editingTask, setEditingTask] = useState(null);
  
  function getStoredTasks() {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  }

  function setStorageItem(item){
    localStorage.setItem('tasks', JSON.stringify(item))
  }
   
  const updateTask = ( stored, edited ) => {

      setEditingTask(null)
      return stored.map(task => task.id === edited.id ? edited : task)
    }

    const deleteTask = (storedTasks, taskToDelete) => { 
      return storedTasks.filter(task => task.id !== taskToDelete.id);
    }

    const addNewTask = (storedTasks, newTask) => {
      return [...storedTasks, newTask];
    }
  
  function handleData(task, handleFunc) {
    const storedTasks = getStoredTasks();
    const updatedTasks = handleFunc(storedTasks, task)
    console.log(updatedTasks);
    setTasks(updatedTasks);
    setStorageItem(updatedTasks);
    setEditingTask(null)
  }
  



  return (
    <div className="App">
      <h1>My tasks today</h1>
      <TaskForm addTask={(newTask) => handleData(newTask, addNewTask)}/>

      <hr/>
      {
        tasks.length > 0
        ? 
          <TaskList 
          tasks={tasks} 
          deleteTask={(task) =>  handleData(task, deleteTask)} 
          editTask={setEditingTask}
          updateCheckbox={(task) => handleData(task, updateTask)}
          />
        : <h2>No tasks</h2>
      }
      { editingTask && (
        <EditTaskModal
          closeModal={() => setEditingTask(null)}
          textToChange={editingTask.body}
          save={(text) => handleData({...editingTask, body: text}, updateTask)}
        />
      )

      }
    </div>
  );
}

export default App;
