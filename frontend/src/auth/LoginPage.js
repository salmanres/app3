import React, { Fragment, useState } from 'react'
import Navbar from '../dashboard/shared/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { backendurl } from '../ServicePage';

function LoginPage() {
    const appNavigation = useNavigate();

    const [userData, setUserData] = useState({
        mobile: "",
        password: "",
        rememberme : false
    });

    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        });
        console.log(userData);
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${backendurl}/login`, userData);
            toast.success(response.data.message);
            appNavigation("/home");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    console.log(userData);

    return (
        <Fragment>
            <div className='container-fluid g-0'>
                <div className='row justify-content-center mt-5'>
                    <div className='col-lg-5 col-md-6 col-sm-7 col-10 mt-5'>
                        <form>
                            <input type='mobile' className='form-control p-2 mb-2 input-box' placeholder='Mobile Number' name='mobile' value={userData.mobile} onChange={handleChange} />
                            <input type='password' className='form-control p-2 mb-2 input-box' placeholder='Password' name='password' value={userData.password} onChange={handleChange} />
                            <div className='row'>
                                <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                                    <label className='mb-2'><input type='checkbox' className='checkbox ' name='rememberme' checked={userData.rememberme===true || false} onChange={handleChange} /> Remember me</label>
                                </div>
                            </div>
                            <button type='button' className='btn btn-warning p-2 w-100 button-1' onClick={handleLogin}>LOGIN</button>
                        </form>
                        <div className='row mt-3 text-center'>
                            <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                                <label className='m-2'>Not Registered ?</label>
                                <Link to="register" className=''>REGISTER HERE</Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <ToastContainer />
        </Fragment>
    )
}

export default LoginPage