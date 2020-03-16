import React, { useState } from 'react';

import Header from './components/Header';
import ToDo from './components/Todo';
import Auth from './components/Auth';
import AuthContext from './auth-context';

const App = (props) => {
  const [page, setPage] = useState('Auth');
  const [authStatus, setAuthStatus] = useState(false);

  const loginHandler = () => {
    setAuthStatus(true);
  };

  const changePageHandler = (pageName) => {
    setPage(pageName);
  };

  return (
    <AuthContext.Provider value={{ authStatus: authStatus, login: loginHandler }} >
      <Header todoPageChange={changePageHandler.bind(this, 'Todo')}
        authPageChange={changePageHandler.bind(this, 'Auth')} />
      <hr />
      {page === 'Auth' ? <Auth /> : <ToDo />}
    </AuthContext.Provider >
  );
};

export default App;