import axios from 'axios';
import React, { Fragment, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { backendurl } from '../ServicePage';

function AddNewCar() {

    const [loader, setLoader] = useState(false);
    const [carData, setCarData] = useState({
        registration: "",
        model: "",
        make: "",
        color: "",
        ownername: "",
        ownernumber: "",
        owneraddress: "",
    });

    const handleChange = (event) => {
        setCarData({
            ...carData,
            [event.target.name]: event.target.value
        });
        console.log(carData);
    }

    const handleSubmit = async () => {
        setLoader(true);
        try {
            const response = await axios.post(`${backendurl}/addnewcar`, carData);
            toast.success(response.data.message);
            setLoader(false);
        } catch (error) {
            toast.error(error.response.data.message);
            setLoader(false);
        }
    }

    return (
        <Fragment>
            <div className='container-fluid g-0'>
                <div className='row justify-content-center mt-5'>
                    <div className='col-lg-5 col-md-6 col-sm-7 col-9 mt-5'>
                        <div className="card border-warning mb-3 rounded-0 shadow-sm mt-2">
                            <label className='label-2 border-warning w-100 rounded-0 shadow-sm p-2'>ADD NEW VEHICLE</label>
                            <div className="card-body">
                                <input type='text' placeholder='Registration ' className='form-control p-2 d-input mb-2 input-box2' name='registration' value={carData.registration} onChange={handleChange} />
                                <input type='text' placeholder='Model' className='form-control p-2 mb-2 input-box2 d-input' name='model' value={carData.model} onChange={handleChange} />
                                <input type='text' placeholder='Make' className='form-control p-2 mb-2 input-box2 d-input' name='make' value={carData.make} onChange={handleChange} />
                                <input type='text' placeholder='Color' className='form-control p-2 mb-2 input-box2 d-input' name='color' value={carData.color} onChange={handleChange} />
                                <input type='text' placeholder='Owner Name' className='form-control p-2 mb-2 input-box2 d-input' name='ownername' value={carData.ownername} onChange={handleChange} />
                                <input type='text' placeholder='Owner Number' className='form-control p-2 mb-2 input-box2 d-input' name='ownernumber' value={carData.ownernumber} onChange={handleChange} />
                                <input type='text' placeholder='Owner Address' className='form-control p-2 mb-2 input-box2 d-input' name='owneraddress' value={carData.owneraddress} onChange={handleChange} />
                                <button className='btn btn-warning p-2 w-100 mt-3 button-1 rounded-0' onClick={handleSubmit}>
                                    {loader ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "ADD VEHICLE"}
                                </button>
                            </div>
                        </div>
                        {/* <form>
                            
                        </form> */}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </Fragment>
    )
}

export default AddNewCar