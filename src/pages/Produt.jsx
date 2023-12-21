import React from 'react'
import { FaPlay } from 'react-icons/fa'
const Produt = () => {
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

  const perentageOff = Math.round(
    ((produtDetails.price - produtDetails.newPrice) / produtDetails.price) * 100
  )
  console.log(perentageOff)
  return (
    <div className="page relative min-h-screen">
      <div className=" flex  mt-2 justify-center flex-col gap-2 w-full p-4 h-fit min-h-[50vh] bg-primary-light text-white">
        <div className=" w-4/5 flex gap-3 flex-col mx-auto">
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
          <img
            className=" sm:w-full h-[400px] object-cover lg:hidden"
            src="/student1.jpg"
            alt=""
          />

          <div className="title">
            <h1 className=" font-bold text-3xl">{produtDetails.title}</h1>
          </div>
          <p className=" font-light text-lg">{produtDetails.desc}</p>
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
              {produtDetails.creator}{' '}
            </span>
          </div>
          <div className=" mt-8 flex gap-2 items-center w-full ">
            <h1 className=" text-4xl font-bold">
              {' '}
              #{produtDetails.newPrice}{' '}
            </h1>
            <span className=" font-extralight line-through">
              {' '}
              {produtDetails.price}{' '}
            </span>
            <span className=" font-light"> {perentageOff} % off </span>
          </div>
          <button className=" xl:hidden transition-all hover:bg-gray-900/80 bg-gray-900 w-full h-14 mt-3  text-white text-center">
            {' '}
            Add To Cart{' '}
          </button>
        </div>
      </div>
      <div className="banner hidden xl:flex absolute right-7 min-h-[500px] pb-4 border shadow-xl w-80 p-1 bg-white top-28">
        <div className=" w-full h-fit relative">
          <img
            src="/student1.jpg"
            className="w-full h-[300px]  object-cover "
            alt=""
          />
          <div className=" cursor-pointer flex justify-center items-center w-20 h-20 rounded-full bg-primary-light absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2">
            <FaPlay className=" text-2xl text-white" />
          </div>
        </div>
        <div className="p-2 mt-2 flex gap-2 items-center w-full justify-center">
          <h1 className=" text-4xl font-medium"> #{produtDetails.newPrice} </h1>
          <span className=" font-extralight line-through">
            {' '}
            {produtDetails.price}{' '}
          </span>
          <span className=" font-light"> {perentageOff} % off </span>
        </div>
        <div className=" w-full p-2 ">
          <button className=" transition-all hover:bg-primary-light/80 w-full h-11 mt-3 bg-primary-light text-white text-center">
            {' '}
            Add To Cart{' '}
          </button>
          <button className=" transition-all hover:bg-gray-200 w-full h-11 border border-black mt-3 bg-white  text-black">
            {' '}
            Add To Cart{' '}
          </button>
        </div>
      </div>
      <div className="bottom-0 justify-between items-center fixed">

      </div>
    </div>
  )
}

export default Produt
