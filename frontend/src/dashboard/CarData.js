import axios from 'axios';
import React, { Fragment, useState } from 'react';
import { backendurl } from '../ServicePage';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function CarData() {
  const [carData, setCarData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loader, setLoader] = useState(false);

  const getCarData = async () => {
    if (keyword.trim() === "") {
      toast.error("Please enter a registration number to search.");
      return;
    }

    setLoader(true);
    try {
      const response = await axios.get(`${backendurl}/cardata`, {
        params: { registration: keyword }
      });
      if (response.data.status !== 404) {
        setCarData(response.data);
        console.log(response.data);
      } else {
        toast.error("Vehicle not found!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Vehicle not found!");
    } finally {
      setLoader(false);
    }
  };

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  return (
    <Fragment>
      <div className='container-fluid g-0 mt-5'>
        <div className='row justify-content-center'>
          <div className='col-lg-4 col-md-5 col-sm-6 col-9 mt-4'>
            <input
              type="text"
              className='form-control rounded-0 d-input shadow-none p-2 mb-3 mt-1'
              placeholder="Registration Number"
              name="registration"
              value={keyword}
              onChange={handleChange}
            />
            <button className='btn btn-warning rounded-0 w-100' onClick={getCarData}>
              {loader ? <span className='spinner-border spinner-border-sm'></span> : "SEARCH VEHICLE"}
            </button>
            {carData.length > 0 ? (
              carData.map((data) => {
                return (
                  <div className='card-1' key={data._id}>
                    <Link to={`/admin/cardetails/${data._id}`}>
                      <b>{data.registration}</b><br />
                      {data.ownername}
                    </Link>
                  </div>
                )
              })
            ) : null}
          </div>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
}

export default CarData;
