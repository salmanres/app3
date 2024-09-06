import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { backendurl } from '../ServicePage';
import { useDispatch } from 'react-redux';
import { newticket } from './redux/TicketSlice';
import Cookies from 'js-cookie'; // Import js-cookie

function CarSelect() {
    const [carData, setCarData] = useState([]);
    const [fare, setFare] = useState(799);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getCarData = async () => {
        try {
            const token = Cookies.get('authToken'); // Retrieve token from cookies
            const response = await axios.get(`${backendurl}/availablecars`, {
                headers: {
                    Authorization: `Bearer ${token}` // Include token in request headers
                }
            });
            setCarData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCarData();
    }, []);

    const handleSubmit = (cardata) => {
        dispatch(newticket({
            model: cardata.model,
            registration: cardata.registration,
            drivername: cardata.drivername,
            drivernumber: cardata.drivernumber,
            departuretime: cardata.departuretime,
            route: cardata.route,
            fare: fare,
        }));
        navigate('/payment');
    };

    return (
        <Fragment>
            <div className='container-fluid g-0'>
                <div className='row mt-5 justify-content-center'>
                    <div className='col-lg-5 col-md-6 col-sm-7 col-10 mt-4'>
                        <div className="card border-warning mb-5 rounded-0 shadow-sm mt-3 g-0 ">
                            <label className='label-2 border-warning w-100 rounded-0 shadow-sm p-2'>SELECT YOUR RIDE</label>
                            <div className="card-body g-0 p-0">
                                {carData.length > 0 ? (
                                    carData.map((data) => (
                                        <div key={data.registration}>
                                            <button to="#" className='btn btn-outline-warning w-100 cardataview shadow-sm' onClick={() => handleSubmit(data)}>
                                                <b>{data.model}</b><br />
                                                Departure : {data.departuretime} <br />
                                                Available Seats : 4 <br />
                                                <b>FARE : {fare}/-</b>
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div className='d-flex justify-content-center'>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    </div>

                                )}
                            </div>
                        </div>

                    </div>
                </div>
                <br />
            </div>
        </Fragment>
    );
}

export default CarSelect;
