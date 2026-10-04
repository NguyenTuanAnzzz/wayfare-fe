import React from 'react';
import { IconContext } from '@phosphor-icons/react';
import AppRoute from './routes/AppRoute';

function App() {
  return (
    <IconContext.Provider value={{ weight: "bold", size: 20 }}>
      <AppRoute />
    </IconContext.Provider>
  );
}

export default App;
