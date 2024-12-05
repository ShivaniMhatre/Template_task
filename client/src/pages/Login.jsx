import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
    const [loginData, setLoginData] = useState({})
    const navigate = useNavigate()

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData)
            })
            const data = await response.json()
            if (data.success) {
                toast.success("User Login successfully!");
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } else {
                toast.error(data.message || "Failed");
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
                    <h2 className='text-2xl font-semibold pt-5 '>Please Login</h2>
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
                            Login
                        </button>
                    </form>
                    <p className='my-5 italic text-sm text-center'>Don t have an Account?
                        <Link to='/register' className='text-red-700 px-1 underline'> Register </Link>
                        here.
                    </p>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
