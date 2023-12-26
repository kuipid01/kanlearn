import { Link } from 'react-router-dom'
import { TranslateButton } from './Button'
import Menu from './Menu'
import { useAuth } from '../utils/AuthContext'
import './nav.css'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useCart } from '@/utils/CartContext'
import Cartpage from '@/pages/Cartpage'
import { IoCartOutline } from 'react-icons/io5'
export const Nav = ({ srollState }) => {
  const { user, logoutUser } = useAuth()

  const [menu, setMenu] = useState(false)
  const [dropdown, setDropdown] = useState(false)
  const { cartOpen, setCart, setCartOpen, cart } = useCart()

  return (
    <nav
      className={` top-0   bg-white left-0  fixed w-full px-8 z-30  duration-200 ease-linear transition   mx-auto h-[10vh]  items-center flex justify-between  ${
        srollState ? 'bg-white' : 'bg-transparent'
      }  ${srollState ? 'shadow' : ''}`}
    >
      <Link to="/">
        <div className="logo font-bold border-b-2 border-[#613F75] text-[20px] md:text-[25px] uppercase">
          {' '}
          <img src="" alt="" /> Kanlearn
        </div>
      </Link>

      <div className="md:flex h-full btn text-[#613F75] font-medium  items-center uppercase gap-3 hidden w-2/4">
        <TranslateButton text="Home" width={100} height={40} />

        <TranslateButton text="About" width={100} height={40} />

        <TranslateButton text="Videos" width={100} height={40} />

        <TranslateButton text="Teachers" width={100} height={40} />
      </div>
    
      <div className="hidden lg:flex  gap-5  uppercase">
        {!user ? (
          <>
            <Link
              className="px-5 hover:text-[#ffffff] hover:bg-[#613F75] hover: rounded-md py-2 border border-[#613F75]"
              to="/join"
            >
              Sign Up
            </Link>
            <Link
              className="px-5 hover:border transition-all hover:bg-white hover:text-[#613F75] hover:border-[#613F75] rounded-md text-white bg-[#613F75] py-2 "
              to="/login"
            >
              Sign In
            </Link>
          </>
        ) : (
          <div className=" flex gap-2">
            <div
              onClick={() => {
                setMenu(false)
                setDropdown(!dropdown)
              }}
              className="cursor-pointer relative p-2 rounded-full w-fit h-fit border "
            >
              <img
                src={user.profileImage ? user.profileImage : '/ava.png'}
                className="w-[20px] h-[20px] rounded-full object-cover"
                alt=""
              />
            </div>
            <Link
              className="px-5 hover:border transition-all hover:bg-white hover:text-[#613F75] hover:border-[#613F75] rounded-md text-white bg-[#613F75] py-2 "
              onClick={logoutUser}
            >
              logout
            </Link>
          </div>
        )}
      </div>
      <div className='flex gap-2 items-center'>
      <div
        onClick={() => setCartOpen(!cartOpen)}
        className=" mr-5 lg:mr-0 cursor-pointer whitespace-nowrap relative flex gap-3
                        text-center   items-center  w-fit mb-2 py-2"
      >
        <IoCartOutline className="text-4xl" />
        <span className="text-xs absolute -top-0 -right-2 rounded-full h-6 w-6 bg-primary-light text-white border  flex justify-center items-center">
          {cart?.length}
        </span>
      </div>
      <Menu
        setMenu={setMenu}
        dropdown={dropdown}
        setDropdown={setDropdown}
        menu={menu}
      />
      </div>
      
      <AnimatePresence mode="wait">
        {menu && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="w-full lg:hidden fixed  top-[10vh] left-0 h-screen bg-transparent"
          >
            <div
              onClick={() => setMenu(false)}
              className="absolute bg-transparent top-0 left-0 w-full h-full "
            ></div>
            <motion.ul
              initial={{
                top: '-10vh',
                opacity: 0,
              }}
              animate={{
                top: '0%',
                opacity: 1,
              }}
              exit={{
                top: '-10vh',
                opacity: 0,
                z: 0,
              }}
              transition={{
                duration: 0.3,
              }}
              className="absolute right-0 top-0 text-gray-200 h-fit p-3 bg-black"
            >
              <motion.li
                onClick={() => setMenu(!menu)}
                initial={{
                  x: -20,
                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                }}
                exit={{
                  x: 20,
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
                onClick={() => setMenu(!menu)}
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
                onClick={() => setMenu(!menu)}
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
              {!user && (
                <motion.li
                  onClick={() => setMenu(!menu)}
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
                  className="px-10  border-t border-gray-700 mb-2 py-2"
                >
                  <Link className="" to="/join">
                    Sign Up
                  </Link>
                </motion.li>
              )}
              {!user && (
                <motion.li
                  onClick={() => setMenu(!menu)}
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
                  <Link className="" to="/login">
                    Sign In
                  </Link>
                </motion.li>
              )}
              {user && (
                <motion.button
                  onClick={() => {
                    setMenu(!menu)
                    logoutUser()
                  }}
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
                  className="px-10 cursor-pointer border-t border-gray-700 mb-2 py-2"
                >
                  Logout
                </motion.button>
              )}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {dropdown && (
          <div className=" z-[400] fixed left-0  top-[10vh] w-full h-screen bg-transparent">
            <div
              onClick={() => setDropdown(false)}
              className=" w-full h-full absolute top-0 left-0 bg-transparent"
            ></div>
            <motion.ul
              initial={{
                top: '-10vh',
                opacity: 0,
                zIndex: -300,
              }}
              animate={{
                top: '0%',
                opacity: 1,
                zIndex: 30,
              }}
              exit={{
                top: '-10vh',
                opacity: 0,
                pointerEvents: 'none',
              }}
              transition={{
                duration: 0.2,
              }}
              className="absolute lg:flex lg:flex-col hidden  w-fit right-0 h-fit p-3 bg-white rounded-md shadow border text-gray-700"
            >
              <motion.li
                onClick={() => setDropdown(!dropdown)}
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
                className="   text-center border-b border-gray-700 w-fit mb-2 py-2"
              >
                <Link to="/profile">Profile</Link>
              </motion.li>
              <motion.li
                onClick={() => setDropdown(!dropdown)}
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
                className="whitespace-nowrap  text-center border-b border-gray-700 w-fit mb-2 py-2"
              >
                <Link to="/add">Add Video Tutorial</Link>
              </motion.li>
            </motion.ul>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {cartOpen && <Cartpage setCart={setCart} cart={cart} />}
      </AnimatePresence>
    </nav>
  )
}
