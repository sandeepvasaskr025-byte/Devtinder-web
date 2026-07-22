import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
    const feed = useSelector((store) => store.feed)
    const dispatch = useDispatch();

    const getFeed = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/feed", {
                withCredentials: true
            })
            dispatch(addFeed(res.data))
        }
        catch (err) {
            console.error("Error fetching feed:", err);
        }

    }
    useEffect(() => {
        if (!feed || !feed.data || feed.data.length === 0) {
            getFeed();
        }
    }, [feed]);
    if (!feed || !feed.data || feed.data.length === 0) {
        return <div>Loading feed...</div>;
    }
    return (

        <div className='flex justify-center mt-1'>
            {/* {feed.data.map((user) => (
                <UserCard key={user._id} user={user} />
            ))} */}
            <UserCard user={feed.data[0]}/>

        </div>)

}

export default Feed