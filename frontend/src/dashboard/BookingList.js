import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import { backendurl } from '../ServicePage';

function BookingList() {

    const [bookingData, setBookingData] = useState([]);

    const getBookingData = async () => {
        try {
            const response = await axios.get(`${backendurl}/mybookings`);
            setBookingData(response.data.sort((a, b) => new Date(a.date) - new Date(b.date)));
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getBookingData();
    }, []);

    return (
        <Fragment>
            <div className='container-fluid g-0 mt-5 mb-5'>
                <div className='row justify-content-center'>
                    <div className='col-lg-5 col-md-6 col-sm-7 col-10 mt-3'>
                    <label className='label-2 mt-4 rounded-0 mb-1'>UPCOMING BOOKINGS</label>
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

export default BookingList