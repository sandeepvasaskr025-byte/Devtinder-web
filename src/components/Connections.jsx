import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { connect, useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {
    const dispatch = useDispatch();
    const connection = useSelector((state) => state.connections)
    const fetchConnection = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connection", {
                withCredentials: true
            })
            dispatch(addConnections(res.data.data))
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        fetchConnection();
    }, [])
    if (!connection) return;
    if (connection.length === 0) return <h1>No Connections Found</h1>
    return (
        <div className='my-2.5 flex flex-col'>
            <h1 className='text-2xl font-bold text-center'>Connections</h1>
            {connection.map((connection) => {
                const { firstName, lastName, photoUrl,about } = connection;
                return (
                    <div className='my-5 bg-base-300 w-1/2 mx-auto flex'>
                        <div>
                            <img className='h-26 w-26' alt='photo' src={photoUrl} />
                        </div>
                        <div className='ml-10 p-1'>
                            <h1 className='text-2xl'>{firstName + " " + lastName}</h1>
                            <p>{about}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Connections