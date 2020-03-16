import React, { useState, useEffect, useReducer, useRef, useMemo } from 'react';
import Axios from 'axios';

import List from '../List';
import { useFormInput } from '../../hooks/form';

const ToDo = (props) => {
  // const [todoName, setTodoName] = useState('');
  // const [todoList, setTodoList] = useState([]);

  // const [validate, setValidate] = useState(false);

  // const todoInputRef = useRef();

  const todoInput = useFormInput();

  const todoListReducer = (state, action) => {
    switch (action.type) {
      case 'ADD':
        return state.concat(action.payload);
      case 'SET':
        return action.payload;
      case 'REMOVE':
        return state.filter(todo => todo.id !== action.payload);
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(todoListReducer, []);

  useEffect(() => {
    Axios.get('https://tokyo-coders-demo.firebaseio.com/todos.json')
      .then(res => {
        console.log(res);
        const data = res.data;
        const todos = [];
        for (let key in data) {
          todos.push({ id: key, name: data[key].name });
        }
        dispatch({ type: 'SET', payload: todos });
      })
      .catch(err => console.log(err));

    return () => {
      console.log('Clean up');
    };
  }, []);

  // const handleChange = (event) => {
  //   setTodoName(event.target.value);
  // };

  // const mouseHandler = (event) => {
  //   console.log(event.clientX, event.clientY);
  // };

  // useEffect(() => {
  //   document.addEventListener('mousemove', mouseHandler);
  //   return () => {
  //     document.removeEventListener('mousemove', mouseHandler);
  //   };
  // }, []);

  // const validateHandler = (event) => {
  //   if (todoInputRef.current.value.trim() === '') {
  //     return setValidate(false);
  //   }
  //   setValidate(true);
  // };

  const todoAddHandler = () => {
    // const todoName = todoInputRef.current.value;
    const todoName = todoInput.value;
    Axios.post('https://tokyo-coders-demo.firebaseio.com/todos.json', { name: todoName })
      .then(result => {
        console.log(result);
        const data = result.data;
        dispatch({ type: 'ADD', payload: { id: data.name, name: todoName } });
      })
      .catch(err => console.log(err));
  };

  const removeHandler = (id) => {
    Axios.delete(`https://tokyo-coders-demo.firebaseio.com/todos/${id}.json`)
      .then(result => {
        console.log(result);
        dispatch({ type: 'REMOVE', payload: id });
      });
  };

  return (
    <div>
      {/* <input type="text" ref={todoInputRef} onChange={validateHandler} style={{ backgroundColor: validate ? 'transparent' : 'red' }} placeholder="Todo"></input> */}
      <input type="text" onChange={todoInput.inputChange} value={todoInput.value} style={{backgroundColor: todoInput.validity ? 'transparent' : 'red'}} placeholder="Todo" />
      <button onClick={todoAddHandler}>Add</button>

      {useMemo(() => <List todoList={state} removeHandler={removeHandler} />, [state])}
    </div>
  );
};

export default ToDo;