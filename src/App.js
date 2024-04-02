import { useEffect, useState } from "react";


import "./App.css";
import Home from "./pages/Home.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import Cookies from "js-cookie";
import { Store } from "./redux/store.js";
import { currentUser } from "./redux/actions/user.js";
import { useSelector } from "react-redux";


function App() {
  useEffect(() => {
    const cookieValue = Cookies.get("access_token");
    console.log(Cookies.get());
    console.log(cookieValue);
    if (cookieValue) Store.dispatch(currentUser());
  }, []);

  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index Component={Home} />

        <Route path="/signup" Component={isAuthenticated ? Home : SignUp} />
        <Route path="/login" Component={isAuthenticated ? Home : Login} />
        <Route path="/Profile" Component={Profile} />
        <Route path="/chat" Component={isAuthenticated && ChatPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
