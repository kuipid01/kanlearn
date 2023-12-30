import React, { useRef, useState } from 'react'
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3'
import { useAuth } from '@/utils/AuthContext'
import { useCart } from '@/utils/CartContext'
import { Link, useNavigate } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import Spin from '@/comp/spinner/Spin'
const Payment = () => {
  const { user } = useAuth()
  const { cart,setCart } = useCart()
  const [loading, setloading] = useState(false)
  const { email, displayName, username } = user
  const { subTotal } = useCart()
  // Your array of objects
const navigate = useNavigate()
  const newArray = cart?.map((obj) => obj.videoLink)
  console.log(newArray)

  const config = {
    public_key: 'FLWPUBK_TEST-cf4564e4f7931f5cc9f23aa36942617c-X',
    tx_ref: Date.now(),
    amount: subTotal,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: email,
      phone_number: email,
      name: username || displayName,
    },
    customizations: {
      title: 'Product Checkout Page',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  }
  const myForm = useRef()
  const sendEmail = (e) => {
    setloading(true)

    // Replace the placeholders with your actual service ID, template ID, and public key
    const serviceId = 'service_qu90nlr'
    const templateId = 'template_2xe8a06'
    const publicKey = 'YvI7FrI1htokZeo2H'

    const templateParams = {
      email: email,
      displayName: displayName || username,
      subTotal: subTotal || '',
      from_name: 'Kanlearn',
      newArray: newArray.join('\n'), // Use '\n' for line breaks in the email template
    }

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((result) => {
        setloading(false)
        console.log(result.text)
      })
      .catch((error) => {
        setloading(false)
        console.log(error.text)
      })
  }

  const handleFlutterPayment = useFlutterwave(config)
  const handleCheckOut = () => {
    // setBtnloading(true)
    // setTimeout(() => {
    //   setBtnloading(false)
    // }, 1000);
    handleFlutterPayment({
      callback: (response) => {
        console.log(response)
        closePaymentModal()
      },
      onClose: () => {},
    })
  }
  if (loading) return <Spin />
  return (
    <div className=" min-h-screen bg-primary-light flex justify-center items-center page">
      <div className=" bg-purple-100 gap-2 rounded-md flex w-1/2  shadow-lg p-3 border flex-col  text-black">
        <h1 className="text-center"> Order Summary:</h1>
        <p className=" text-lg"> Total:# {subTotal} </p>
        <p className=" text-lg"> Mail: {email} </p>
        <p className=" text-lg"> Name: {username || displayName} </p>

        {subTotal > 0 ? (
          <button
            className="w-full py-3 bg-primary-light text-white"
            onClick={handleCheckOut}
          >
            Checkout To Receive Video
          </button>
        ) : cart?.length < 1 ? (
          <Link
            to="/"
            className="w-full py-3 text-center bg-primary-light text-white"
          >
            {' '}
            You dont have any video in your cart{' '}
          </Link>
        ) : (
          <form ref={myForm}>
            <input type="hidden" name="email" value={email} />
            <input
              type="hidden"
              name="displayName"
              value={displayName ? displayName : username}
            />
            <input type="hidden" name="subTotal" value={subTotal || '0'} />
            <input type="hidden" name="from_name" value="Kanlearn" />
            <input type="hidden" name="videoLink" value={newArray} />
            <button
              onClick={() => {
                navigate('/orderConfirm')
                setCart([])
                sendEmail()
              }}
              className="w-full  py-3 bg-primary-light text-white"
            >
              Receive Video
            </button>
          </form>
        )}
      </div>{' '}
    </div>
  )
}

export default Payment
