import React, { useState } from 'react';
import Axios from 'axios';

const ToDo = (props) => {
  const [todoName, setTodoName] = useState('');
  const [todoList, setTodoList] = useState([]);

  const handleChange = (event) => {
    setTodoName(event.target.value);
  };

  const todoAddHandler = () => {
    setTodoList(todoList.concat(todoName));
    Axios.post('https://tokyo-coders-demo.firebaseio.com/todos.json', { name: todoName })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  };

  return (
    <React.Fragment>
      <input type="text" onChange={handleChange} value={todoName} placeholder="Todo"></input>
      <button onClick={todoAddHandler}>Add</button>
      <ul>
        {todoList.map((todo, index) => <li key={todo + '&' + index}>{todo}</li>)}
      </ul>
    </React.Fragment>
  );
};

export default ToDo;