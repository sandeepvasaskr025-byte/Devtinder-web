import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../utils/requestSlice'

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.request)
    const reviewRequest = async (status, _id) => {
        try {
            const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, {
                withCredentials: true
            });
            dispatch(removeRequest(_id))
        } catch (error) {
            console.error(error);
        }
    }
    const fetchRequest = async (req, res) => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", {
                withCredentials: true
            })
            dispatch(addRequest(res.data.data))
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    }
    useEffect(() => {
        fetchRequest();
    }, [])
    if (!requests) return;
    if (requests.length === 0) return <h1>No Connections Found</h1>
    return (
        <div className='my-2.5 flex flex-col'>
            <h1 className='text-2xl font-bold text-center'>Connections Request</h1>
            {requests.map((connection) => {
                const { fromUserId } = connection;
                return (
                    <div key={connection._id} className='bg-base-300 flex justify-between items-center m-4 p-4 w-1/2 mx-auto'>
                        <div>
                            <img className='h-26 w-26 rounded-full' alt='photo' src={fromUserId.photoUrl} />
                        </div>
                        <div className=''>
                            <h1 className='text-2xl'>{fromUserId.firstName + " " + fromUserId.lastName}</h1>
                            <p>{fromUserId.about}</p>
                        </div>
                        <div className=''>
                            <button className="btn btn-dash btn-success m-1"
                                onClick={() => reviewRequest("accepted", connection._id)}>Accept</button>
                            <button className="btn btn-dash btn-secondary"
                                onClick={() => reviewRequest("rejected", connection._id)}>Reject</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Requests