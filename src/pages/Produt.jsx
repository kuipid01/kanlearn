import React, { useEffect, useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import { CiCircleCheck } from 'react-icons/ci'
import { Link, useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import Player from '../comp/Player'
import { useAuth } from '../utils/AuthContext'
const Produt = () => {
  const { user } = useAuth()

  const { id } = useParams()
  const [video, setvideo] = useState()
  const [playing, setPlaying] = useState(false)

  const getVideoById = async () => {
    try {
      const videoRef = doc(db, 'videos', id)
      const videoSnapshot = await getDoc(videoRef)

      if (videoSnapshot.exists()) {
        const videoData = { id: videoSnapshot.id, ...videoSnapshot.data() }
        console.log('Video Data:', videoData)
        setvideo(videoData)
        return videoData
      } else {
        console.log('Video not found')
        return null
      }
    } catch (error) {
      console.error('Error fetching video by ID:', error)
      return null
    }
  }
  useEffect(() => {
    getVideoById()
    if (video) {
      const perentageOff = Math.round(
        ((video?.price - video?.newPrice) / video.price) * 100
      )
    }
  }, [])

  const produtDetails = {
    category: 'Tech',
    subategory: 'React',
    title: 'Making react app tuturial on building ',
    desc: 'omple tuturial on building your first react app',
    totalstars: 10,
    totalTimesRated: 3,
    averageStars: null,
    creator: 'stephen adegoke',
    language: 'English',

    scope: ['Be familiar with reat syntax ', 'Create apps that scales'],
    courseImage: '',
    price: 30000,
    newPrice: 5000,
  }
  const fixedNumber = (
    (produtDetails.totalstars / (produtDetails.totalTimesRated * 5)) *
    5
  ).toFixed(1)
  const Average = Math.floor(
    (produtDetails.totalstars / (produtDetails.totalTimesRated * 5)) * 5
  )

  const boxStyle = {
    width: `calc(50% - 10px)`,
    // Add other inline styles as needed
  }

  return (
    <div className="page relative pb-[12vh] min-h-screen">
      <div className=" flex  mt-2 justify-center flex-col gap-2 w-full p-4 h-fit min-h-[50vh] bg-primary-light text-white">
        <div className=" w-[95%] sm:w-4/5 flex gap-3 flex-col mx-auto">
          <div className=" text-gray-300">
            <span className=" font-bold cursor-pointer text-purple-300 ">
              {' '}
              {produtDetails.category}{' '}
            </span>{' '}
            {'>'}{' '}
            <span className=" font-bold cursor-pointer text-purple-300 ">
              {' '}
              {produtDetails.subategory}{' '}
            </span>
          </div>
          <div className="mt-2 relative sm:w-full h-[300px] sm:h-[400px] object-cover lg:hidden">
            <img
              className=" w-full h-full object-cover "
              src={video?.imageUrl}
              alt=""
            />
            <div
              onClick={() => setPlaying(true)}
              className=" cursor-pointer flex justify-center items-center w-20 h-20 rounded-full bg-primary-light absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2"
            >
              <FaPlay className=" text-2xl text-white" />
            </div>
          </div>

          <div className="title">
            <h1 className=" font-bold text-xl sm:text-2xl md:text-3xl ">
              {video?.title}
            </h1>
          </div>
          <p className=" font-light lg:max-w-[70%] text-gray-300 text-lg">
            {video?.desc}
          </p>
          <div className="star items-center flex gap-1">
            <span className=" text-[#FFF501] "> {fixedNumber} </span>
            <>
              <div>
                {Average >= 1 ? (
                  <img src="/filledStar.png" alt="" />
                ) : (
                  <img src="/Star.png" alt="" />
                )}{' '}
              </div>
              <div>
                {' '}
                {Average >= 2 ? (
                  <img src="/filledStar.png" alt="" />
                ) : (
                  <img src="/Star.png" alt="" />
                )}{' '}
              </div>
              <div>
                {' '}
                {Average >= 3 ? (
                  <img src="/filledStar.png" alt="" />
                ) : (
                  <img src="/Star.png" alt="" />
                )}{' '}
              </div>
              <div>
                {' '}
                {Average >= 4 ? (
                  <img src="/filledStar.png" alt="" />
                ) : (
                  <img src="/Star.png" alt="" />
                )}{' '}
              </div>
              <div>
                {' '}
                {Average >= 5 ? (
                  <img src="/filledStar.png" alt="" />
                ) : (
                  <img src="/Star.png" alt="" />
                )}{' '}
              </div>
            </>
            <span className=" text-sm underline text-gray-200 ">
              {' '}
              {produtDetails.totalstars} ratings
            </span>
          </div>
          <div>
            <span> Created by </span>{' '}
            <span className=" text-sm tracking-wider capitalize underline text-gray-200 ">
              {' '}
              {video?.creator || produtDetails.creator}{' '}
            </span>
          </div>
          <div className=" mt-8 flex gap-2 items-center w-full ">
            <h1 className=" text-4xl font-bold">
              {' '}
              #{video?.newPrice || video?.price}{' '}
            </h1>
            <span className=" font-extralight line-through">
              {' '}
              {video?.price}{' '}
            </span>
            <span className=" font-light">
              {' '}
              {Math.round(
                ((video?.price - video?.newPrice) / video?.price) * 100
              ) || 0}{' '}
              % off{' '}
            </span>
          </div>
          <button className=" xl:hidden transition-all hover:bg-gray-900/80 bg-gray-900 w-full h-14 mt-3  text-white text-center">
            {' '}
            Add To Cart{' '}
          </button>
        </div>
      </div>
      <div className="banner  border-gray-500 flex-col hidden lg:flex absolute right-7 min-h-[500px] pb-4 border-2 shadow-xl w-80 p-1 bg-white top-28">
        <div className=" w-full h-fit relative">
          <img
            src={video?.imageUrl}
            className="w-full h-[300px]  object-cover "
            alt=""
          />
          <div
            onClick={() => setPlaying(true)}
            className=" cursor-pointer flex justify-center items-center w-20 h-20 rounded-full bg-primary-light absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2"
          >
            <FaPlay className=" text-2xl text-white" />
          </div>
        </div>
        <div className="p-2 mt-2 flex gap-2 items-center w-full justify-center">
          <h1 className=" text-4xl font-medium"> #{produtDetails.newPrice} </h1>
          <span className=" font-extralight line-through">
            {' '}
            {video?.price}{' '}
          </span>
          <span className=" font-light">
            {' '}
            {Math.round(
              ((video?.price - video?.newPrice) / video?.price) * 100
            ) || 0}{' '}
            % off % off{' '}
          </span>
        </div>
        {user?.uid === video?.user ? (
          <Link
            className="text-white mt-6 bg-primary-light border py-4 border-white w-full  uppercase text-xl font-bold text-center"
            to={`edit/${id}`}
          >
            {' '}
            Edit{' '}
          </Link>
        ) : (
          <div className=" w-full p-2 ">
            <button className=" transition-all hover:bg-primary-light/80 w-full h-11 mt-3 bg-primary-light text-white text-center">
              {' '}
              Add To Cart{' '}
            </button>
            <button className=" transition-all hover:bg-gray-200 w-full h-11 border border-black mt-3 bg-white  text-black">
              {' '}
              Buy Now{' '}
            </button>
          </div>
        )}
      </div>
      <section className="w-[95%] sm:w-4/5 flex gap-3 flex-col mx-auto">
        <div className=" border  p-6 min-h-[30vh] my-10  lg:w-4/6">
          <div className="  rounded   w-full flex flex-col">
            <h1 className=" font-bold text-xl">
              What you would learn from the video
            </h1>

            <div className="flex justify-between flex-wrap gap-[10px]">
              {video?.importance.map((item, i) => (
                <div
                  key={i}
                  style={boxStyle}
                  className=" flex items-start gap-1 mt-5"
                >
                  <div className=" w-4 h-4  rounded-full flex justify-center items-center">
                    <CiCircleCheck />
                  </div>
                  <span className="text-xs">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="desc ">
          <h1 className=" font-bold text-xl">Description</h1>

          <p className=" font-normal mt-3 leading-7 tracking-wide text-[15px] ">
            {video?.longdesc}
          </p>
        </div>
        <div className="desc mt-10">
          <h1 className=" font-bold text-xl">Review</h1>

          <div className=" w-full h-fit flex p-6 mt-3 flex-col border">
            <div className="h-20 flex gap-2">
              <div className=" w-20 h-full">
                <img
                  className=" h-full w-full rounded-full object-cover"
                  src={video?.imageUrl}
                  alt=""
                />
              </div>
              <div className=" flex flex-col justify-between">
                <h1 className=" font-bold ">Sunday Rajab</h1>
                <p className=" text-sm font-light">4 courses</p>
                <p className=" text-sm font-light">5 Reviews</p>
              </div>
            </div>
            <p className=" font-normal mt-3 leading-7 tracking-wide text-[15px] ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium reiciendis maxime odio, molestias voluptatibus
              laudantium quos fuga asperiores eum id corporis dignissimos ipsa
              tempora incidunt ab, eveniet sed, amet laboriosam.CCCC
            </p>
          </div>
        </div>
      </section>
      <div className="bottom-0 lg:hidden mt-11  flex px-2 shadow-2xl border-t border-gray-600  bg-primary-light shadow-black h-[10vh] w-full justify-between items-center fixed">
        <div className=" hidden sm:flex sm:flex-col">
          <div className="title text-white font-normal">
            <h1 className="  text-lg">{video?.title}</h1>
          </div>
          <div className=" flex text-white items-center gap-2">
            <span className=" text-[#FFF501] "> {fixedNumber} </span>
            <img src="/filledStar.png" alt="" />
            <span className=" text-sm underline text-gray-200 ">
              {' '}
              {produtDetails.totalstars} ratings
            </span>
          </div>
        </div>
        {user?.uid === video?.user ? (
          <Link
            className="text-white border py-4 border-white w-fit px-4 uppercase text-xl font-bold text-center"
            to={`edit/${id}`}
          >
            {' '}
            Edit{' '}
          </Link>
        ) : (
          <div className=" w-full sm:w-fit flex justify-center h-full gap-5 items-center">
            <div className=" px-4 sm:px-0  h-4/5 flex flex-col justify-between text-white">
              <h1 className=" text-xl font-bold">
                {' '}
                #{video?.newPrice || 'Free'}{' '}
              </h1>
              <p className=" font-extralight line-through">
                {' '}
                {video?.price || 'Free'}{' '}
              </p>
            </div>
            <button className="flex-1 font-bold sm:flex-0 h-4/5 relative transition-all hover:bg-gray-200 w-fit px-2 border rounded bg-white  text-black">
              {' '}
              Buy Now{' '}
            </button>
          </div>
        )}
      </div>
      {playing && video && (
        <Player
          title={video.title}
          setPlaying={setPlaying}
          url={video.vidUrl}
        />
      )}
    </div>
  )
}

export default Produt
