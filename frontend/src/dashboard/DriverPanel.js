import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { backendurl } from '../ServicePage';
import NavbarDriver from './shared/NavbarDriver';

function DriverPanel() {

    const [bookingData, setBookingData] = useState([]);

    const getBookingData = async () => {
        try {
            const response = await axios(`${backendurl}/mybookings`);
            const today = new Date().toISOString().split('T')[0]; // "yyyy-MM-dd"
            const filteredData = response.data.filter(booking => booking.date.split('T')[0] === today);
            console.log(filteredData);
            setBookingData(filteredData);
        } catch (error) {
            console.log(error);
        }
    };

    const completeBooking = async (id) => {
        try {
            const response = await axios.patch(`${backendurl}/completebooking/${id}`);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getBookingData();
    }, []);

    return (
        <Fragment>
            <NavbarDriver />
            <div className='container-fluid g-0 mt-5'>
                <div className='row justify-content-center '>
                    <div className='col-lg-3 col-md-4 col-sm-5 col-6 rounded-0 mt-4 justify-content-center'>
                        <div className='row mt-1'>
                            <div className='col-lg-4 col-md-4 col-sm-4 col-4 d-flex justify-content-center align-items-center'>
                                <label className='label-3'>OFFLINE</label>
                            </div>
                            <div className='col-lg-4 col-md-4 col-sm-4 col-4'>
                                <div className="form-check form-switch d-flex justify-content-center align-items-center">
                                    <input className="form-check-input btn-3 bg-warning outline-none border-0 shadow-none" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-4 col-sm-4 col-4 d-flex justify-content-center align-items-center'>
                                <label className='label-3'>ONLINE</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row justify-content-center mb-5'>
                    <div className='col-lg-4 col-md-5 col-sm-6 col-10'>
                        <label className='label-2 mt-4 rounded-0 mb-1'>BOOKINGS TODAY - {new Date().toDateString()}</label>
                        {bookingData.length > 0 ? (
                            bookingData.map((data) => (
                                <div key={data._id} className="card border-warning ticket-card mb-1 rounded-0">
                                    <div className="card-body">
                                        <p className="card-text border-bottom mb-0 pb-1 "><b>Booking Id : </b>{data._id}</p>
                                        <p className="card-text border-bottom mb-0 pb-1 "><b>Pickup : </b>{data.pickup}</p>
                                        <p className="card-text border-bottom mb-0 pb-1 "><b>Drop : </b>{data.drop}</p>
                                        <p className="card-text border-bottom mb-0 pb-1 "><b>Seats : </b>{data.seats}</p>
                                        <p className="card-text border-bottom mb-0 pb-1 "><b>Date : </b>{data.date.split("T")[0]}</p>
                                        <p className="card-text border-bottom mb-0 pb-1 "><b>Route : </b>{data.route}</p>
                                        <p className="card-text border-bottom mb-0 pb-1 "><b>Fare : </b>{data.fare}/-</p>
                                        <p className="card-text mb-0 pb-1 "><b>Status : </b>{data.ridestatus}</p>
                                        <button className='btn btn-warning mt-2 rounded-0' onClick={() => completeBooking(data._id)}>COMPLETE</button>
                                        <button className='btn btn-warning mt-2 rounded-0 float-end'>CANCEL</button>
                                    </div>
                                </div>
                            ))
                        ) : <p><br /><br /><br />no data</p>}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default DriverPanel