import React, { useRef } from 'react'
import { IoMdBook } from "react-icons/io";
import { MdStar } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import './card.css'
import { motion } from "framer-motion";
import { useInView } from 'framer-motion';
const Card = ({item}) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef,{
      amount: .2, once:true
    });
    const textAnim = {
        initial: {
         opacity:0,
        x:-10
        },
        animate: {
           x:0,
          opacity: 1,
        },
      };
      const imgAnim = {
        initial: {
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          x: 50,
          opacity: 0,
          rotateZ: "2deg",
          x: -10,
        },
        animate: {
          clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0% 100%)",
          x: 0,
          rotateZ: "0deg",
          opacity: 1,
          x: 0,
        },
      };
    const {title,image, category ,price ,user, average_rating} = item
   return (
    <div  ref={cardRef} className=' card shadow-md shadow-gray-400 bg-white  h-[500px] p-2 rounded-lg flex flex-col justify-between'>
        <motion.img variants={imgAnim}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          transition={{
            duration: 1,
          
            type: "linear",
          }} src={image} className='w-full rounded-lg h-1/2 object-cover' alt="" />
        <motion.div variants={textAnim}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          transition={{
            duration: 1,
            type: "linear",
          }} className='  items-center flex justify-between w-full'>
            <div className='py-1 px-2 bg-purple-200  flex items-center gap-2  rounded-lg'>
                <img src={image} className='w-3 h-3 rounded-full' alt="" />
                <span className='text-purple-500 text-sm font-bold'> {category} </span>
             </div>
             <div className='py-1 flex items-center gap-1 px-2 bg-primary-light text-white text-sm rounded-md'>
             <CiStar className= '' />
                <span>{average_rating}</span>
             </div>
        </motion.div>
        <motion.h1  variants={textAnim}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          transition={{
            duration: 1,
            type: "linear",
            delay:.5
          }} className=' w-[95%] text-3xl'>{title} </motion.h1>
        <div  style={{
            boxShadow:'0px 4px 5px 0px rgba(0,0,0,0.35)'
        }} className='items-center px-3 pb-3 flex justify-between w-full text-purple-500 text-sm font-bold'>
            <div className='py-1 px-2 bg-purple-200  flex items-center gap-2  rounded-lg' >
            <IoMdBook />
            <span>20 courses</span>   
            </div>
            <div className='py-1 px-2 bg-purple-200  flex items-center gap-2  rounded-lg' >
            <MdStar />
            <span>140 Students</span>   
            </div>
        </div>
        <div className='items-center mt-4 px-3 pb-3 flex justify-between w-full  '>
        <span className='  my-auto text-3xl'>${price} </span>
        <div className='flex gap-2'>
            <img className='w-6 h-6 rounded-full object-cover' src={user.avartar} alt="" />
            <span> { user.name} </span>
        </div>
        </div>
    </div>
  )
}

export default Card