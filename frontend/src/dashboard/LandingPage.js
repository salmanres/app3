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

  const username = useSelector((state) => state.ticket.username);
  console.log(username);

  return (
    <Fragment>
      <div className='container-fluid'>
        <div className='row justify-content-center main-container'>
          <div className='col-lg-4 col-md-5 col-sm-6 col-10 '>

            <BookingForm />

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