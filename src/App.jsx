import { IconContext } from '@phosphor-icons/react';
import AppRoute from './routes/AppRoute';
import useRefresh from './hooks/useRefresh';
import { useAuth } from './contexts/AuthContext';
import { useEffect } from 'react';
function App() {

  const refresh = useRefresh();

  useEffect(() => {
    refresh();
  }, []);
  return (

    <IconContext.Provider value={{ weight: "bold", size: 20 }}>
      <AppRoute />
    </IconContext.Provider>

  );
}

export default App;
