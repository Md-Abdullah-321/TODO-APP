import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialStates = {
  email: '',
  password: ''
};

function Login({setName}) {
  const [login, setLogin] = useState(initialStates);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = login;

    try {
      const res = await fetch('http://localhost:5000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await res.json();
      if (data.error) {
        window.alert('Invalid Credentials');
      } else {
        // Save the token as a cookie in the browser
        document.cookie = `jwtoken=${data.token}; path=/;`;
        localStorage.setItem('name', data.name);
        window.alert('Sign In Successful');
        navigate('/');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleNavigate = (e) => {
    navigate('/registration')
  }
  return (
    <div className='bg-Background-Color h-screen flex justify-center items-center font-mono'>
      <div className='bg-Secondary-Color w-5/6 md:w-1/3 rounded-md'>
        <h1 className='text-center mt-5 text-2xl font-semibold uppercase'>Login Form</h1>
        <form action='POST' className='w-full py-5'>
          <div className='w-5/6 mx-auto my-2'>
            <label className='text-Text-Color' htmlFor='email'>
              Enter Your Email:
            </label>
            <input
              name='email'
              value={login.email}
              onChange={handleChange}
              type='email'
              className='w-full p-1 rounded-md outline-none text-Text-Color'
            />
          </div>

          <div className='w-5/6 mx-auto my-2'>
            <label className='text-Text-Color' htmlFor='password'>
              Enter Your Password:{' '}
            </label>
            <input
              name='password'
              value={login.password}
              onChange={handleChange}
              className='w-full p-1 rounded-md outline-none text-Text-Color'
              type='password'
            />
          </div>

          <div className='w-5/6 mx-auto my-5'>
            <button
              type='submit'
              className='w-full bg-Primary-Color p-1 rounded-md text-Background-Color font-bold hover:text-Secondary-Color'
              onClick={handleSubmit}
            >
              Sign In
            </button>
          </div>

          <div className='flex justify-between items-center w-5/6 mx-auto my-2'>
            <p className='text-Text-Color'>Don't have any account?</p>
            <button
            onClick={handleNavigate}
            className='uppercase text-Primary-Color font-bold underline'>Sign up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
