import React, { Fragment, useState } from 'react'
import Navbar from '../dashboard/shared/Navbar'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { backendurl } from '../ServicePage';

export default function RegisterPage() {

    const [userData, setUserData] = useState({
        name: "",
        mobile: "",
        password: "",
        confirmpassword: ""
    });

    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        });
        console.log(userData);
    };

    const handleSubmit = async () => {
        if (userData.password === userData.confirmpassword) {
            try {
                const response = await axios.post(`${backendurl}/register`, userData);
                toast.success(response.data.message);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        } else {
            toast.error("password not matched!");
        }
    }

    return (
        <Fragment>
            <div className='container-fluid g-0'>
                <div className='row mt-5 justify-content-center'>
                    <div className='col-lg-5 col-md-6 col-sm-7 col-10 mt-5'>
                            <input type='text' className='form-control p-2 mb-2 input-box' placeholder='Full Name' name='name' value={userData.name} onChange={handleChange} />
                            <input type='mobile' className='form-control p-2 mb-2 input-box' placeholder='Mobile Number' name='mobile' value={userData.mobile} onChange={handleChange} />
                            <input type='password' className='form-control p-2 mb-2 input-box' placeholder='Password' name='password' value={userData.password} onChange={handleChange} />
                            <input type='text' className='form-control p-2 mb-2 input-box' placeholder='Confirm Password' name='confirmpassword' value={userData.confirmpassword} onChange={handleChange} />
                            <button type='button' className='btn btn-warning p-2 w-100 button-1' onClick={handleSubmit}>REGISTER</button>
                            <div className='row mt-3 text-center'>
                                <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                                    <label className='m-2'>Already Registered ?</label>
                                    <Link to="/" className=''>LOGIN HERE</Link>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </Fragment>
    )
}
