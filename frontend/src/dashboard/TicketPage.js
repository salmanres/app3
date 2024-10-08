import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Link } from 'react-router-dom';

function TicketPage() {
    const ticketData = useSelector((state) => state.ticket);

    const createPDF = async () => {
        try {
            const data = await html2canvas(document.querySelector('#pdf'), {
                scale: 3,
            });
            const pdf = new jsPDF('portrait', 'pt', 'a4');
            pdf.addImage(data.toDataURL('image/png'), 'PNG', 80, 80, 400.28, 341.89);
            pdf.save('ticket_details.pdf');
        } catch (error) {
            console.error('Error creating PDF:', error);
        }
    };

    return (
        <Fragment>
            <div className='container-fluid g-0'>
                <div className='row justify-content-center mt-5'>
                    <div className='col-lg-4 col-md-5 col-sm-6 col-10'>
                        <div className='row mt-4'>
                            {/* <div className='col-lg-12 col-md-12 col-sm-12 col-12 ms-1 mt-1 text-center'>
                                <h1><b>Collect your Ticket !</b></h1>
                            </div> */}
                        </div>
                        <div className="card mt-3 ticket-card shadow-sm mb-5">
                            <label className='label-2 w-100 rounded-bottom-0'>TICKET DETAILS</label>
                            <div className="card-body" id='pdf'>
                                <p className="card-text mb-0 border-bottom pb-1"><b>Name : </b>{ticketData.username}</p>
                                <p className="card-text mb-1 border-bottom pb-1"><b>Pickup Location : </b>{ticketData.pickup}</p>
                                <p className="card-text mb-1 border-bottom pb-1"><b>Drop Location : </b>{ticketData.drop}</p>
                                <p className="card-text mb-1 border-bottom pb-1"><b>Seats : </b>{ticketData.seats}</p>
                                <p className="card-text mb-1 border-bottom pb-1"><b>Date : </b>{ticketData.date}</p>
                                <p className="card-text mb-1 border-bottom pb-1"><b>Vehicle Model : </b>{ticketData.model}</p>
                                <p className="card-text mb-1 border-bottom pb-1"><b>Registration No : </b>{ticketData.registration}</p>
                                <p className="card-text mb-1 border-bottom pb-1"><b>Driver Name : </b>{ticketData.drivername}</p>
                                <p className="card-text mb-1 border-bottom pb-1"><b>Contact No : </b>{ticketData.drivernumber}</p>
                                <p className="card-text mb-1 border-bottom pb-1"><b>Route Details : </b>{ticketData.route}</p>
                                <p className="card-text mb-1 border-bottom pb-1"><b>Departure Time : </b>{ticketData.departuretime}</p>
                                <p className="card-text mb-1 border-bottom pb-1"><b>Fare : </b>{ticketData.fare}/-</p>
                                <p className="card-text mb-1 border-bottom pb-1"><b>PaymentId : </b>{ticketData.paymentId}</p>
                                <p className="card-text"><b>Payment Status : </b>{ticketData.paymentId ? "Paid" : "Not Completed"}</p>
                            </div>
                            <button className='btn btn-warning mx-3' onClick={createPDF} type="button">DOWNLOAD TICKET</button>
                            <Link to="/home" className='btn w-100 rounded-0 mt-1 mb-3 font-weight-bold'>BACK TO HOME</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default TicketPage;




