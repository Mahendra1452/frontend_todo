/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useContext } from "react";
import { useState } from "react"
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import TodoItem from "../components/TodoItem";
import { server, Context } from "../main";

const Home = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh,setRefresh] = useState(false);
  const {isAuthenticated} = useContext(Context);

  const updateHandler = async (id) =>{
    try {
      const {data} = await axios.put(`${server}/tasks/${id}`,{},
      {
        withCredentials: true,
      }
      )

      toast.success(data.message)
      setRefresh(prev=>!prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }    
  }
  const deleteHandler = async (id) =>{
    try {
      const {data} = await axios.delete(`${server}/tasks/${id}`,
      {
        withCredentials: true,
      }
      )
      
      toast.success(data.message)
      setRefresh(prev=>!prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const {data} = await axios.post(`${server}/tasks/new`,{
        title,description,
      },{
        headers:{
          "Content-Type": "application/json"
        },
        withCredentials: true,
      })
      setTitle("")
      setDescription("")
      toast.success(data.message)
      setLoading(false);
      setRefresh(prev=>!prev);
    } catch (error) {
      toast.success(error.response.data.message)
      setLoading(false);
    }
  }

  useEffect(()=>{
    axios.get(`${server}/tasks/my`,{
      withCredentials:true,
    }).then((res)=>{
      setTasks(res.data.tasks);
    }).catch(e=>{
      toast.error(e.response.data.message)
    })
  },[refresh])

  if(!isAuthenticated) return <Navigate to={"/login"}/>

  return (
    <div className="container">
       <div className="login">
        <section>
            <form onSubmit={submitHandler}>
                <input 
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)} 
                    type="text" 
                    placeholder="Title" 
                    required/>
                <input 
                    value={description} 
                    onChange={(e)=>setDescription(e.target.value)} 
                    type="text" 
                    placeholder="Description" 
                    required/>
              
                <button disabled={loading} type="submit">ADD TASK</button>
                
            </form>
        </section>
       </div>

      <section className="todosContainer">
         {
          tasks.map((i)=>(
          <div key={i._id}>
            {<TodoItem 
              title={i.title} 
              desc={i.description}
              isCompleted={i.isCompleted}
              updateHandler={updateHandler}
              deleteHandler={deleteHandler}
              id={i._id}
              key={i._id}
              />}  
          </div>
          ))}
      </section>
    </div>
  )
}

export default Home