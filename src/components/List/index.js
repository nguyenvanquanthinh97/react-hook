import React from 'react';

const List = ({ todoList, removeHandler }) => {
  console.log('Rendering List...');
  return (
    <ul>
      {todoList.map(todo => <li key={todo.id} onClick={removeHandler.bind(this, todo.id)}>{todo.name}</li>)}
    </ul>
  );
};

export default List;