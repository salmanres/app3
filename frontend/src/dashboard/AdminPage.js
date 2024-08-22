import React, { Fragment } from 'react'
import Navbar from './shared/Navbar'
import { Outlet } from 'react-router-dom'

function AdminPage() {
  return (
    <Fragment>
        <Navbar/>
        <Outlet/>
    </Fragment>
  )
}

export default AdminPage