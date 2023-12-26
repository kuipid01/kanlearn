import React, { useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { motion } from 'framer-motion'
import { TranslateButton } from './Button'
import { PopularCourses } from '../consts/consts'
import Card from './Card'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'
const Popular = () => {
  const [data, setData] = useState([])
  const getAllProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'videos'))
      const newData = []
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data())
        newData.push({ id: doc.id, ...doc.data() })
      })
      setData(newData)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllProducts()
  }, [])
  console.log(data)
  return (
    <div className=" w-full py-[20px]  bg-purple-50 mx-auto  min-h-screen">
      <div className="w-[90%] mx-auto ">
        <small className=" uppercase font-medium">courses</small>
      </div>
      <div className=" w-[90%] mx-auto mt-4 mb-[50px] flex items-center justify-between">
        <motion.h1 className="text-[35px]   md:w-1/2 leading-[100%] font-[400] md:text-[50px]">
          New Videos
        </motion.h1>
        <div className="w-fit hidden md:flex h-fit pb-1 border-b-2 border-black">
          <TranslateButton
            width={250}
            height={30}
            text={'Check out popular courses'}
            img="/arrow.svg"
          />
        </div>
      </div>
      <section className="w-full ">
        <div className="w-[90%] flex flex-wrap gap-[20px]  mx-auto ">
          {data?.map((item, index) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Popular
