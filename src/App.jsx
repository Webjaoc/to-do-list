import React, { useState, useEffect } from 'react';

function ToDoList() {
  const [taskText, setTaskText] = useState(''); // Texto de la nueva tarea
  const [tasks, setTasks] = useState([]); // Lista de tareas
  const [message, setMessage] = useState(''); // Mensaje de error

  // Función para cargar las tareas guardadas en localStorage al iniciar el componente
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks'); // Obtener tareas de localStorage
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks)); // Si hay tareas guardadas, actualizar el estado
    }
  }, []);

  // Función para guardar las tareas en localStorage cada vez que las tareas cambian
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks)); // Guardar las tareas en localStorage
    } else {
      localStorage.removeItem('tasks'); // Eliminar del localStorage si no hay tareas
    }
  }, [tasks]);

  const addTask = () => {
    if (taskText.trim() === '') {
      setMessage('The task cannot be empty.');
      return;
    }

    setTasks([...tasks, { text: taskText, done: false }]); // Añadir tarea
    setTaskText(''); // Limpiar input
    setMessage(''); // Limpiar mensaje de error
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks); // Eliminar tarea
  };

  const toggleDone = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks); // Marcar como "done" o desmarcar
  };

  const resetList = () => {
    setTasks([]); // Reiniciar la lista de tareas
  };

  return (
    <div>
      <header>
        <h1>To do list</h1>
      </header>

      <div className="table-content">
        <input
          type="text"
          id="taskInput"
          placeholder="Insert task"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <button type="button" id="add" onClick={addTask}>
          Add task
        </button>
        <br />
        <span id="message">{message}</span>

        <table id="taskTable">
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index} className={task.done ? 'done' : ''}>
                <td>{index + 1}</td>
                <td style={{ width: '60%' }}>{task.text}</td>
                <td>
                  <button
                    style={{ width: '60px' }}
                    onClick={() => deleteTask(index)}
                  >
                    Delete
                  </button>
                  <button
                    style={{ width: '60px' }}
                    onClick={() => toggleDone(index)}
                  >
                    Done
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>

      {/* Mostrar el botón de Reset solo si hay tareas */}
      {tasks.length > 3  && (
        <div id="btn-resetList">
          <button type="button" id="reset" onClick={resetList}>
            Reset list
          </button>
        </div>
      )}
    </div>
  );
}

export default ToDoList;



