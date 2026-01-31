import { useState } from 'react';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import { login as  apilogin, fetchRecipes, logout} from "./apiclient.js";

export default function App() {
  const [Auth, setAuth] = useState(() => {
    const saved = localStorage.getItem("jwt_auth");
    return saved ? JSON.parse(saved) : null;
  });

  const handleLoggedIn = async ({username, password}) => {
    const session = await apilogin({username, password});
    setAuth(session);
    localStorage.setItem("jwt_auth", JSON.stringify(session));
    return session;
  };
  
  const handleLoggedOut = async (currentAuth) => {
    await logout(currentAuth);
    setAuth(null);
    localStorage.removeItem("jwt_auth");
  };

  const handleFetchRecipes = async (currentAuth) => {
    return fetchRecipes(currentAuth);
  };

  return (
    <div className="panel">
      {!Auth ? (
        <Login onLoggedIn={handleLoggedIn} />
      ) : (
        <Dashboard
          auth={Auth}
          onLoggedOut={handleLoggedOut}
          onFetchRecipes={handleFetchRecipes}
        />
      )}
    </div>
  );
}
