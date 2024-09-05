import React, { Fragment } from 'react'

function ErrorPage() {
  return (
    <Fragment>
        <div className='container-fluid g-0 mt-5'>
            <div className='row justify-content-center'>
                <div className='col-lg-5 col-md-6 col-sm-7 col-6 mt-5'>
                    <h1 className='text-warning text-center mt-5'>ERROR-404</h1>
                    <p className='text-secondary text-center'>page not found</p>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default ErrorPage