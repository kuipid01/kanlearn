import React from 'react'
import { Link } from 'react-router-dom'

const OrderConfirm = () => {
  return (
    <div className=' flex justify-center items-center h-screen'>
        <div className="flex flex-col items-center justify-between w-[65%] h-fit">
        <img src="/Cute.svg" className=' h-[300px] object-cover' alt="" />
        <h1 className=' uppercase text-lg'>Thank You ,Video has been sent</h1>
        <Link to='/' className=' border py-2 px-3 mt-7 bg-primary-light text-white'>Go Home</Link>
        </div>
    
    </div>
  )
}

export default OrderConfirm