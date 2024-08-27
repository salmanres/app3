import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { backendurl } from '../ServicePage';

function BookingForm() {
    const [locations, setLocations] = useState([]);
    const [pickup, setPickup] = useState('');
    const [drop, setDrop] = useState('');

    const getLocationData = async () => {
        try {
            const response = await axios.get(`${backendurl}/location`);
            setLocations(response.data); // Update the state with fetched data
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getLocationData();
    }, []);

    return (
        <Fragment>
            <div className='container-fluid g-0'>
                <div className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                        <div className='row'>
                            <div className='col-lg-12 col-md-12 col-sm-12 col-12 ms-1 mb-4 mt-2'>
                                <h1><b> Select Pickup & Drop Location</b></h1>
                            </div>
                        </div>
                        <form>
                            <input
                                className='form-control p-2 mb-2 input-box'
                                type='text'
                                placeholder='Pickup Location'
                                value={pickup}
                                onChange={(e) => setPickup(e.target.value)}
                                list='pickup-locations'
                            />
                            <datalist id='pickup-locations'>
                                {locations.map((data) => (
                                    <option key={data._id} value={data.location} />
                                ))}
                            </datalist>
                            <input
                                className='form-control p-2 mb-2 input-box'
                                type='text'
                                placeholder='Drop Location'
                                value={drop}
                                onChange={(e) => setDrop(e.target.value)}
                                list='drop-locations'
                            />
                            <datalist id='drop-locations'>
                                {locations.map((data) => (
                                    <option key={data._id} value={data.location} />
                                ))}
                            </datalist>
                            <div className='row g-2'>
                                <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                                    <input type='number' className='form-control p-2 mb-2 input-box' placeholder='Seats' min={1} max={6} />
                                </div>
                                <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                                    <input type='date' className='form-control p-2 input-box' />
                                </div>
                            </div>
                            <Link to="/carselect" className='btn btn-warning p-2 w-100 button-1 shadow '>CONTINUE</Link>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default BookingForm;
