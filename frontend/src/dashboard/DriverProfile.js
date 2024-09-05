import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { backendurl } from '../ServicePage';
import { useParams } from 'react-router-dom';

function DriverProfile() {
    const { id } = useParams();
    const [driverData, setDriverData] = useState({});
    const [loader, setLoader] = useState(false);
    const [blacklisted, setBlacklisted] = useState(false);

    const getSingleDriverData = async () => {
        try {
            const response = await axios.get(`${backendurl}/getsingledriverdata/${id}`);
            setDriverData(response.data);
            setBlacklisted(response.data.blacklisted); // Set initial blacklisted state
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const blacklistDriver = async () => {
        setLoader(true);
        try {
            const response = await axios.patch(`${backendurl}/blacklistdriver/${id}`, { blacklisted: !blacklisted });
            setBlacklisted(!blacklisted); // Toggle blacklisted state
            console.log(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        getSingleDriverData();
    }, []);

    return (
        <Fragment>
            <div className='container-fluid g-0 mt-5'>
                <div className='row justify-content-center'>
                    <div className='col-lg-4 col-md-5 col-sm-6 col-9 mt-5'>
                        <div className="card border-warning mb-3 rounded-0 shadow-sm mt-2">
                            <label className='label-2 border-warning w-100 rounded-0 shadow-sm p-2'>DRIVER PROFILE</label>
                            <div className="card-body">
                                <div className='d-flex justify-content-center mb-3 mt-1'>
                                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt='profile-pic' width={70} />
                                </div>
                                <p className='card-text mb-0 border-bottom pb-1'><b>Id : </b>{driverData._id}</p>
                                <p className='card-text mb-0 border-bottom pb-1'><b>Name : </b>{driverData.drivername}</p>
                                <p className='card-text mb-0 border-bottom pb-1'><b>Mobile : </b>{driverData.drivernumber}</p>
                                <p className='card-text mb-0 border-bottom pb-1'><b>Licence No : </b>{driverData.driverlicence}</p>
                                <p className='card-text mb-0 border-bottom pb-1'><b>Aadhar No : </b>{driverData.driveraadhar}</p>
                                <p className='card-text mb-0 border-bottom pb-1'><b>Address : </b>{driverData.driveraddress}</p>
                                <p><b>Reg Date : </b>{driverData.driverRegDate ? driverData.driverRegDate.split("T")[0] : "Not Available"}</p>
                                <button className='btn btn-warning w-100 rounded-0' onClick={blacklistDriver} disabled={loader}>
                                    {loader ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <span>{blacklisted ? "UNBLOCK DRIVER" : "BLACKLIST DRIVER"}</span>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default DriverProfile;
