import axios from 'axios';
import React, { Fragment, useState } from 'react';
import { IoCarSport } from "react-icons/io5";
import { backendurl } from '../ServicePage';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { driverData } from '../dashboard/redux/DriverSlice';

function LoginDriver() {

    const [loader, setLoader] = useState(false);
    const [userData, setUserData] = useState({
        drivernumber: '',
        driverpassword: ''
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        });
        console.log(userData);
    };

    const handleSubmit = async () => {
        setLoader(true);
        try {
            const response = await axios.post(`${backendurl}/driverlogin`, userData);
            console.log(response.data);
            toast.success(response.data.message);
            const drivername = response.data.drivername;
            const drivernumber = response.data.drivernumber;
            dispatch(driverData({ drivername, drivernumber }));
            setLoader(false);
            if (response.status === 200) {
                navigate("/driverpanel");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
            setLoader(false);
        } finally {
            setLoader(false);
        }
    }

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

            <div className='container-fluid g-0 mt-5'>
                <div className='row justify-content-center'>
                    <div className='col-lg-4 col-md-5 col-sm-6 col-10 mt-4'>
                        <div className="card mb-3 shadow-sm mt-4">
                            <label className='label-2 w-100 rounded-bottom-0'>DRIVER LOGIN</label>
                            <div className="card-body">
                                <input type="text" className='form-control rounded-0 d-input shadow-none p-2' placeholder='Mobile Number' name="drivernumber" value={userData.drivernumber} onChange={handleChange} />
                                <input type="password" className='form-control rounded-0 d-input shadow-none p-2' placeholder='Password' name="driverpassword" value={userData.driverpassword} onChange={handleChange} />
                                <div className="form-check mt-3">
                                    <input className="form-check-input shadow-none" type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Remember me
                                    </label>
                                </div>
                                <button className='btn btn-warning w-100 mt-3' onClick={handleSubmit}>
                                    {loader ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "LOGIN"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </Fragment>
    )
}

export default LoginDriver