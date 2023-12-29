import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [subTotal, setSubTotal] = useState(0)
  useEffect(() => {
    const data = window.localStorage.getItem('CART')
    if (data !== null && data.length>0) {
        // console.log(data)
        setCart(JSON.parse(data))
    }
  }, [])
  useEffect(() => {
    setSubTotal(
      cart?.reduce((acc, curr) => acc + Number(curr.price) , 0)
    );
  }, [cart]);
  
  const contextData = {
    cartOpen,
    setCartOpen,
    cart,
    setCart,
    subTotal,
  }
  return (
    <CartContext.Provider value={contextData}>{children}</CartContext.Provider>
  )
}

export const useCart = () => {
  {
    return useContext(CartContext)
  }
}

export default CartContext
