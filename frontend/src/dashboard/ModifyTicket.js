import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import { backendurl } from '../ServicePage';
import { useNavigate, useParams } from 'react-router-dom';

function ModifyTicket() {
    const { id } = useParams();
    const [ticketData, setTicketData] = useState([]);
    const navigate = useNavigate();

    const getTickeetData = async () => {
        try {
            const response = await axios.get(`${backendurl}/getticketdata/${id}`);
            setTicketData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const updateInput = (event) => {
        const { name, value } = event.target;
        setTicketData((e) => {
            return {
                ...e,
                [name]: value
            }
        })
    };

    const updateTicket = async () => {
        try {
            const response = await axios.patch(`${backendurl}/modifyticket/${id}`, ticketData);
            console.log(response.data);
            navigate("/home/myticket");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getTickeetData();
    }, []);

    return (
        <Fragment>
            <div className='container-fluid g-0 mt-5'>
                <div className='row justify-content-center'>
                    <div className='col-lg-4 col-md-5 col-sm-6 col-10 mt-5 mb-5'>
                        <div className="card border-warning mb-3 shadow-sm g-0 p-0">
                            <label className='label-2 rounded-bottom-0'>EDIT TICKET DETAILS</label>
                            <div className="card-body">
                                <label className='form-label label-tag'>Pickup</label>
                                <input type="text" className='form-control d-input' placeholder='Pickup Location' value={ticketData.pickup} name="pickup" onChange={updateInput} disabled />
                                <label className='form-label label-tag'>Drop</label>
                                <input type="text" className='form-control  d-input' placeholder='Drop Location' value={ticketData.drop} name="drop" onChange={updateInput} disabled />
                                <label className='form-label label-tag'>Seats</label>
                                <input type="text" className='form-control  d-input' placeholder='Seats' value={ticketData.seats} name="seats" onChange={updateInput} disabled />
                                <label className='form-label label-tag'>Date</label>
                                <input type="date" className='form-control  d-input' name="date" />
                                <button className='btn btn-warning w-100 mt-3' onClick={updateTicket}>UPDATE TICKET</button>
                                <label className='disclaimer px-1 mt-3'><b>Note : </b> Once ticket is booked, you can modify date only!</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ModifyTicket