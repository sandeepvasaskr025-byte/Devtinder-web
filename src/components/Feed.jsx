import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants';
import { addFeed, removeFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
    const feed = useSelector((store) => store.feed)
    const dispatch = useDispatch();
    const getFeed = async () => {
        if (feed?.data?.length > 0) return;
        try {
            const res = await axios.get(BASE_URL + "/feed", {
                withCredentials: true
            });
            dispatch(addFeed(res.data))
        }
        catch (err) {
            console.error("Error fetching feed:", err);
        }

    }
    useEffect(() => {
        getFeed();
    }, []);

    console.log(feed)
    if (!feed?.data || feed.data.length === 0) {
        return <h1>No users found</h1>;
    }

    return (

        <div className='flex justify-center mt-1'>
            <UserCard user={feed.data[0]} />
        </div>)

}

export default Feed