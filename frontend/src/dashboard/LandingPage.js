import React, { Fragment, useEffect, useState } from 'react'
import { IoMenu } from "react-icons/io5";
import { MdEditSquare } from "react-icons/md";
import { FaRectangleList } from "react-icons/fa6";
import { IoTicket } from "react-icons/io5";
import { RiChatHistoryFill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import Navbar from './shared/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BookingForm from './BookingForm';
import { useSelector } from 'react-redux';


function LandingPage() {

  const username = useSelector((state)=>state.ticket.username);
  console.log(username);

  return (
    <Fragment>
      <div className='container-fluid'>
        <div className='row justify-content-center main-container'>
          <div className='col-lg-4 col-md-5 col-sm-6 col-10 '>

            <BookingForm />

            {/* <p className='register-link text-center mt-5'>welcome! {username}</p> */}
            {/* <hr className='h-row' />
            <Link to="#" className='btn btn-warning p-2 w-100 button-1 shadow'>Personal Booking</Link> */}
            <hr className='h-row' />
            <div className='row'>
              <div className='col-lg-12 col-md-12 col-sm-12 col-12 d-flex justify-content-between'>
                <div className='button-2'>
                  <Link to="/myticket" className='text-center'>
                    <IoTicket className='icon-1' /><br />
                    VIEW TICKET</Link>
                </div>
                <div className=' button-2'>
                  <Link to="#" className='text-center'>
                    <MdEditSquare className='icon-1' /><br />
                    MODIFY TICKET
                  </Link>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-12 col-md-12 col-sm-12 col-12 d-flex justify-content-between'>
                <div className='button-2'>
                  <Link to="/history" className='text-center'>
                    <RiChatHistoryFill className='icon-1' /><br />
                    HISTORY</Link>
                </div>
                <div className=' button-2'>
                  <Link to="#" className='text-center'>
                    <FaRectangleList className='icon-1' /><br />
                    ROUTE LIST
                  </Link>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-12 col-md-12 col-sm-12 col-12 text-center'>
                <label className='disclaimer'><b>Note : </b> All routes are fixed. Choose pickup and drop locations according route list !</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default LandingPage