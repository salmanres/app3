import React, { Fragment } from 'react';
import { IoCarSport } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RiChatHistoryFill } from "react-icons/ri";
import { IoTicket } from "react-icons/io5";
import { MdEditSquare } from "react-icons/md";
import { FaRoute } from "react-icons/fa6";
import { MdOutlineSecurity } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { IoLogOutSharp } from "react-icons/io5";

function Navbar() {

  const username = useSelector((state) => state.ticket.username);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  }


  return (
    <Fragment>
      <div className='navbar shadow-sm'>
        <div className='container-fluid g-0 m-0 p-0'>
          <div className='row g-0 w-100'>
            <div className='col-lg-4 col-md-4 col-sm-4 col-4 d-flex justify-content-start align-items-center ps-3 '>
              <a className="menu-btn" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                <FiMenu />
              </a>
              <div className="offcanvas offcanvas-start sidebar" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title ms-2" id="offcanvasExampleLabel">welcome {username}</h5>
                  <button type="button" className="btn-close shadow-none" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                  <ul className='menu-list'>
                    <li><IoHome className='menu-icon' /><Link data-bs-dismiss="offcanvas" onClick={() => handleNavigate("/home")}>HOME</Link></li>
                    <li><IoTicket className='menu-icon' /><Link data-bs-dismiss="offcanvas" onClick={() => handleNavigate("/home/myticket")}>VIEW TICKET</Link></li>
                    <li><RiChatHistoryFill className='menu-icon' /><Link data-bs-dismiss="offcanvas" onClick={() => handleNavigate("/home/history")}>HISTORY</Link></li>
                    <li><FaRoute className='menu-icon' /><Link data-bs-dismiss="offcanvas" onClick={() => handleNavigate("/home/routelist")}>ROUTE LIST</Link></li>
                    <li><MdOutlineSecurity className='menu-icon' /><Link data-bs-dismiss="offcanvas" onClick={() => handleNavigate("/home/emergency")}>EMERGENCY</Link></li>
                    <li><IoLogOutSharp className='menu-icon' /><Link data-bs-dismiss="offcanvas" onClick={() => handleNavigate("/")}>LOGOUT</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='col-lg-4 col-md-4 col-sm-4 col-4 d-flex justify-content-center align-items-center'>
              <IoCarSport /><IoCarSport /><IoCarSport /><IoCarSport />
            </div>
            <div className='col-lg-4 col-md-4 col-sm-4 col-4 d-flex justify-content-center align-items-center'>
            </div>
          </div>
        </div>
      </div>
    </Fragment >
  );
}

export default Navbar;
