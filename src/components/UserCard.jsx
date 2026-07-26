import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, about, age, gender } = user;
  const handleSendRequest = async (status, _id) => {
    const response = await axios.post(BASE_URL + "/request/send/" + status + "/" + _id, {}, {
      withCredentials: true
    })
    console.log(response)
    dispatch(removeFeed(_id))
  }
  return (
    <div className="card bg-base-300 w-94 shadow-sm">
      <figure>
        <img
          className="w-45 h-45 object-cover"
          src={user.photoUrl}
          alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{age + "," + gender}</p>
        <p>{about}</p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
          <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", _id)}>Interest</button>
        </div>
      </div>
    </div>
  )
}

export default UserCard