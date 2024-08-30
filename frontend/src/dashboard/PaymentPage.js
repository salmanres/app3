import React, { Fragment, useEffect } from 'react';
import { backendurl, razorpay_key_id, razorpay_key_secret } from '../ServicePage';
import { useSelector } from 'react-redux';

function PaymentPage() {

    const ticketData = useSelector((state)=>state.ticket);

    console.log(ticketData.username, ticketData.mobile);

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
    const response = await fetch(`${backendurl}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: `${ticketData.fare}` }), // Amount in paise (50000 paise = 500 INR)
    });
    const order = await response.json();

    const options = {
      key: `${razorpay_key_id}`, // Replace with your Razorpay key ID
      amount: order.amount,
      currency: order.currency,
      name: 'CARPOOL',
      description: 'Test Transaction',
      order_id: order.order_id,
      handler: function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: `${ticketData.username}`,
        contact: `${ticketData.usermobile}`,
      },
      theme: {
        color: '#FFA500',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <Fragment>
      <div className='container-fluid g-0 mt-5'>
        <div className='row mt-5 justify-content-center'>
          <div className='col-lg-5 col-md-6 col-sm-7 col-10 mt-5'>
            <button className='btn btn-warning w-100' onClick={handlePayment}>PROCEED TO PAY</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default PaymentPage;
