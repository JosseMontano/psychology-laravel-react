import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { UserContext } from "./context/userContext";
import Cookies from 'universal-cookie';
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";

function App() {
  const cookies = new Cookies();
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({user, setUser}), [user, setUser]);

  /*useEffect(() => {
    console.log(cookies.get('jwt'));
  }, [])*/

  return (
      <BrowserRouter>
        <UserContext.Provider value={value}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
  );
}

export default App;
