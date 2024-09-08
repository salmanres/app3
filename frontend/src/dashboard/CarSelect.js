import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { backendurl } from '../ServicePage';
import { useDispatch } from 'react-redux';
import { newticket } from './redux/TicketSlice';
import Cookies from 'js-cookie'; // Import js-cookie
import PaymentPage from './PaymentPage';

function CarSelect() {
    const [carData, setCarData] = useState([]);
    const [fare, setFare] = useState(799);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getCarData = async () => {
        try {
            const token = Cookies.get('authToken'); // Retrieve token from cookies
            const response = await axios.get(`${backendurl}/onlinevehicle`, {
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
            route: cardata.carroute,
            fare: cardata.fare,
        }));
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
                                            <button to="#" className='btn btn-outline-warning w-100 cardataview shadow-sm' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleSubmit(data)}>
                                                <div className='row g-0 p-0'>
                                                    <div className='col-lg-12 col-md-12 col-sm-12 col-12 pt-2'>
                                                        <b>{data.make.toUpperCase()} {data.model.toUpperCase()}</b><br />
                                                        {data.carroute.toUpperCase()}
                                                    </div>
                                                </div>
                                                <hr className='p-0 m-1' />
                                                <div className='row g-0 p-0'>
                                                    <div className='col-lg-4 col-md-4 col-sm-4 col-4'>
                                                        Seats<br />
                                                        <h6>{data.seatsavailable}</h6>
                                                    </div>
                                                    <div className='col-lg-4 col-md-4 col-sm-4 col-4'>
                                                        Departure<br />
                                                        <h6>{data.departuretime}</h6>
                                                    </div>
                                                    <div className='col-lg-4 col-md-4 col-sm-4 col-4'>
                                                        Fare<br />
                                                        <h6>{data.fare}/-</h6>
                                                    </div>
                                                </div>
                                            </button>

                                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog modal-dialog-centered">
                                                    <div className="modal-content rounded-0 ">
                                                        <div className="modal-header p-0">
                                                            <label className='label-2 border-warning w-100 rounded-0 shadow-sm p-2'>CONFIRM BOOKING DETAILS</label>
                                                        </div>
                                                        <div className="modal-body">
                                                            <PaymentPage />
                                                            <button type="button" className="btn w-100 mt-2 mb-0 pb-0" data-bs-dismiss="modal">CANCEL</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className='d-flex justify-content-center p-5'>
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
