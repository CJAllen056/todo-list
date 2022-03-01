import { useEffect, useRef, useState } from 'react';

import './App.css';

function App() {
  const [todos, setTodos] = useState([])
  const todoText = useRef();
  const todoDate = useRef();

  function addTodo(e) {
    e.preventDefault();
      const newTodo = {
        content: todoText.current.value,
        dueDate: todoDate.current.value,
        editing: false,
        completed: false,
      }
      const updated = [...todos, newTodo];
      setTodos(updated);
      todoText.current.value = "";
  }

  function completeTodo(i, e) {
    let updated = [...todos];
    updated[i].completed = true;
    setTodos(updated);
    e.target.disabled = true;

    if (updated.filter(todo => todo.completed && todo.dueDate === updated[i].dueDate).length === 3) {
      alert(`Congratulations! You have completed 3 tasks for ${updated[i].dueDate}!`);
    }
  }

  function editTodo(i) {
    let updated = [...todos];
    updated[i].editing = true;
    setTodos(updated);
  }

  function updateTodo(i, e) {
    let updated = [...todos];
    updated[i].content = e.target.previousElementSibling.previousElementSibling.firstChild.value;
    updated[i].editing = false;
    setTodos(updated);
  }

  function deleteTodo(i) {
    const updated = [...todos.slice(0, i), ...todos.slice(i + 1)];
    setTodos(updated);
  }

  return (
    <div>
      <form onSubmit={addTodo}>
        <div className="form-inputs">
          <label>
            Add New Todo
            <input type="text" placeholder="Add Todo" required ref={todoText} />
          </label>
          <label>
            Due Date
            <input type="date" required ref={todoDate} />
          </label>
        </div>
        <input type="submit" value="Add Todo" />
      </form>
      <ul>
        {todos.map((todo, i) => {
          return (<li key={todo.content + i}>
            <span className="todo-content">
              {todo.editing ?<input className="edit-todo-input" type="text" defaultValue={todo.content} /> : todo.content}
            </span>
            <button onClick={(e) => completeTodo(i, e)}>{todo.completed ?  "\u2714" : "Done"}</button>
            {todo.editing ? <button className="update-button" onClick={(e) => updateTodo(i, e)}>Update</button> : <button onClick={() => editTodo(i)}>Edit</button>}
            <button onClick={() => deleteTodo(i)}>Delete</button>
          </li>)
        })}
      </ul>
    </div>
  );
}

export default App;
