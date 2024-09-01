import React, { Fragment } from 'react'
import Navbar from './shared/Navbar'

function DriverPanel() {
    return (
        <Fragment>
            <Navbar />
            <div className='container-fluid g-0 mt-5'>
                <div className='row justify-content-center '>
                    <div className='col-lg-5 col-md-6 col-sm-7 col-12 mt-3 justify-content-center'>
                        <div className='row'>
                            <div className='col-lg-4 col-md-4 col-sm-4 col-4'>
                            </div>
                            <div className='col-lg-4 col-md-4 col-sm-4 col-4'>
                                <div className="form-check form-switch text-center">
                                    <input className="form-check-input btn-3 bg-warning outline-none border-0 shadow-none ms-auto" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-4 col-sm-4 col-4'>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </Fragment>
    )
}

export default DriverPanel