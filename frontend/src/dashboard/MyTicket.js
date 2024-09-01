import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { backendurl } from '../ServicePage';
import { Link } from 'react-router-dom';

function MyTicket() {

  const [ticketData, setTicketData] = useState([]);
  const mobile = useSelector((state) => state.ticket.mobile);

  const getTicketData = async () => {
    try {
      const response = await axios.get(`${backendurl}/myticket`, {
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
      <div className='container fluid-0 mt-5 mb-4'>
        <div className='row justify-content-center'>
          <div className='col-lg-5 col-md-6 col-sm-7 col-11 mt-4 ' >
            <label className='label-2 shadow mb-1 mt-2'>ACTIVE BOOKINGS - {ticketData.length} </label>
            {ticketData.length > 0 ? (
              ticketData.map((ticketData) => (
                <div key={ticketData._id} className="card border-warning ticket-card mb-3 shadow rounded-0 mb-1 ">
                  {/* <div className="card-header">{data._id}</div> */}
                  <div className="card-body">
                    <p className="card-text mb-0 border-bottom pb-1"><b>Booking Id : </b>{ticketData._id}</p>
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
                    <Link to={`/modifyticket/${ticketData._id}`} className='btn btn-warning button-1 rounded-0 shadow'>MODIFY BOOKING</Link>
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

export default MyTicket