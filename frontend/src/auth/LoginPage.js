import React, { Fragment, useState } from 'react'
import Navbar from '../dashboard/shared/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { backendurl } from '../ServicePage';
import { useDispatch } from 'react-redux';
import { newticket } from '../dashboard/redux/TicketSlice';
import Cookies from 'js-cookie';
import { IoCarSport } from "react-icons/io5";

function LoginPage() {
    const appNavigation = useNavigate();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

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
            const name = response.data.name;
            const mob = response.data.mobile;
            dispatch(newticket({ username: name, mobile: mob }));
            const token = response.data.token;
            console.log(token);
            Cookies.set('authToken', token, { expires: 1 });
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
            <div className='navbar shadow'>
                <div className='container-fluid g-0 m-0 p-0'>
                    <div className='row g-0 w-100'>
                        <div className='col-lg-4 col-md-4 col-sm-4 col-4 d-flex justify-content-center align-items-center'>
                        </div>
                        <div className='col-lg-4 col-md-4 col-sm-4 col-4 d-flex justify-content-center align-items-center'>
                            <IoCarSport /><IoCarSport /><IoCarSport /><IoCarSport />
                        </div>
                        <div className='col-lg-4 col-md-4 col-sm-4 col-4 d-flex justify-content-center align-items-center'>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container-fluid g-0'>
                <div className='row justify-content-center mt-5'>
                    <div className='col-lg-5 col-md-6 col-sm-7 col-9 mt-5'>
                        <div className="card border-warning mb-3 rounded-0 shadow-sm mt-2">
                            <label className='label-2 border-warning w-100 rounded-0 shadow-sm p-2'>LOGIN HERE</label>
                            <div className="card-body">
                                <input type='mobile' className='form-control p-2 d-input' placeholder='Mobile Number' name='mobile' value={userData.mobile} onChange={handleChange} />
                                <input type='password' className='form-control p-2 d-input' placeholder='Password' name='password' value={userData.password} onChange={handleChange} />
                                <div className="form-check mt-3">
                                    <input className="form-check-input shadow-none" type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Remember me
                                    </label>
                                </div>
                                <button type='button' className='btn btn-warning p-2 w-100 rounded-0 mt-3' onClick={handleLogin} disabled={loading}>
                                    {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "LOGIN"}
                                </button>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                                <div className='row mt-2 text-center'>
                                    <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                                        <label className=''>Not Registered ? </label>
                                        <Link to="register" className='register-link'> SignUp</Link>
                                    </div>
                                </div>
                                <div className='row mt-3 text-center'>
                                    <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                                        <Link to="register" className='register-link'> Forgot Password?</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Link className='text-decoration-none text-warning' to="/driver" >driver</Link><br />
            <Link className='text-decoration-none text-warning' to="/admin" >admin</Link>
            <ToastContainer />
        </Fragment>
    )
}

export default LoginPage