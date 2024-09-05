import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import NavbarAdmin from './shared/NavbarAdmin'

function AdminPage() {
  return (
    <Fragment>
        <NavbarAdmin/>
        <Outlet/>
    </Fragment>
  )
}

export default AdminPage