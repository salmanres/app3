import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { backendurl } from '../ServicePage';
import { Link } from 'react-router-dom';

function BlockDriver() {
    const [loader, setLoader] = useState(false);
    const [driverData, setDriverData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [keyword, setKeyword] = useState("");

    const getData = async () => {
        try {
            const response = await axios.get(`${backendurl}/getdriverdata`);
            setDriverData(response.data);
            setFilteredData(response.data); // Initialize filteredData with the full list
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        const results = driverData.filter(driver =>
            driver.drivername.toLowerCase().includes(keyword.toLowerCase())
        );
        setFilteredData(results);
    }, [keyword, driverData]);

    const handleChange = (event) => {
        setKeyword(event.target.value);
    };

    return (
        <Fragment>
            <div className='container-fluid g-0 mt-5'>
                <div className='row justify-content-center'>
                    <div className='col-lg-5 col-md-6 col-sm-7 col-9 mt-4 mb-5'>
                        <input
                            type="text"
                            className='form-control rounded-0 d-input shadow-none p-2 mb-1'
                            placeholder="Search by Name/Mobile"
                            name="keyword"
                            value={keyword}
                            onChange={handleChange}
                        />
                        {filteredData.length > 0 ? (
                            filteredData.map((data) => (
                                <div className='card-1' key={data._id}>
                                    <Link to={`/admin/driverprofile/${data._id}`}>
                                        <b>{data.drivername}</b><br />
                                        {data.drivernumber}<br />
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

export default BlockDriver;
