import React, { Fragment } from 'react'
import { IoCarSport } from "react-icons/io5";

function Navbar() {
  return (
    <Fragment>
      <div className='navbar shadow'>
        <IoCarSport /><h2 className=' my-auto'>CarPool</h2>
      </div>
    </Fragment>
  )
}

export default Navbar