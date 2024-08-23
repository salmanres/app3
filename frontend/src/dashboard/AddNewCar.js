import axios from 'axios';
import React, { Fragment, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { backendurl } from '../ServicePage';

function AddNewCar() {

    const [carData, setCarData] = useState({
        registration: "",
        model: "",
        make: "",
        color: "",
        ownername: "",
        ownernumber: "",
        drivername: "",
        drivernumber: ""
    });

    const handleChange = (event) => {
        setCarData({
            ...carData,
            [event.target.name]: event.target.value
        });
        console.log(carData);
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${backendurl}/addnewcar`, carData);
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <Fragment>
            <div className='container-fluid g-0'>
                <div className='row justify-content-center mt-5'>
                    <div className='col-lg-5 col-md-6 col-sm-7 col-10 mt-4'>
                        <form>
                            <input type='text' placeholder='REGISTRATION NUMBER' className='form-control p-2 mb-2 input-box2' name='registration' value={carData.registration} onChange={handleChange} />
                            <input type='text' placeholder='MODEL' className='form-control p-2 mb-2 input-box2' name='model' value={carData.model} onChange={handleChange} />
                            <input type='text' placeholder='MAKE' className='form-control p-2 mb-2 input-box2' name='make' value={carData.make} onChange={handleChange} />
                            <input type='text' placeholder='COLOR' className='form-control p-2 mb-2 input-box2' name='color' value={carData.color} onChange={handleChange} />
                            <input type='text' placeholder='OWNER NAME' className='form-control p-2 mb-2 input-box2' name='ownername' value={carData.ownername} onChange={handleChange} />
                            <input type='text' placeholder='OWNER NUMBER' className='form-control p-2 mb-2 input-box2' name='ownernumber' value={carData.ownernumber} onChange={handleChange} />
                            <input type='text' placeholder='DRIVER NAME' className='form-control p-2 mb-2 input-box2' name='drivername' value={carData.drivername} onChange={handleChange} />
                            <input type='text' placeholder='DRIVER NUMBER' className='form-control p-2 mb-2 input-box2' name='drivernumber' value={carData.drivernumber} onChange={handleChange} />
                            <input type='button' className='btn btn-warning p-2 w-100 button-1' onClick={handleSubmit} value="ADD VEHICLE" />
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </Fragment>
    )
}

export default AddNewCar