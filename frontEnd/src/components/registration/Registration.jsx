import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const initialStates = {
    name: '',
    email: '',
    phone: '',
    password: '',
}

function Registration(props) {
    const [reg, setReg] = useState(initialStates);
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setReg({
            ...reg,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        const { name, email,phone, password } = reg;

    try {
      const res = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name, email,phone, password
        })
      });

      const data = await res.json();

      if (data.error) {
        window.alert('Invalid Credentials');
      } else {

        window.alert('Registration Successful');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
    }

    const handleNavigate = () => {
        navigate('/login')
    }
    const {name, email, phone, password} = reg;
    return (
    <div className='bg-Background-Color h-screen flex justify-center items-center font-mono'>
      <div className='bg-Secondary-Color w-5/6 md:w-1/3 rounded-md'>
        <h1 className='text-center mt-5 text-2xl font-semibold uppercase'>Registration Form</h1>
        <form action='POST' className='w-full py-5'>
        <div className='w-5/6 mx-auto my-2'>
            <label className='text-Text-Color' htmlFor='name'>
              Enter Your Name:
            </label>
            <input
              name='name'
              type='text'
              value={name}
              onChange={handleChange}
              placeholder='MD Abdullah'
              className='w-full p-1 rounded-md outline-none text-Text-Color'
            />
          </div>

          <div className='w-5/6 mx-auto my-2'>
            <label className='text-Text-Color' htmlFor='email'>
              Enter Your Email:
            </label>
            <input
              name='email'
              type='email'
              value={email}
              onChange={handleChange}
              placeholder='abdullah.dev.it@gmail.com'
              className='w-full p-1 rounded-md outline-none text-Text-Color'
            />
          </div>

          <div className='w-5/6 mx-auto my-2'>
            <label className='text-Text-Color' htmlFor='email'>
              Enter Your Phone:
            </label>
            <input
              name='phone'
              type='text'
              value={phone}
              onChange={handleChange}
              placeholder='01780073651'
              className='w-full p-1 rounded-md outline-none text-Text-Color'
            />
          </div>          

          <div className='w-5/6 mx-auto my-2'>
            <label className='text-Text-Color' htmlFor='password'>
              Enter Your Password:{' '}
            </label>
            <input
              name='password'
              placeholder='123456'
              value={password}
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
              Sign Up
            </button>
          </div>

          <div className='flex justify-between items-center w-5/6 mx-auto my-2'>
            <p className='text-Text-Color'>Already have an account?</p>
            <button
            className='uppercase text-Primary-Color font-bold underline'
            onClick={handleNavigate}
            >Sign In</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;