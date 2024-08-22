import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { IoMenu } from "react-icons/io5";
import { MdEditSquare } from "react-icons/md";
import { FaRectangleList } from "react-icons/fa6";
import { IoTicket } from "react-icons/io5";
import { RiChatHistoryFill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import { FaCarAlt } from "react-icons/fa";

function AdminMenu() {
    return (
        <Fragment>
            <div className='container-fluid'>
                <div className='row justify-content-center mt-5'>
                    <div className='col-lg-5 col-md-6 col-sm-7 col-11 mt-5'>
                        <div className='row'>
                            <div className='col-lg-12 col-md-12 col-sm-12 col-12 d-flex justify-content-between'>
                                <div className='button-2'>
                                    <Link to="addnewcar" className='text-center'>
                                        <FaCarAlt className='icon-1' /><br />
                                        ADD NEW CAR</Link>
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
                                    <Link to="#" className='text-center'>
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
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default AdminMenu