import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [showToast, setShowToast] = useState(false)
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const saveProfile = async () => {
        try {
            const res = axios.put(BASE_URL + "/profile/edit", {
                firstName, lastName, age, gender, photoUrl, about
            }, {
                withCredentials: true
            })
            dispatch(addUser((await res).data.data));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000)
        } catch (err) {
            setError(err.message)
        }
    }
    return (

        <>
            <div className='flex justify-center'>
                <div className='flex justify-center mx-1'>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                        <legend className="fieldset-legend">Edit Profile</legend>

                        <label className="label">FirstName</label>
                        <input type="text" value={firstName} className="input" placeholder="FirstName"
                            onChange={(e) => setFirstName(e.target.value)} />
                        <label className="label">LastName</label>
                        <input type="text" value={lastName} className="input" placeholder="LastName"
                            onChange={(e) => setLastName(e.target.value)} />
                        <label className="label">photoUrl</label>
                        <input type="text" value={photoUrl} className="input" placeholder="photo"
                            onChange={(e) => setPhotoUrl(e.target.value)} />
                        <label className="label">Age</label>
                        <input type="number" value={age} className="input" placeholder="Age"
                            onChange={(e) => setAge(e.target.value)} />
                        <label className="label">Gender</label>
                        <input type="text" value={gender} className="input" placeholder="Gender"
                            onChange={(e) => setGender(e.target.value)} />
                        <label className="label">About</label>
                        <input type="text" value={about} className="input" placeholder="About"
                            onChange={(e) => setAbout(e.target.value)} />
                        <p className='text-red-500'>{error}</p>
                        <button className="btn btn-neutral mt-4" onClick={saveProfile}>SaveProfile</button>
                    </fieldset>
                </div>
                <div className='mt-4'>
                    <UserCard user={{ firstName, lastName, age, gender, photoUrl, about }} />
                </div>
            </div>
            {showToast&&<div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Profile updated successfully.</span>
                </div>
            </div>}
        </>
    )
}

export default EditProfile