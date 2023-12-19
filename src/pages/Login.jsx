import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const Login = () => {
  const textAnim = {
    initial: {
     opacity:0,
    x:-30
    },
    animate: {
       x:0,
      opacity: 1,
    },
  };
  return (
    <div className="w-full rounded-r-3xl bg-primary-light   flex h-screen">
      <div className="hidden md:flex w-1/3 relative h-full text-white p-4 ">
        <motion.h1  variants={textAnim}
          initial="initial"
          animate="animate" 
          transition={{
            duration: 1,
            type: "linear",
         
          }}  className=" mt-[30px] text-3xl">
         Continue your <br /> journey on <span className=" text-4xl uppercase text-purple-500 font-extrabold">kanlearn</span> kanlearn
        </motion.h1>
        <motion.img
         variants={textAnim}
         initial="initial"
         animate="animate" 
         transition={{
           duration: 1,
           type: "linear",
        
         }}
          className=" absolute top-[20%] -right-[40%] rotate-12"
          src="/Login.png"
          alt=""
        />
      </div>
      <div className="flex flex-col h-full justify-center items-center  bg-white shadow-lg flex-1  md:rounded-l-3xl">
        <div className="md:w-[60%] w-[90%] gap-4  flex flex-col h-full justify-center items-start ">
          <h1 className=" text-3xl font-bold">Welome back </h1>
          <div className=" w-full flex gap-3">
            <div className=" font-light cursor-pointer border p-1 md:p-2 flex gap-3 items-center flex-1">
              <img src="/go.png" alt="" />
              <span className=" text-[12px] md:text-lg capitalize">Sign in with google</span>
            </div>
            <div className=" cursor border p-1 md:p-2 cursor-pointer font-light gap-3 flex items-center flex-1">
              <img src="/face.png" alt="" />
              <span  className="md:text-lg capitalize text-[10px]"> Sign in with facebook</span>
            </div>
          </div>
          <form className=" w-full flex flex-col gap-4" >
       
            <motion.input  variants={textAnim}
         initial="initial"
         animate="animate" 
         transition={{
           duration: 1,
           type: "linear",
        
         }}  type="email" className="w-full outline-none border-b border-gray-400 py-3" placeholder="Email" />
            <motion.input  variants={textAnim}
         initial="initial"
         animate="animate" 
         transition={{
           duration: 1,
           type: "linear",
        
         }}  type="password" className="w-full outline-none border-b border-gray-400 py-3" placeholder="Password" />
            <button type="submit" className="bg-primary-light rounded-md text-white w-full py-3">
             Login
            </button>

          </form>
          <p>
            Dont have an account? <Link className="text-primary-light" to='/join'>Sign Up</Link>
          </p>
         
        </div>
      </div>
    </div>
  );
};

export default Login;
