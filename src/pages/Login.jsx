import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const navigate = useNavigate();
  const textAnim = {
    initial: {
      opacity: 0,
      x: -30,
    },
    animate: {
      x: 0,
      opacity: 1,
    },
  };
  return (
    <div className="w-full relative rounded-r-3xl bg-primary-light   flex h-screen">
      <AiOutlineArrowLeft
        onClick={() => navigate(-1)}
        className="absolute cursor-pointer z-30 text-2xl text-gray-50 left-5 top-5"
      />
      <div className="hidden md:flex w-1/3 relative h-full text-white p-4 ">
        <motion.h1
          variants={textAnim}
          initial="initial"
          animate="animate"
          transition={{
            duration: 1,
            type: "linear",
          }}
          className=" mt-[50px] text-3xl"
        >
          Continue your <br /> journey on{" "}
          <span className=" text-4xl uppercase text-purple-500 font-extrabold">
            kanlearn
          </span>{" "}
          kanlearn
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
              <span className=" text-[12px] md:text-lg capitalize">
                Sign in with google
              </span>
            </div>
            <div className=" cursor border p-1 md:p-2 cursor-pointer font-light gap-3 flex items-center flex-1">
              <img src="/face.png" alt="" />
              <span className="md:text-lg capitalize text-[10px]">
                {" "}
                Sign in with facebook
              </span>
            </div>
          </div>
          <form className=" w-full flex flex-col gap-4">
            <motion.input
              variants={textAnim}
              initial="initial"
              animate="animate"
              transition={{
                duration: 1,
                type: "linear",
              }}
              type="email"
              className="w-full outline-none border-b border-gray-400 py-3"
              placeholder="Email"
            />
            <div className="relative ">
              <motion.input
                variants={textAnim}
                initial="initial"
                animate="animate"
                transition={{
                  duration: 1,
                  type: "linear",
                }}
                type={showPassword ? "text" : "password"}
                className="w-full outline-none border-b border-gray-400 py-3"
                placeholder="Password"
              />
              <div
                onClick={handleTogglePasswordVisibility}
                className="absolute  w-fit h-[20px] cursor-pointer top-1/2 -translate-y-1/2  right-2 flex items-center focus:outline-none"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
            </div>
          
            <button
              type="submit"
              className="bg-primary-light rounded-md text-white w-full py-3"
            >
              Login
            </button>
          </form>
          <p>
            Dont have an account?{" "}
            <Link className="text-primary-light" to="/join">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
