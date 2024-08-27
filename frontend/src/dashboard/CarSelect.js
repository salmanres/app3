import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { backendurl } from '../ServicePage';

function CarSelect() {
    const [carData, setCarData] = useState([]);
    const [fare, setFare] = useState(799);

    const getCarData = async () => {
        try {
            const response = await axios.get(`${backendurl}/availablecars`);
            setCarData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCarData();
    }, []);

    return (
        <Fragment>
            <div className='container-fluid g-0'>
                <div className='row mt-5 justify-content-center'>
                    <div className='col-lg-5 col-md-6 col-sm-7 col-10 mt-4'>
                    <div className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-12 ms-1 mb-3 '>
                        <h1><b> Select Your Ride</b></h1>
                    </div>
                </div>
                        {carData.length > 0 ? (
                            carData.map((data) => (
                                <div key={data.registration}>
                                    <Link to="#" className='btn btn-outline-warning w-100 mb-2 cardataview  mb-2'>
                                        <b>{data.model}</b><br />
                                        Departure : {data.departuretime} <br />
                                        <b>FARE : {fare}/-</b>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>No data</p>
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default CarSelect;
