import React from 'react'
import { delay, motion } from 'framer-motion'
import { IoClose } from 'react-icons/io5'
const Cartitem = ({ item, index, removeCartItem }) => {
  const { price, title, imageUrl:thumbnail, id } = item

  const itemAnim = {
    initial: {
      x: 50,
      opacity: 0,
      
    },
    animation: (id) => ({
      x: 0,
      opacity: 1,

      transition: {
        delay: 0.3 + id * 0.1,
        duration: 0.5,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  }

  return (
    <motion.div
      variants={itemAnim}
      initial="initial"
      animate="animation"
      custom={id}
      className="w-full   relative flex justify-between p-1 border h-[80px] rounded shadow "
    >
      <img src={thumbnail} className=" h-full w-[100px] object-cover" alt="" />

      <div className=" flex mr-6 flex-col justify-between">
        <h1 className=" capitalize">{title}</h1>
        <p className=" font-bold text-3xl">{` £${price}  `} </p>
      </div>
      <div
        onClick={() => removeCartItem(id)}
        className=" cursor-pointer absolute top-0 right-0  bg-red-400 w-6 h-6 flex justify-center items-center"
      >
        <IoClose className="text-white" />
      </div>
    </motion.div>
  )
}

export default Cartitem
