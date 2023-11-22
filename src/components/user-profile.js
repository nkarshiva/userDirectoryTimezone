import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Clock from './clock';
import Post from "./user-post"
import PostPopup from './post-popup';
import { getUser, getPosts, getCountries } from '../services/api';

const UserProfile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [currentTime, setCurrentTime] = useState(0);
    const [pausedTime, setPausedTime] = useState(0);
    const [isClockPaused, setIsClockPaused] = useState(true);
    const [selectedTimeZone, setSelectedTimeZone] = useState('');
    const [selectedPost, setSelectedPost] = useState(null);


    const getUserPosts = async () => {
        let user_posts = await getPosts(userId)
        setPosts(user_posts)
    }

    const getUserData = async () => {
        let user_data = await getUser(userId)
        setUser(user_data)
    }

    const getCountryList = async () => {
        let countries = await getCountries()
        setCountries(countries)
    }

    const fetchTime = (area, location, region = "") => {
        fetch(`http://worldtimeapi.org/api/timezone/${area}/${location}/${region}`)
            .then(response => response.json())
            .then(data => {
                const timestamp = new Date(data.utc_datetime).getTime() / 1000;
                setCurrentTime(timestamp);
                setPausedTime(timestamp);
                setSelectedTimeZone(data.timezone);
            })
            .catch(error => console.error('Error fetching time:', error));
    };

    const handlePauseToggle = () => {
        if (isClockPaused) {
            // Resume the clock from the paused time
            setPausedTime(currentTime);
        }
        setIsClockPaused(prevState => !prevState);

    };

    const handleCountryChange = event => {
        const selectedCountry = event.target.value;
        setSelectedCountry(selectedCountry);
        if (selectedCountry.split('/').length === 3) {
            const [area, location, region] = selectedCountry.split('/');
            fetchTime(area, location, region);
        }
        if (selectedCountry.split('/').length === 2) {
            const [area, location] = selectedCountry.split('/');
            fetchTime(area, location);
        }

    };

    useEffect(() => {
        getUserPosts()
        getUserData()
        getCountryList()
        fetchTime('Africa', 'Abidjan');
    }, [userId]);

    useEffect(() => {
        let interval;
        // Start the clock
        if (!isClockPaused) {
            interval = setInterval(() => {
                setCurrentTime(prevTime => prevTime + 1);
            }, 1000);
        }

        // Clear the interval when the component is unmounted
        return () => clearInterval(interval);
    }, [isClockPaused]);

    const handlePostClick = post => {
        setSelectedPost(post);
    };

    const handleClosePopup = () => {
        setSelectedPost(null);
    };

    const TimerToggleButton = () => (
        <button onClick={handlePauseToggle} className='bg-[#32cd32] p-2 w-[100px] rounded-[5px]'>
            {isClockPaused ? 'Start' : 'Pause'}
        </button>
    )

    return (
        <>
            {
                userId ?
                    <div className='flex flex-col gap-y-5 mx-5'>
                        <div className='flex flex-col sm:flex-row gap-y-5 justify-center items-center sm:justify-between'>
                            <Link to="/"><button className='bg-[#CFE1F3] border-[2px] border-black p-1 rounded-[5px] w-[100px]'>Back</button></Link>
                            <div className='flex flex-row justify-center gap-x-[10px]'>
                                <select value={selectedCountry} className='border-black border-[2px] rounded-[5px] w-[200px] sm:w-[300px]' onChange={handleCountryChange}>
                                    {countries.map((country, index) => (
                                        <option key={index} value={country}>
                                            {country}
                                        </option>
                                    ))}
                                </select>
                                <Clock currentTime={currentTime} pausedTime={pausedTime} selectedTimeZone={selectedTimeZone} isClockPaused={isClockPaused} />
                                <div className='hidden sm:block'>
                                    <TimerToggleButton />
                                </div>
                            </div>
                            <div className='block sm:hidden'>
                                <TimerToggleButton />
                            </div>
                        </div>
                        <div className=' border-[2px] border-black rounded-[20px] p-[10px]'>
                            <div className='flex flex-col gap-y-[10px]'>
                                <div className='flex flex-col sm:flex-row gap-y-[10px] justify-between'>
                                    <p>Name: {user?.name}</p>
                                    <p>Address: {`${user?.address.suite}, ${user?.address.street}, ${user?.address.city}-${user?.address.zipcode}`}</p>
                                </div>
                                <div className='flex flex-col sm:flex-row gap-y-[10px] justify-between'>
                                    <p>Username: {user?.username}</p>
                                    <p>Email | Phone: {`${user?.email} | ${user?.phone}`}</p>
                                </div>
                            </div>
                        </div>
                        {
                            posts.length > 0 ?
                                <div className='grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-5 place-items-center'>
                                    {posts.map((post, index) => (
                                        <div key={index}>
                                            <Post title={post.title} body={post.body} onPostClick={handlePostClick} />
                                        </div>

                                    ))}
                                    <PostPopup selectedPost={selectedPost} handleClosePopup={handleClosePopup} />
                                </div>
                                :
                                null
                        }
                    </div >
                    :
                    <p>loading...</p>
            }
        </>

    );
};

export default UserProfile;
