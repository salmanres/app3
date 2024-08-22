import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './shared/Navbar'

function MainPage() {
    return (
        <Fragment>
            <div className='container-fluid g-0'>
                <div className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                        <Navbar />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default MainPage