import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { backendurl } from '../ServicePage';

function Myhistory() {

    const [ticketData, setTicketData] = useState([]);
    const mobile = useSelector((state) => state.ticket.mobile);

    const getTicketData = async () => {
        try {
            const response = await axios.get(`${backendurl}/myhistory`, {
                params: { mobile: mobile }
            });
            setTicketData(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTicketData();
    }, []);

    return (
        <Fragment>
            <div className='container fluid-0 mt-4 mb-5'>
                <div className='row justify-content-center'>
                    <div className='col-lg-5 col-md-6 col-sm-7 col-10 mt-5' >
                        <label className='label-2 shadow mt-3'>HISTORY</label>
                        {ticketData.length > 0 ? (
                            ticketData.map((data) => (
                                <div key={data._id} className="card border-warning ticket-card shadow-sm rounded-0">
                                    {/* <div className="card-header"><b>Booking Id : </b>{data._id}</div> */}
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

export default Myhistory