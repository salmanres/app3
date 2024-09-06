import axios from 'axios';
import React, { Fragment, useState } from 'react'
import { backendurl } from '../ServicePage';
import { ToastContainer, toast } from 'react-toastify';

function AddNewDriver() {
    const [driverData, setDriverData] = useState({
        drivername: "",
        drivernumber: "",
        driverlicence: "",
        driveraadhar: "",
        driveraddress: "",
        driverpassword: ""
    });
    const [loader, setLoader] = useState(false);

    const handleChange = (event) => {
        setDriverData({
            ...driverData,
            [event.target.name]: event.target.value
        })
        console.log(driverData);
    }

    const addNewDriver = async () => {
        setLoader(true);
        try {
            const response = await axios.post(`${backendurl}/addnewdriver`, driverData)
            toast.success(response.data.message);
            setLoader(false);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
            setLoader(false);
        }
    }

    return (
        <Fragment>
            <div className='container-fluid g-0'>
                <div className='row justify-content-center mt-5'>
                    <div className='col-lg-3 col-md-5 col-sm-7 col-9 mt-5'>
                        <div className="card border-warning mb-3 rounded-0 shadow-sm mt-2">
                            <label className='label-2 border-warning w-100 rounded-0 shadow-sm p-2'>ADD NEW DRIVER</label>
                            <div className="card-body">
                                <input type="text" className='form-control rounded-0 d-input shadow-none p-2' placeholder='Name' name="drivername" value={driverData.drivername} onChange={handleChange} />
                                <input type="number" className='form-control rounded-0 d-input shadow-none p-2' placeholder='Mobile' name="drivernumber" value={driverData.drivernumber} onChange={handleChange} />
                                <input type="text" className='form-control rounded-0 d-input shadow-none p-2' placeholder='Driving Licence Number' name="driverlicence" value={driverData.driverlicence} onChange={handleChange} />
                                <input type="text" className='form-control rounded-0 d-input shadow-none p-2' placeholder='Aadhar Number' name="driveraadhar" value={driverData.driveraadhar} onChange={handleChange} />
                                <input type="text" className='form-control rounded-0 d-input shadow-none p-2' placeholder='Address' name="driveraddress" value={driverData.driveraddress} onChange={handleChange} />
                                <input type="text" className='form-control rounded-0 d-input shadow-none p-2' placeholder='Create Password' name="driverpassword" value={driverData.driverpassword} onChange={handleChange} />
                                <button className='btn btn-warning rounded-0 w-100 mt-3' onClick={addNewDriver}>
                                    {loader ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "ADD DRIVER"}
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

export default AddNewDriver