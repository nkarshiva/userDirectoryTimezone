import React from 'react'

const Clock = ({ currentTime, pausedTime, selectedTimeZone, isClockPaused, }) => {

    const formatTime = () => {
        const date = new Date((isClockPaused ? pausedTime : currentTime) * 1000);
        const options = {
            timeZone: selectedTimeZone,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };
    return (
        <>
            {
                currentTime ?
                    <div className='bg-black p-2 rounded-[10px] w-[150px] sm:w-[200px] flex justify-center'>
                        <p className=' text-white'>{formatTime()}</p>
                    </div>
                    :
                    null
            }
        </>

    )
}

export default Clock