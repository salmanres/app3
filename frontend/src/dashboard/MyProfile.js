import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { backendurl } from '../ServicePage';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

function MyProfile() {
  const [cars, setCars] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [data, setData] = useState({
    registration: "",
    make: "",
    model: "",
    drivername: "",
    drivernumber: "",
    carroute: "",
    departuretime: "",
    arrivaltime: "",
    seatsavailable: "",
    fare: "",
  });
  const [loader, setLoader] = useState(false);
  const driverdata = useSelector((state) => state.driver);

  const fetchData = async () => {
    try {
      const carresponse = await axios.get(`${backendurl}/allcardata`);
      const routeresponse = await axios.get(`${backendurl}/allroutedata`);
      setCars(carresponse.data);
      setRoutes(routeresponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => {
      if (name === 'registration') {
        const selectedCar = cars.find((car) => car.registration === value);
        return {
          ...prevData,
          registration: value,
          make: selectedCar ? selectedCar.make : "",
          model: selectedCar ? selectedCar.model : "",
        };
      }
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async () => {
    setLoader(true);
    try {
      const response = await axios.post(`${backendurl}/addonlinevehicle`, data);
      toast.success(response.data.message);
      console.log(response.data);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchData();
    setData((prevData) => ({
      ...prevData,
      drivername: driverdata.drivername,
      drivernumber: driverdata.drivernumber,
    }));
  }, [driverdata]);

  return (
    <Fragment>
      <ToastContainer />
      <div className='container-fluid g-0 mt-5'>
        <div className='row justify-content-center'>
          <div className='col-lg-5 col-md-6 col-sm-7 col-10 mt-4'>
            <div className="card border-warning mb-3 rounded-0 shadow-sm mt-3">
              <label className='label-2 border-warning w-100 rounded-0 shadow-sm p-2'>DRIVER PROFILE</label>
              <div className="card-body">
                <select className='w-100 d-input pb-2 mb-2' name='registration' value={data.registration} onChange={onChange}>
                  <option value="">Select Car</option>
                  {cars.map((car) => (
                    <option key={car._id} value={car.registration}>{car.registration}</option>
                  ))}
                </select>
                <select className='w-100 pb-2 mb-2 d-input' name='carroute' value={data.carroute} onChange={onChange}>
                  <option value="">Select Route</option>
                  {routes.map((route) => (
                    <option key={route._id}>{route.origin} - {route.destination}</option>
                  ))}
                </select>
                <div className='row'>
                  <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                    <label className='label-2 pb-2 mb-2 w-100 rounded-0 mt-2'>Departure</label>
                    <input type="time" className='w-100 d-input pb-2 mb-2' placeholder="time" name='departuretime' value={data.departuretime} onChange={onChange} />
                  </div>
                  <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                    <label className='label-2 pb-2 mb-2 w-100 rounded-0 mt-2'>Arrival</label>
                    <input type="time" className='d-input pb-2 mb-2 w-100' placeholder="time" name='arrivaltime' value={data.arrivaltime} onChange={onChange} />
                  </div>
                </div>
                <div className='row'>
                  <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                    <select className='w-100 d-input pb-2 mb-2 ' name='seatsavailable' value={data.seatsavailable} onChange={onChange}>
                      <option>Select Seats</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                    </select>
                  </div>
                  <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                    <input type="number" className='w-100 d-input pb-2 mb-2' placeholder="Fare" name='fare' value={data.fare} onChange={onChange} />
                  </div>
                </div>
                <button className='btn btn-warning rounded-0 mt-2 w-100' onClick={handleSubmit} disabled={loader}>
                  {loader ? 'Loading...' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default MyProfile;
