import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Btn, TranslateButton } from './Button'
import './home.css'
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
} from 'framer-motion'
import { useScroll } from 'framer-motion'
import { useTransform } from 'framer-motion'
import Offer from './Offer'
import Popular from './Popular'
import Footer from './Footer'
import { Nav } from './Nav'
import { useAuth } from '../utils/AuthContext'
import Dashboard from './Dashboard'
import Landingpage from './Landingpage'
import Cartpage from '@/pages/Cartpage'
import { useCart } from '@/utils/CartContext'
//lg - 50p
//sm - 20p
//esm - 15p
const Home = () => {
  const { user, logoutUser } = useAuth()

  const [srollState] = useState(true)

  return (
    <div className="relative">
      <Nav srollState={srollState} />
      
      <div className=" flex flex-col gap-[150px]">
        {!user ? (
          <div className="  min-h-screen h-fit flex justify-center items-center  w-full   ">
            <Landingpage />
          </div>
        ) : (
          <Dashboard />
        )}
        {!user && <Offer />}
        {!user && <Popular />}
      </div>
      
      {/* <motion.div
        onMouseEnter={() => setAnimate(true)}
        onMouseLeave={() => setAnimate(false)}
        className="w-[250px]  overflow-hidden  bg-slate-700   relative h-[60px] my-40 mx-auto"
      >
        <motion.svg
          // initial={{ top: `${animatey ? "-120%" : ""}` }}
          animate={{
            top: `${animatey ? "-15px" : "105%"}`,
            transition: {
              duration: 1,
            },
          }}
          className=" w-full pointer-events-none h-[90px] opacity-60 absolute top-[-15px] "
        >
          <motion.path

            animate={{
              d: `${
                animatey
                  ? `

                  M0 15
                  Q${250 / 2} -10 250 15
                  L250 80
                  Q${250 / 2} 80 0 80
                  LO 80

            `
                  : `

                  M0 15
                  Q${250 / 2} -10 250 15
                  L250 80
                  Q${250 / 2} 100 0 80
                  LO 60


                `
              }`,
            }}
            transition={{
              duration: 1,
            }}
            className=" fill-orange-700  absolute"
          >
            {" "}
          </motion.path>
        </motion.svg>
      </motion.div>  */}
      {/* <div className="w-[200px] overflow-hidden p-0 m-0 relative h-[60px]   border-black my-[100px] mx-auto">
        <motion.div
        whileHover={{
          top:'-100%',
         transition:{
          duration:.5,
          type:"tween"
         }
        }}
        className="h-[120px] w-full top-0 left-0 absolute flex flex-col">
          <div className="w-full  h-[60px] flex justify-center items-center"> text 1 </div>
          <div className="w-full  h-[60px] flex justify-center items-center"> text 1 </div>
        </motion.div>
      </div> */}
          
    </div>
  )
}

export default Home
