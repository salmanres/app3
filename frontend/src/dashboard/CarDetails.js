import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import { backendurl } from '../ServicePage';
import { useParams } from 'react-router-dom';

function CarDetails() {

    const { id } = useParams();
    const [carData, setCarData] = useState([]);
    const [loader, setLoader] = useState(false);
    const [onroad, setOnroad] = useState(true);

    const getCarData = async () => {
        try {
            const response = await axios.get(`${backendurl}/getsinglecardata/${id}`);
            setCarData(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const offroadCar = async () => {
        setLoader(true);
        try {
            const response = await axios.patch(`${backendurl}/offroadcar/${id}`, { onroad: !onroad });
            setOnroad(!onroad); // Toggle blacklisted state
            console.log(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        getCarData();
    }, []);

    return (
        <Fragment>
            <div className='container-fluid g-0 mt-5 '>
                <div className='row justify-content-center '>
                    <div className='col-lg-5 col-md-6 col-sm-7 col-10 mt-4 '>
                        <div className="card border-warning mb-3 rounded-0 shadow-sm mt-3">
                            <label className='label-2 border-warning w-100 rounded-0 shadow-sm p-2'>CAR DETAILS</label>
                            <div className="card-body">
                                <p className='card-text mb-0 border-bottom pb-1'><b>Id : </b>{carData._id}</p>
                                <p className='card-text mb-0 border-bottom pb-1'><b>Model : </b>{carData.model}</p>
                                <p className='card-text mb-0 border-bottom pb-1'><b>Make : </b>{carData.make}</p>
                                <p className='card-text mb-0 border-bottom pb-1'><b>Registration : </b>{carData.registration}</p>
                                <p className='card-text mb-0 border-bottom pb-1'><b>Color : </b>{carData.color}</p>
                                <p className='card-text mb-0 border-bottom pb-1'><b>Owner : </b>{carData.ownername}</p>
                                <p className='card-text mb-0 border-bottom pb-1'><b>Mobile : </b>{carData.ownernumber}</p>
                                <p className='card-text mb-0 border-bottom pb-1'><b>Address : </b>{carData.owneraddress}</p>
                                <p><b>Reg Date : </b>{carData.regDate ? carData.regDate.split("T")[0] : "Not Available"}</p>
                                <button className='btn btn-warning w-100 rounded-0' disabled={loader} onClick={offroadCar}>
                                    {loader ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <span>{onroad ? "UNBLOCK VEHICLE" : "BLACKLIST VEHICLE"}</span>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CarDetails