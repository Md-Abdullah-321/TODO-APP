import React, { useEffect, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const initialStates = {
    title: '',
    priority: '',
    status: '',
    tag: '',
    description: ''
}
function Home() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState(initialStates);
    const [display, setDisplay] = useState(false);
    
    const {title, priority, status, tag, description} = input;
    
    const handleClick = () => {
        setDisplay(true);
    }
    
    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        // POST data 
        const res = await fetch('http://localhost:5000/todo', {
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },
            credentials: "include", 
            body:JSON.stringify({
                task: {
                    title,priority, status, tag, description
                },
                dueDate: new Date(),
            })
        });
        const data = await res.json();

        if(data.error){
            window.alert(data.error);
        }else{
            window.alert("Todo Created Succesfully");
        }
        setDisplay(false);
        setInput(initialStates);
    }


    
    
    const navigate = useNavigate();
    // Function to set the token in the cookies
const setAuthTokenInCookies = (token) => {
    document.cookie = `token=${token}; path=/;`;
  };
  
  // Function to get the token from the cookies
  const getAuthTokenFromCookies = () => {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));
    if (tokenCookie) {
      return tokenCookie.split("=")[1];
    }
    return null;
  };
  
  const getTodos = async () => {
    try {
      // Get the token from the cookies
      const token = getAuthTokenFromCookies();
  
      const res = await fetch("http://localhost:5000/todos", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include", // This will automatically send the cookies with the request
      });
  
      const data = await res.json();
    //   console.log(data);
      setTodos(data);
      if (data.error) {
        // console.log(data);
        throw new Error(res.error);
      }
    } catch (err) {
      navigate("/login");
    }
  };
  
    const handleDelete = (id, index) => {
        fetch(`http://localhost:5000/todo/${id}`, {
        method: 'DELETE',
        credentials: "include", 
        })

        delete todos[index]
    }
    useEffect(() => {
        getTodos();
    }, [input,  todos]);
    return (
        <div className='bg-Background-Color h-screen font-mono flex justify-center items-center'>
            <div className='w-full mx-auto'>
            {display &&  <div className='w-11/12 md:w-3/6 bg-Secondary-Color rounded-md mx-auto p-4 mb-5 border border-Primary-Color'>
                {/* Todo Form Here:  */}
                <input type="text" placeholder='Enter Todo title' className='w-full p-1 rounded-md outline-none text-Text-Color' 
                required={true}
                name='title'
                value={title}
                onChange={handleChange}/>

                {/* task priority  */}
                <div className='w-full mt-2'>
                <label className='w-4/6 text-Text-Color' htmlFor="priority">Choose Priority :</label>
                <select name="priority" className='w-full p-1 rounded-md
                text-Text-Color outline-none'
                value={priority}
                onChange={handleChange}>
                    <option>Select Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                </div>

                {/* task status  */}
                <div className='w-full mt-2'>
                <label className='w-4/6 text-Text-Color' htmlFor="status">Choose Status  :</label>
                <select name="status" className='w-full p-1 rounded-md text-Text-Color outline-none'
                value={status}
                onChange={handleChange}>
                    <option>Select Status</option>
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                </div>

                {/* task tag  */}
                <div className='w-full mt-2'>
                <label className='w-4/6 text-Text-Color' htmlFor="tag">Choose Tag  :</label>
                <select name="tag" className='w-full p-1 rounded-md text-Text-Color outline-none'
                value={tag}
                onChange={handleChange}>
                    <option>Select Tag</option>
                    <option value="personal">Personal</option>
                    <option value="work">Work</option>
                    <option value="urgent">Urgent</option>
                    <option value="important">Important</option>
                </select>
                </div>

                {/* task description  */}
                <textarea 
                className='w-full mt-2 p-2 rounded-md h-24 outline-none text-Text-Color'
                name="description" placeholder='Enter a task description'
                value={description}
                onChange={handleChange}/>
            </div>}
            {display ? <div className='w-11/12 md:w-3/6 bg-Secondary-Color rounded-md flex justify-around items-center p-2 mx-auto border border-Primary-Color'>
                  <button onClick={handleSubmit} className='uppercase text-3xl text-Primary-Color font-bold'>Create todo</button>
            </div> : <div className='w-11/12 md:w-3/6 bg-Secondary-Color rounded-md flex justify-around items-center p-2 mx-auto'>
                  <h1 className='uppercase text-3xl text-Primary-Color font-bold'>Create new Todo</h1>
                  <button onClick={handleClick} className='text-4xl border-2 text-Background-Color font-bold border-Primary-Color cursor-pointer rounded-full text-center hover:text-Primary-Color hover:border-Background-Color'><BsPlusLg/></button>
            </div>}

            {/* Show task History here:  */}
            {display || 
            <div className='w-11/12 md:w-3/6  mx-auto mt-5 rounded-md'>
                {/* after mapping show this everytime: */}
                {todos.map((todo, index) => (
                    <div key={index} 
                    className='p-2 bg-Secondary-Color rounded-md  text-Text-Color my-2 w-full'>
                    <div className='w-full flex justify-center items-center'>
                    {/* title & description  */}
                        <div className='w-4/6 text-start'>
                            <p className='font-semibold'>Task: {todo.task.title}</p>
                            <p>Description: {todo.task.description}</p>
                        </div>

                    {/* other status  */}
                        <div className='w-2/6 text-start'>
                            <p>Priority: {todo.task.priority}</p>
                            <p>Status: {todo.task.status}</p>
                            <p>Tag: {todo.task.tag}</p>
                        </div>
                    </div>
                    <div className='w-full flex justify-between items-center mt-2 text-Background-Color'>
                        <p>Created Data: {todo.dueDate}</p>
                        <button type='button' className='bg-Primary-Color p-1 rounded-md font-semibold'
                        onClick={() => handleDelete(todo._id, index)}
                        >
                            DELETE TODO
                        </button>
                    </div>
                    </div>
                ))}
            </div>
            }
            </div>
        </div>
    );
}

export default Home;