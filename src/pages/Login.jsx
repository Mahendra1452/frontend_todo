//import React from 'react'
import { useState } from "react";
import { Link, Navigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useContext } from "react";
import { Context ,server} from "../main"
import axios from "axios";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isAuthenticated, setIsAuthenticated, setLoading} = useContext(Context);

  if(isAuthenticated) return <Navigate to={"/"}/>

  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();

   try {
    const { data } = await axios.post(
        `${server}/users/login`,
        {
        email,password,
        },
        {
        headers:{
            "Content-Type":"application/json",
        },
        withCredentials: true,
        });
    toast.success(data.message);
    setIsAuthenticated(true);
    setLoading(false)
   } catch (error) {
        toast.error("some error");
        console.log(error);
        setIsAuthenticated(false);
        setLoading(false)
   }
}
  return (
    <div className="login">
        <section>
            <form onSubmit={submitHandler}>
            <input 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)} 
                    type="email" 
                    placeholder="Email" 
                    required/>
                <input 
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)} 
                    type="password" 
                    placeholder="Password" 
                    required/>
                <button disabled={setLoading} type="submit">Login</button>
                <h4>Or</h4>
                <Link to="/register">Sign Up</Link>
            </form>
        </section>
    </div>
  )
}

export default Login