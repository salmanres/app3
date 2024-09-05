import axios from 'axios';
import React, { Fragment, useState } from 'react'
import { backendurl } from '../ServicePage';
import { ToastContainer, toast } from 'react-toastify';

function AddNewRoute() {

    const [loader, setLoader] = useState(false);
    const [routeData, setRouteData] = useState({
        origin: "",
        destination: ""
    });

    const handleChange = (event) => {
        setRouteData({
            ...routeData,
            [event.target.name]: event.target.value
        })
    };

    const handleSubmit = async () => {
        setLoader(true);
        try {
            const response = await axios.post(`${backendurl}/addnewroute`, routeData);
            console.log(response.data);
            toast.success(response.data.message);
            setLoader(false);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
            setLoader(false);
        } finally {
            setLoader(false);
        }
    };

    return (
        <Fragment>
            <div className='container-fluid g-0 mt-5'>
                <div className='row justify-content-center'>
                    <div className='col-lg-5 col-md-6 col-sm-7 col-9 mt-5'>
                        <div className="card border-warning mb-3 rounded-0 shadow-sm mt-2">
                            <label className='label-2 border-warning w-100 rounded-0 shadow-sm p-2'>ADD NEW ROUTE</label>
                            <div className="card-body">
                                <input type="text" className='form-control rounded-0 d-input shadow-none p-2' placeholder='Enter Origin' autofill='off' name="origin" value={routeData.value} onChange={handleChange} />
                                <input type="text" className='form-control rounded-0 d-input shadow-none p-2' placeholder='Enter Destination' name="destination" value={routeData.value} onChange={handleChange} />
                                <button className='btn btn-warning rounded-0 w-100 mt-3' onClick={handleSubmit}>
                                    {loader ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "ADD ROUTE"}
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

export default AddNewRoute