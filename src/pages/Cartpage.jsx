import Cartitem from '@/comp/Cartitem'
import { useCart } from '@/utils/CartContext'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { IoClose } from 'react-icons/io5'
import { Link } from 'react-router-dom'
const Cartpage = ({ cart, setCart }) => {
  const removeCartItem = (id) => {
    // Create a new cart array excluding the item with the specified id
    const newCart = cart.filter((item) => item.id !== id);
  
    // Update the cart state
    setCart(newCart);
  
    // Update the local storage
    localStorage.setItem('CART', JSON.stringify(newCart));
  };
  
  const {  setCartOpen } = useCart()
  return (
    <motion.div
      initial={{
        translateX: '50px',
        opacity: 0,
      }}
      animate={{
        translateX: '0',
        opacity: 1,
        zIndex: '4000',
      }}
      exit={{
        right: '-50px',
        opacity: 0,
        pointerEvents: 'none',
      }}
      transition={{ duration: 0.5, type: 'tween', ease: [0.76, 0, 0.24, 1] }}
      className="h-[80vh] pt-[2rem] shadow-gray-600 rounded-bl-3xl  rounded-tl-3xl   top-[12vh]  right-0 overflow-y-scroll w-[350px] bg-gray-50 z-30 absolute   p-3 border shadow-lg text-black"
    >
      {' '}
      <div
        onClick={() => setCartOpen(false)}
        className=" cursor-pointer absolute rounded-bl-lg top-0 right-0  bg-red-400 w-6 h-6 flex justify-center items-center"
      >
        <IoClose className="text-white" />
      </div>
      {cart.length > 0 ? (
        <div className=" w-full flex flex-col justify-between relative h-fit ">
          <div className="relative h-fit w-full flex flex-col gap-[20px]">
            {cart?.map((item, i) => (
              <Cartitem
                removeCartItem={removeCartItem}
                index={i}
                key={i}
                item={item}
              />
            ))}
            <Link onClick={() => setCartOpen(false)} className=' w-full py-3 flex justify-center items-center mt-10 bg-primary-light  text-white' to='/payment'>Go To Payment Page</Link>
          </div>
        </div>
      ) : (
        <div className=" flex flex-col h-full justify-center items-center gap-3">
          <img className="w-[290px] animate-pulse h-[290px]" src="/cat.svg" alt="" />{' '}
          <h1 className=' capitalize animate-pulse text-xl'>Your cart is empty.</h1>
        </div>
      )}
    </motion.div>
  )
}

export default Cartpage
