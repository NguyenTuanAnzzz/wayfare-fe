import React, { useEffect } from 'react';
import { IconContext } from '@phosphor-icons/react';
import AppRoute from './routes/AppRoute';
import AuthProvider from './contexts/AuthContext';
function App() {

  return (
    <AuthProvider>
      <IconContext.Provider value={{ weight: "bold", size: 20 }}>
        <AppRoute />
      </IconContext.Provider>
    </AuthProvider>
  );
}

export default App;
