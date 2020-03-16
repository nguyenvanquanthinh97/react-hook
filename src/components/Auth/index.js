import React, { useContext } from 'react';

import AuthContext from '../../auth-context';

const Auth = props => {
  const auth = useContext(AuthContext);
  return (
    <div>
      <button onClick={auth.login}>Login</button>
    </div>
  );
};

export default Auth;