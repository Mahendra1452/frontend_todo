import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header.jsx"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import { Toaster } from "react-hot-toast";
import { useEffect, useContext} from "react";
import axios from "axios";
import { Context, server } from "./main.jsx";

function App() {

  const { setUsers, setIsAuthenticated,setLoading} = useContext(Context);

  useEffect(()=>{
    
    setLoading(true);

    axios.get(`${server}/users/me`,
      {withCredentials:true,})
      .then(res=>{
        setUsers(res.data.user);
        setIsAuthenticated(true)
        setLoading(false);
      })
      .catch((error)=>{
        error.response.data.message
        setUsers({});
        setIsAuthenticated(false);
        setLoading(false);
      })
  },[])

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
      <Toaster/>
    </Router>
  );
}

export default App;