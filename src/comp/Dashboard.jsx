import React from 'react'
import { useAuth } from '../utils/AuthContext'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const { user, logoutUser } = useAuth()
  console.log(user)
  return (
    <div className=' w-full'>
      <div className="w-full  page min-h-fit bg-purple-200 ">
        <div className="flex flex-col-reverse md:w-[80%] w-[95%] h-fit py-10  mx-auto  md:flex-row items-center gap-5 justify-between">
          <div className="md:bg-[#fff] p-5 rounded-md">
            <h1 className="text-4xl">
              <span className=" mr-4 text-primary-light uppercase font-medium">
                Welcome
              </span>
              {user?.displayName}
            </h1>
            <p
              className=" 
               mt-3 text-lg md:text-2xl capitalize text-primary-light"
            >
              Get two videos for the price of one
            </p>
          </div>

          <img className="w-5/6 border md:w-1/2 h-[350px]" src="./image.svg" alt="" />
        </div>
      </div>
      <div className="flex mt-[100px]  gap-4 justify-center items-center">
        <Link to='add'  className=" uppercase cursor-pointer border shadow-xl border-gray-300 font-medium w-fit bg-white rounded-[20px]  h-fit p-5">
          Add a video
        </Link >
        <Link to='edit' className=" uppercase cursor-pointer border shadow-xl border-gray-300 font-medium w-fit bg-white rounded-[20px] flex gap-4 justify-center items-center h-fit p-5">
          Edit profile
        </Link >
      </div>
    </div>
  )
}

export default Dashboard
