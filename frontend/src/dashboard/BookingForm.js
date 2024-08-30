import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { backendurl } from '../ServicePage';
import { useDispatch } from 'react-redux';
import { newticket } from './redux/TicketSlice';

function BookingForm() {
    const [locations, setLocations] = useState([]);
    const [pickup, setPickup] = useState('');
    const [drop, setDrop] = useState('');
    const [seats, setSeats] = useState("");
    const [date, setDate] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);

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

    const handleSubmit = () => {
        setLoader(true);
        setTimeout(() => {
            dispatch(newticket({ pickup: pickup, drop: drop, seats: seats, date: date }));
            navigate("/carselect");
            setLoader(false);
        }, 700);
    }

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
                                <input type='number' className='form-control p-2 mb-2 input-box' placeholder='Seats' min={1} max={6} value={seats} onChange={(e) => setSeats(e.target.value)} />
                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                                <input type='date' className='form-control p-2 input-box' placeholder='Date' value={date} onChange={(e) => setDate(e.target.value)} />
                            </div>
                        </div>
                        <button className='btn btn-warning p-2 w-100 button-1 rounded-0' onClick={handleSubmit} disabled={loader}>
                            {loader ? <span className='spinner-border spinner-border-sm me-2' role='status' aria-hidden='true'></span> : "CONTINUE"}
                            </button>
                        {/* <Link to="/carselect" className='btn btn-warning p-2 w-100 button-1 shadow '>CONTINUE</Link> */}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default BookingForm;
