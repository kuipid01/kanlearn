import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

export const Btn = ({ text, bg, width, height, mainpage }) => {
  const [animatey, setAnimate] = useState(false);
  return (
    <Link
      style={{
        height: height,
        width: width,
      }}
      onMouseEnter={() => setAnimate(true)}
      onMouseLeave={() => setAnimate(false)}
      className={`  relative  transition ease-in-out duration-300  font-[600] uppercase rounded-md flex justify-center items-center border text-[#613f75] border-[#613f75]`}
      to=""
    >
      {text}
      <motion.svg
        style={{
          height: ` ${height + 30}px `,
        }}
        // initial={{ top: `${animatey ? "-120%" : ""}` }}
        animate={{
          top: `${animatey ? "-15px" : "105%"}`,
          transition: {
            duration: 0.4,
          },
        }}
        className={` w-full  fill-[#2e2e2e62] pointer-events-none  z-[300]  absolute top-[-15px] `}
      >
        <motion.path
          animate={{
            d: `${
              animatey
                ? `M0 15 Q${width / 2} -10 ${width} 15 L${width} ${height + 20} Q${width / 2} ${height + 20} 0 ${height + 20} L0 ${height + 20}`
                : `M0 15 Q${width / 2} -10 ${width} 15 L${width} ${height + 20} Q${width / 2} ${height + 40} 0 ${height + 20} L0 ${height}`
            }`,
            
          }}
          transition={{
            duration: 0.5,
          }}
          className=" z-20  absolute"
        >
          {" "}
        </motion.path>
      </motion.svg>
    </Link>
  );
};
export const TranslateButton = ({ text, width, height, img }) => {
  return (
    <div
      style={{
        width: width,
        height: height,
      }}
      className={` overflow-hidden  p-0 m-0 relative    `}
    >
      <motion.div
        whileHover={{
          top: "-100%",
          transition: {
            duration: 0.4,
            type: "tween",
          },
        }}
        style={{
          height: height * 2,
        }}
        className={` cursor-pointer  w-full top-0 left-0 absolute flex flex-col`}
      >
      <div   style={{
          height: height ,
        }} className={`w-full  gap-2 flex justify-center items-center`}>
          {" "}
          {text} <img src={img} alt="" />
        </div>
        <div   style={{
          height: height ,
        }} className={`w-full  gap-2 flex justify-center items-center`}>
          {" "}
          {text} <img src={img} alt="" />
        </div>
      </motion.div>
    </div>
  );
};
