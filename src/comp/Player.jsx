import React, { useState } from 'react'
import { IoIosClose } from 'react-icons/io'

const Player = ({ url, title, setPlaying }) => {
    const [speed, setSpeed] = useState(1);

    const handleSpeedChange = (newSpeed) => {
      setSpeed(newSpeed);
    };
  return (
    <div className="w-full flex flex-col text-white gap-4 justify-center items-center z-30 fixed top-0 left-0 min-h-screen h-fit bg-primary-light">
      <IoIosClose
        onClick={() => setPlaying(false)}
        className="absolute cursor-pointer right-5 top-5 text-4xl text-red-600"
      />
      <p>{title}</p>
      <div className="flex bg-red-300 w-[400px] h-[400px]">
        <video className="w-full h-full" controls playbackRate={speed} autoPlay src={url}></video>
      </div>
      <div className=' items-center flex gap-3'>
        <label>Playback Speed: {speed}x</label>
        <button className='p-1 bg-white  rounded text-primary-light px-3' onClick={() => handleSpeedChange(0.5)}>0.5x</button>
        <button className='p-1 bg-white  rounded text-primary-light px-3' onClick={() => handleSpeedChange(1)}>1x</button>
        <button className='p-1 bg-white  rounded text-primary-light px-3' onClick={() => handleSpeedChange(1.5)}>1.5x</button>
        <button className='p-1 bg-white  rounded text-primary-light px-3' onClick={() => handleSpeedChange(2)}>2x</button>
      </div>
    </div>
  )
}

export default Player
