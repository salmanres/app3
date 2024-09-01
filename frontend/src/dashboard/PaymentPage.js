import React, { Fragment, useEffect, useState } from 'react';
import { backendurl, razorpay_key_id } from '../ServicePage';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { newticket } from './redux/TicketSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function PaymentPage() {
    const ticketData = useSelector((state) => state.ticket);
    const dispatch = useDispatch();
    const [number, setNumber] = useState(ticketData.mobile);
    console.log(number);
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handlePayment = async () => {
        setLoader(true);
        const response = await fetch(`${backendurl}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: `${ticketData.fare * 100}` }), // Amount in paise (50000 paise = 500 INR)
        });
        const order = await response.json();

        const options = {
            key: `${razorpay_key_id}`, // Replace with your Razorpay key ID
            amount: order.amount,
            currency: order.currency,
            name: 'Ticket Booking',
            description: 'Test Transaction',
            order_id: order.order_id,
            handler: function (response) {
                alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                setLoader(false);
                dispatch(newticket({ paymentId: response.razorpay_payment_id }));
                saveTicket();
                navigate('/ticket');
                console.log(response);
            },
            prefill: {
                name: ticketData.username || 'Default Name',
                contact: number,
            },
            theme: {
                color: '#FFA500',
            },
            method: {
                upi: true,
                card: false,
                netbanking: false,
                wallet: true,
                olamoney: false
            },
            modal: {
                ondismiss: function () {
                    setLoader(false);
                    console.log('Payment modal closed');
                }
            },
        };

        console.log('Razorpay options:', options);
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const saveTicket = async () => {
        try {
            const data = {
                username: ticketData.username,
                mobile: ticketData.mobile,
                pickup: ticketData.pickup,
                drop: ticketData.drop,
                seats: ticketData.seats,
                model: ticketData.model,
                registration: ticketData.registration,
                drivername: ticketData.drivername,
                drivernumber: ticketData.drivernumber,
                route: ticketData.route,
                departuretime: ticketData.departuretime,
                fare: ticketData.fare,
                paymentId: ticketData.paymentId,
            }
            console.log(data);
            const response = await axios.post(`${backendurl}/saveticket`, data);
            console.log(response.data);
        } catch (error) {
            console.error('Error saving ticket:', error.response ? error.response.data : error.message);
        }
    };


    return (
        <Fragment>
            <div className='container-fluid g-0 mt-5'>
                <div className='row mt-5 justify-content-center'>
                    <div className='col-lg-5 col-md-6 col-sm-7 col-10 mt-5'>
                        <div className="card border-warning mt-2 ticket-card rounded-0 shadow mb-5">
                            <div className="card-header">CONFIRM TICKET DETAILS</div>
                            <div className="card-body" id='pdf'>
                                <p className="card-text mb-1 border-bottom pb-1"><b>Pickup Location : </b>{ticketData.pickup}</p>
                                <p className="card-text mb-1 border-bottom pb-1"><b>Drop Location : </b>{ticketData.drop}</p>
                                <p className="card-text mb-1 border-bottom pb-1"><b>Seats : </b>{ticketData.seats}</p>
                                <p className="card-text mb-1 border-bottom pb-1"><b>Date : </b>{ticketData.date}</p>
                                <p className="card-text mb-1 border-bottom pb-1"><b>Route Details : </b>{ticketData.route}</p>
                                <p className="card-text mb-1 border-bottom pb-1"><b>Departure Time : </b>{ticketData.departuretime}</p>
                                <p className="card-text mb-1"><b>Fare : </b>{ticketData.fare}/-</p>
                            </div>
                            <button className='btn btn-warning w-100 rounded-0 button-1' onClick={handlePayment}>
                                {loader ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "PROCEED TO PAY"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </Fragment>
    );
}

export default PaymentPage;
