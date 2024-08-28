import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';

function TicketPage() {

    const ticketData = useSelector((state) => state.ticket);
    console.log(ticketData);

    return (
        <Fragment>
            <div className='container-fluid g-0'>
                <div className='row justify-content-center mt-5'>
                    <div className='col-lg-5 col-md-6 col-sm-7 col-10'>
                        <div class="card border-warning mb-3 mt-5 shadow ticket-card">
                            <div class="card-header"><b>Ticket Details</b></div>
                            <div class="card-body">
                                <p class="card-text mb-1"><b>Name : </b>{ticketData.username}</p>
                                <p class="card-text mb-1"><b>Pickup Location : </b>{ticketData.pickup}</p>
                                <p class="card-text mb-1"><b>Drop Location : </b>{ticketData.drop}</p>
                                <p class="card-text mb-1"><b>Seats : </b>{ticketData.seats}</p>
                                <p class="card-text mb-1"><b>Date : </b>{ticketData.date}</p>
                                <p class="card-text mb-1"><b>Vehicle Model : </b>{ticketData.model}</p>
                                <p class="card-text mb-1"><b>Registration No : </b>{ticketData.registration}</p>
                                <p class="card-text mb-1"><b>Driver Name : </b>{ticketData.drivername}</p>
                                <p class="card-text mb-1"><b>Contact No : </b>{ticketData.drivernumber}</p>
                                <p class="card-text mb-1"><b>Route Details : </b>{ticketData.route}</p>
                                <p class="card-text mb-1"><b>Departure Time : </b>{ticketData.departuretime}</p>
                                <p class="card-text mb-1"><b>Fare : </b>{ticketData.fare}/-</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default TicketPage