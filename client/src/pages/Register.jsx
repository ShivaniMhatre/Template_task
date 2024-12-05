import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const [regData, setRegData] = useState({})
    const navigate = useNavigate()

    const handleChange = (e) => {
        setRegData({
            ...regData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(regData)
            })
            const data = await response.json()
            if (data.success) {
                toast.success("User registered successfully!");
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                toast.error(data.message || "Registration failed");
            }
        }
        catch (error) {
            console.error(error)
        }

    }

    return (
        <>

            <div className="h-screen flex items-center justify-center">
                <div className=" max-w-sm border shadow bg-white mx-auto p-8">
                    <h2 className='text-2xl font-semibold pt-5 '>Please Register</h2>
                    <form onSubmit={handleSubmit} className='space-y-5 max-w-sm mx-auto pt-8'>
                        <input
                            type='email'
                            placeholder='Email'
                            id='email'
                            required
                            className='w-full bg-gray-100 focus:outline-none px-5 py-3 rounded'
                            onChange={handleChange}
                        />
                        <input
                            type='password'
                            placeholder='password'
                            id='password'
                            required
                            className='w-full bg-gray-100 focus:outline-none px-5 py-3 rounded'
                            onChange={handleChange}
                        />
                        <button
                            type='submit'
                            className='bg-indigo-900 w-full mt-5 
                    text-white uppercase
                     hover:bg-indigo-500 font-medium py-3 rounded'
                        >
                            Register
                        </button>
                    </form>
                    <p className='my-5 italic text-sm text-center'>Already have an Account?
                        <Link to='/login' className='text-red-700 px-1 underline'> Login </Link>
                        here.
                    </p>
                </div>
            </div>
            <ToastContainer />
        </>

    )
}
