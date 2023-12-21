import React from 'react'
import {motion} from 'framer-motion'
const Menu = ({setMenu,menu}) => {

  return (
    <div onClick={ () => setMenu(!menu)} className='flex lg:hidden cursor-pointer flex flex-col gap-1'>
        <motion.img  animate={ menu ? {
            rotate:40,
            translateY:6
        }
    :
    {
        rotateY:0
    }} src='/menu.svg' alt="" />
        <motion.img  animate={ menu ? {
            rotate:-40
        }
    :
    {
        rotateY:0
    }}
         src='/menu.svg' alt="" />
    </div>
  )
}

export default Menu