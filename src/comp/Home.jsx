import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Btn, TranslateButton } from "./Button";
import "./home.css";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
} from "framer-motion";
import { useScroll } from "framer-motion";
import { useTransform } from "framer-motion";
import Offer from "./Offer";
import Popular from "./Popular";
import Footer from "./Footer";
import { Nav } from "./Nav";
//lg - 50p
//sm - 20p
//esm - 15p
const Home = () => {
  const divRef = useRef(null);
  const isInView = useInView(divRef, {
    amount: 0.2,
    once: true,
  });
  const [animatey, setAnimate] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [srollState, setSrollState] = useState(true);
  const [menu, setMenu] = useState(false);
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };
  const updateMousePosition = (e) => {
    const { pageX, scrollY, pageY } = e;
    const totalPageHeight = document.body.scrollHeight - window.innerHeight;

    setMousePosition({ x: pageX, y: pageY });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);
  // console.log(animatey);
  const newXalue = mousePosition.x / 100 + 10;

  const initial = `
     M0 25
     Q${300 / 2} 0 300 25 
     L300 225
     Q${300 / 2} 259 0 225 
     LO 225
   `;

  const final = `
     M0 25
     Q${300 / 2} -50 300 25 
     L300 225
     Q${300 / 2} 225 0 225 
     LO 225
   `;
  const slide = {
    initial: {
      top: "100%",
    },
    enter: {
      top: "-120%",
      transition: {
        duration: 2,
      },
    },
  };
  const curve = {
    initial: {
      d: initial,
    },
    enter: {
      d: final,
      transition: {
        duration: 1,
        delay: 0.5,
      },
    },
  };

  return (
    <div className="relative">
      <Nav setMenu={setMenu} menu={menu} srollState={srollState} />
      <div className=" flex flex-col gap-[150px]">
        <div className="  min-h-screen h-fit flex justify-center items-center  w-full   bg-no-repeat bg-center bg-cover brightness-90 ">
          <section
            ref={divRef}
            className="flex mt-[10vh]  flex-col md:flex-row w-[90%] mx-auto  md:h-screen justify-between items-center h-fit"
          >
            <div className="flex  w-full md:w-[50%] justify-center items-center  h-[60vh] md:h-fit  gap-10 flex-col">
              {" "}
              <motion.div
                initial={{
                  clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                  y: 200,
                  rotateZ: "10deg",
                  x: -5,
                }}
                animate={
                  isInView
                    ? {
                        clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0% 100%)",
                        y: 0,
                        rotateZ: "0deg",
                        x: -0,
                      }
                    : {}
                }
                transition={{
                  duration: 0.7,
                  type: "linear",
                }}
              >
                <h1 className="text-[35px] leading-[100%] font-[400] md:text-[50px]">
                  Get one-on-one tutorials from experts
                </h1>
              </motion.div>
              <motion.p
                initial={{
                  clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                  y: 50,
                  opacity: 0,
                  rotateZ: "2deg",
                  x: -10,
                }}
                animate={
                  isInView
                    ? {
                        clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0% 100%)",
                        y: 0,
                        rotateZ: "0deg",
                        opacity: 1,
                        x: 0,
                      }
                    : {}
                }
                transition={{
                  duration: 0.7,
                  delay: 0.2,
                  type: "linear",
                }}
                className="text-[18px] text-gray-900 font-[300]"
              >
                At Kanlearn, we understand that education is personal.
                Experience the power of one-on-one tutelage designed to elevate
                your understanding and accelerate your progress.
              </motion.p>
              <motion.div
                initial={{
                  clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                  y: 50,
                  opacity: 0,
                  rotateZ: "2deg",
                  x: -10,
                }}
                animate={
                  isInView
                    ? {
                        clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0% 100%)",
                        y: 0,
                        rotateZ: "0deg",
                        opacity: 1,
                        x: 0,
                      }
                    : {}
                }
                transition={{
                  duration: 0.7,
                  delay: 0.3,
                  type: "linear",
                }}
                className="flex w-full gap-5 "
              >
                <Btn
                  height={60}
                  width={250}
                  text="Explore Tutors"
                  bg={true}
                  mainpage={true}
                />
                <Btn
                  height={60}
                  width={250}
                  text="About Us"
                  bg={false}
                  mainpage={true}
                />
              </motion.div>
            </div>
            <motion.div
              initial={{
                clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                y: 50,
                opacity: 0,
                rotateZ: "2deg",
                x: -10,
              }}
              animate={
                isInView
                  ? {
                      clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0% 100%)",
                      y: 0,
                      rotateZ: "0deg",
                      opacity: 1,
                      x: 0,
                    }
                  : {}
              }
              transition={{
                duration: 0.5,
                delay: 0.5,
                type: "linear",
              }}
              className="img relative w-full md:w-[40%] h-[60vh] md:h-[80%] mx-auto flex "
            >
              {/* 1st */}
              <motion.div
                animate={{ x: `${newXalue}%` }}
                className=" w-[250px] h-[60%]   right-0 absolute "
                transition={{
                  duration: 0.5,
                  type: "linear",
                }}
              >
                <motion.img
                  initial={{
                    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                  }}
                  animate={
                    isInView
                      ? {
                          clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0% 100%)",
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.7,
                    delay: 0.7,
                    type: "linear",
                  }}
                  className="w-full h-full  object-cover z-10   "
                  src="/s.jpg"
                  alt=""
                />
              </motion.div>

              {/* 2nd */}
              <motion.div
                //  initial={{ opacity: 0, left:'50%' , top: "50%" }}
                animate={{ left: `${50 + newXalue / 2}%`, top: "50% " }}
                transition={{
                  duration: 0.5,
                  type: "linear",
                }}
                className="w-[250px] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2   h-[60%] absolute"
              >
                <motion.img
                  initial={{
                    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                  }}
                  animate={
                    isInView
                      ? {
                          clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0% 100%)",
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.7,
                    delay: 0.9,
                    type: "linear",
                  }}
                  className="w-full h-full object-cover z-20"
                  src="/student1.jpg"
                  alt=""
                />
              </motion.div>
              {/* 3rd */}
              <motion.div
                animate={{ x: `${newXalue}%` }}
                className=" w-[250px] h-[60%]  left-0 bottom-0  absolute "
                transition={{
                  duration: 0.5,
                  type: "linear",
                }}
              >
                <motion.img
                  initial={{
                    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                  }}
                  animate={
                    isInView
                      ? {
                          clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0% 100%)",
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.7,
                    delay: 1.1,
                    // ease: "ease-in-out", // Add an easing function
                  }}
                  className="w-full  h-full object-cover "
                  src="/student2.jpg"
                  alt=""
                />
              </motion.div>
            </motion.div>
          </section>
        </div>
        <Offer />
        <Popular />
        <Footer />
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
      <AnimatePresence mode="wait">
        {menu && (
          <motion.ul
            initial={{
              top: "-20vh",
              opacity: 0,
            }}
            animate={{
              top: "10vh",
              opacity: 1,
            }}
            exit={{
              top: "-20vh",
              opacity: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="fixed right-0 top-[10vh] text-gray-200 h-fit p-3 bg-black"
          >
            <motion.li
              initial={{
                x: -20,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              exit={{
                x: -20,
                opacity: 0,
              }}
              transition={{
                duration: 0.5,
                delay: 0.3,
              }}
              className="px-10 mb-2 py-2"
            >
              About
            </motion.li>
            <motion.li
              initial={{
                x: -20,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              exit={{
                x: -20,
                opacity: 0,
              }}
              transition={{
                duration: 0.5,
                delay: 0.5,
              }}
              className="px-10 mb-2 py-2"
            >
              Videos
            </motion.li>
            <motion.li
              initial={{
                x: -20,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              exit={{
                x: -20,
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
                delay: 0.7,
              }}
              className="px-10 mb-2 py-2"
            >
              Teachers
            </motion.li>
            <motion.li
              initial={{
                x: -20,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              exit={{
                x: -20,
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
                delay: 0.9,
              }}
              className="px-10 mb-2 py-2"
            >
              <Link className="" to="/join">
                Sign Up
              </Link>
            </motion.li>
            <motion.li
              initial={{
                x: -20,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              exit={{
                x: -20,
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
                delay: 1.1,
              }}
              className="px-10 mb-2 py-2"
            >
              <Link
                className=""
                to="/login"
              >
                Sign In
              </Link>
            </motion.li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
