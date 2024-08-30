import React, { Fragment } from 'react';
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
            pdf.addImage(data.toDataURL('image/png'), 'PNG', 80, 80, 400.28, 641.89);
            pdf.save('ticket_details.pdf');
        } catch (error) {
            console.error('Error creating PDF:', error);
        }
    };

    return (
        <Fragment>
            <div className='container-fluid g-0'>
                <div className='row justify-content-center mt-5'>
                    <div className='col-lg-5 col-md-6 col-sm-7 col-10'>
                        <div className='row mt-4'>
                            {/* <div className='col-lg-12 col-md-12 col-sm-12 col-12 ms-1 mt-1 text-center'>
                                <h1><b>Collect your Ticket !</b></h1>
                            </div> */}
                        </div>
                        <div className="card border-warning mt-2 ticket-card rounded-0">
                            <div class="card-header">TICKET DETAILS</div>
                            <div className="card-body" id='pdf'>
                                <p className="card-text mb-0 border-bottom pb-1"><b>Booking ID : </b>66c1b6da86eac9640a1c4f0e</p>
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
                                <p className="card-text"><b>Payment Status : </b>Completed</p>
                            </div>
                        </div>
                        <button className='btn btn-warning w-100 button-1 shadow mt-2 rounded-0' onClick={createPDF} type="button">DOWNLOAD TICKET</button>
                        <Link to="/home" className='btn btn-warning w-100 button-1 shadow  rounded-0 mt-2 mb-5'>BACK TO HOME</Link>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default TicketPage;




