import React, { Fragment } from 'react'
import NavbarDriver from './shared/NavbarDriver'
import { Outlet } from 'react-router-dom'

function DriverLandingPage() {
  return (
    <Fragment>
        <NavbarDriver/>
        <Outlet/>
    </Fragment>
  )
}

export default DriverLandingPage