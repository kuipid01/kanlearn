import React, { useEffect, useState } from 'react'
import { useAuth } from '../utils/AuthContext'
import { Link } from 'react-router-dom'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'

const Dashboard = () => {
  const { user, logoutUser } = useAuth()
  const [data, setData] = useState([])
  console.log(data)
  const getDoc = async () => {
    try {
      const q = query(collection(db, 'videos'), where('user', '==', user.uid))
      const querySnapshot = await getDocs(q)
  
      const newData = []
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        newData.push({ id: doc.id, ...doc.data() }); // Fix the syntax here
      })
  
      setData(newData);
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    getDoc();
  }, []);
  
  return (
    <div className=" w-full">
      <div className="w-full  pt-[10vh] min-h-fit bg-purple-200 ">
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

          <img
            className="w-5/6 border md:w-1/2 h-[350px]"
            src="./image.svg"
            alt=""
          />
        </div>
      </div>
      <div className="flex mt-[100px]  gap-4 justify-center items-center">
        <Link
          to="add"
          className=" uppercase cursor-pointer border shadow-xl border-gray-300 font-medium w-fit bg-white rounded-[20px]  h-fit p-5"
        >
          Add a video
        </Link>
        <Link
          to="edit"
          className=" uppercase cursor-pointer border shadow-xl border-gray-300 font-medium w-fit bg-white rounded-[20px] flex gap-4 justify-center items-center h-fit p-5"
        >
          Edit profile
        </Link>
      </div>
      <div className="w-[90%] mx-auto my-[100px]">
        <h1 className=' text-2xl'>Your Uploads</h1>
        <p className='mt-5 uppercase border border-primary-light w-fit p-2 rounded-lg bg-primary-light text-white font-bold mb-5'>Videos Uploaded : {data.length}</p>
        <div className=' flex gap-3 flex-wrap justify-center items-center'>
          {data?.map((item, i) => (
            <Link className=' hover:bg-gray-100 transition-all hover:scale-[0.99] w-full  gap-3 p-5 flex flex-col border  shadow rounded-lg shadow-primary-light h-fit md:w-1/4' key={item} to={`/course/${item?.id}`} >
                <img className='h-[150px] w-full object-cover ' src={item?.imageUrl} alt="" />
                <h1 className='text-base capitalize font-bold text-gray-900'>{item?.title} fghjcoc ciwcw</h1>
                <p className='text-sm'>
                  {item.desc.slice(0,100)}
                </p>
            </Link >
          ))}
        </div>
      </div>
      {}
    </div>
  )
}

export default Dashboard
