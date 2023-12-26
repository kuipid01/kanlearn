import React, { useRef } from 'react'
import { TranslateButton } from './Button'
import { useInView } from 'framer-motion'
import { motion } from 'framer-motion'
const Offer = () => {
  const divRef = useRef(null)
  const isInView = useInView(divRef, {
    amount: 0.2,
    once: true,
  })

  const textAnim = {
    initial: {
      clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
      y: 200,
      rotateZ: '10deg',
      x: -50,
      opacity: 0,
    },
    animate: {
      clipPath: 'polygon(0 0, 100% 0%, 100% 100%, 0% 100%)',
      y: 0,
      rotateZ: '0deg',
      x: 0,
      opacity: 1,
    },
  }
  const imgAnim = {
    initial: {
      clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',

      opacity: 0,
      rotateZ: '2deg',
      x: -10,
    },
    animate: {
      clipPath: 'polygon(0 0, 100% 0%, 100% 100%, 0% 100%)',
      x: 0,
      rotateZ: '0deg',
      opacity: 1,
    },
  }
  return (
    <div ref={divRef} className="w-[90%]  mx-auto  min-h-screen">
      <small className=" uppercase font-medium">What we offer</small>
      <div className=" mt-4 mb-[50px] flex items-center justify-between">
        <motion.h1
          variants={textAnim}
          initial="initial"
          animate={isInView ? 'animate' : 'initial'}
          transition={{
            duration: 1,
            type: 'linear',
          }}
          className="text-[35px]   md:w-1/2 leading-[100%] font-[400] md:text-[50px]"
        >
          Unlock Your Potential. Learn, Share, and Grow.
        </motion.h1>
        <div className="w-fit hidden md:flex h-fit pb-1 border-b-2 border-black">
          <TranslateButton
            width={220}
            height={35}
            img="/arrow.svg"
            text={'Learn more about us '}
          />
        </div>
      </div>

      <div className="flex  flex-col md:flex-row h-fit  md:h-[60vh] gap-10 md:gap-[100px]">
        <motion.div
          variants={imgAnim}
          initial="initial"
          animate={isInView ? 'animate' : 'initial'}
          transition={{
            duration: 1,
            delay: 0.5,
            type: 'linear',
          }}
          className=" h-[50vh] bg-red-300 md:flex-1  md:h-full"
        >
          <img
            className=" rounded-md w-full h-full object-cover"
            src="/s.jpg"
            alt=""
          />
        </motion.div>
        <div className=" h-1/2 md:flex-1 md:h-full  flex flex-col gap-5 md:gap-0 justify-between">
          <div className="flex flex-col gap-4">
            <motion.small
              variants={imgAnim}
              initial="initial"
              animate={isInView ? 'animate' : 'initial'}
              transition={{
                duration: 1,
                delay: 0.5,
                type: 'linear',
              }}
              className=" uppercase font-bold"
            >
              What we offer
            </motion.small>
            <motion.p
              variants={imgAnim}
              initial="initial"
              animate={isInView ? 'animate' : 'initial'}
              transition={{
                duration: 0.5,
                delay: 1,
                type: 'linear',
              }}
              className="font-light w-full md:w-[90%] text-gray-500 md:leading-[120%] leading-[40px] text-[18px]"
            >
              Dive deep into specific topics with curated courses led by
              industry experts. Get personalized feedback, participate in live
              Q&A sessions, and collaborate with fellow learners on real-world
              projects. Hone your skills and become a true master in your chosen
              field.
            </motion.p>
          </div>
          <div className="flex flex-col gap-4">
            <motion.small
              variants={imgAnim}
              initial="initial"
              animate={isInView ? 'animate' : 'initial'}
              transition={{
                duration: 1,
                delay: 0.5,
                type: 'linear',
              }}
              className=" uppercase font-bold"
            >
              What we offer
            </motion.small>
            <motion.p
              variants={imgAnim}
              initial="initial"
              animate={isInView ? 'animate' : 'initial'}
              transition={{
                duration: 0.5,
                delay: 1,
                type: 'linear',
              }}
              className="font-light w-full md:w-[90%] text-gray-500 md:leading-[120%] leading-[40px] text-[18px]"
            >
              Connect with learners and creators from around the globe. Share
              your work, offer constructive feedback, participate in challenges,
              and build meaningful connections. Learn from each other, co-create
              projects, and push the boundaries of knowledge together.
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Offer
