import React, { useContext } from 'react';

import AuthContext from '../../auth-context';

const Header = (props) => {
  const auth = useContext(AuthContext);
  return (
    <header>
      {auth.authStatus && <button onClick={props.todoPageChange}>TodoList</button>}
      {/* <button onClick={props.authPageChange}>Auth</button> */}
    </header>
  );
};

export default Header;