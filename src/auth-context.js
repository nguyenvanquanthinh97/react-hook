import React from 'react';

const AuthContext = React.createContext({ authStatus: false, login: {} });

export default AuthContext;