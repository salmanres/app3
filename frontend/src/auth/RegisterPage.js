import React, { Fragment, useState } from 'react'
import Navbar from '../dashboard/shared/Navbar'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { backendurl } from '../ServicePage';
import { IoCarSport } from "react-icons/io5";

export default function RegisterPage() {

    const [loading, setLoading] = useState(false);

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
        setLoading(true);
        if (userData.password === userData.confirmpassword) {
            try {
                const response = await axios.post(`${backendurl}/register`, userData);
                toast.success(response.data.message);
            } catch (error) {
                toast.error(error.response.data.message);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        } else {
            toast.error("password not matched!");
            setLoading(false);
        }
    }

    return (
        <Fragment>
            <div className='navbar shadow-sm'>
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
                <div className='row mt-5 justify-content-center'>
                    <div className='col-lg-4 col-md-5 col-sm-6 col-10 mt-4'>
                        <div className="card mb-3 shadow-sm mt-3">
                            <label className='label-2 w-100 rounded-bottom-0'>REGISTER HERE</label>
                            <div className="card-body">
                                <input type='text' className='form-control p-2 mb-2 d-input' placeholder='Full Name' name='name' value={userData.name} onChange={handleChange} />
                                <input type='mobile' className='form-control p-2 mb-2 d-input' placeholder='Mobile Number' name='mobile' value={userData.mobile} onChange={handleChange} />
                                <input type='password' className='form-control p-2 mb-2 d-input' placeholder='Password' name='password' value={userData.password} onChange={handleChange} />
                                <input type='text' className='form-control p-2 mb-2 d-input' placeholder='Confirm Password' name='confirmpassword' value={userData.confirmpassword} onChange={handleChange} />
                                <button type='button' className='btn btn-warning w-100 mt-3' onClick={handleSubmit} disabled={loading}>
                                    {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "REGISTER"}
                                </button>
                                <div className='row mt-3 text-center'>
                                    <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                                        <label className='m-2'>Already Registered ?</label>
                                        <Link to="/" className='register-link'>Login Here</Link>
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
