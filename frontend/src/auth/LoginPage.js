import React, { Fragment, useState } from 'react'
import Navbar from '../dashboard/shared/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { backendurl } from '../ServicePage';

function LoginPage() {
    const appNavigation = useNavigate();
    const [loading, setLoading] = useState(false);

    const [userData, setUserData] = useState({
        mobile: "",
        password: "",
    });

    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        });
        console.log(userData);
    };

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${backendurl}/login`, userData);
            toast.success(response.data.message);
            appNavigation("/home");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    console.log(userData);

    return (
        <Fragment>

            <div className='container-fluid g-0'>
                <div className='row justify-content-center mt-5'>
                    <div className='col-lg-5 col-md-6 col-sm-7 col-9 mt-5'>
                        <div className='row'>
                            <div className='col-lg-12 col-md-12 col-sm-12 col-12 ms-1'>
                                <h1><b> Login to your Account</b></h1>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                                <form>
                                    <input type='mobile' className='form-control p-2 mt-4 input-box' placeholder='Mobile Number' name='mobile' value={userData.mobile} onChange={handleChange} />
                                    <input type='password' className='form-control p-2 mt-2 input-box' placeholder='Password' name='password' value={userData.password} onChange={handleChange} />
                                    <div className='row'>
                                        <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                                            <label className='mt-2 check-label'><input type='checkbox' className='checkbox ' name='rememberme' /> Remember me</label>
                                        </div>
                                    </div>
                                    <button type='button' className='btn btn-warning p-2 w-100 button-1 mt-2' onClick={handleLogin} disabled={loading}>
                                        {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "LOGIN"}
                                    </button>
                                </form>
                                <div className='row mt-4 text-center'>
                                    <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                                        <label className=''>Not Registered ? </label>
                                        <Link to="register" className='register-link'> SignUp</Link>
                                    </div>
                                </div>
                                <div className='row mt-3 text-center'>
                                    <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                                        <Link to="register" className='register-link'> Forgot the Password?</Link>
                                    </div>
                                </div>
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