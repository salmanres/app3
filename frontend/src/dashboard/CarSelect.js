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
                        <div className='row'>
                            <div className='col-lg-12 col-md-12 col-sm-12 col-12 ms-1 mb-3 mt-2 text-center'>
                                <h1><b> Select Your Ride !</b></h1>
                            </div>
                        </div>
                        {carData.length > 0 ? (
                            carData.map((data) => (
                                <div key={data.registration}>
                                    <button to="#" className='btn btn-outline-warning w-100 mb-2 cardataview  mb-2' onClick={() => handleSubmit(data)}>
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
                <br />
            </div>
        </Fragment>
    );
}

export default CarSelect;
