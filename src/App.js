import React, { useState } from 'react'
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './styles/App.css'
import EditTaskModal from './components/UI/EditTaskModal/EditTaskModal';

function App() {
  const [tasks, setTasks] = useState(getStoredTasks);
  const [editingTask, setEditingTask] = useState(null);
  
  function getStoredTasks() {
    return JSON.parse(localStorage.getItem('tasks'))
  }

  function setStorageItem(item){
    localStorage.setItem('tasks', JSON.stringify(item))
  }
   
  // const addNewTask = (newTask) => {
  //   const storedTasks = getStoredTasks();
  //   const updatedTasks = [...storedTasks, newTask];
  //   setStorageItem(updatedTasks);
  //   setTasks(updatedTasks);
  //   console.log(updatedTasks);
  // }

  // const deleteTask = (taskToDelete) => { 
  //   const storedTasks = getStoredTasks();
  //   const updatedTasks = storedTasks.filter(task => task.id !== taskToDelete.id);
  //   setTasks(updatedTasks);
  //   setStorageItem(updatedTasks);

  // }

  // const updateTask = (editedTask) => {
  //   const storedTasks = getStoredTasks();
  //   const updatedTasks = storedTasks.map(task => task.id === editedTask.id ? editedTask : task)
  //   setTasks(updatedTasks);
  //   setStorageItem(updatedTasks);
  //   setEditingTask(null)
  // }
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
      {/* <TaskForm addTask={addNewTask}/> */}
      <TaskForm addTask={(newTask) => handleData(newTask, addNewTask)}/>

      <hr/>
      {
        tasks.length 
        ? 
          // <TaskList tasks={tasks} deleteTask={deleteTask} editTask={setEditingTask}/>
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
          // save={(text) => updateTask({...editingTask, body: text})}
          save={(text) => handleData({...editingTask, body: text}, updateTask)}
        />
      )

      }
    </div>
  );
}

export default App;
