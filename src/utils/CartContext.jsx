import { createContext, useContext, useState } from "react"


const CartContext = createContext()




export const CartProvider = ({children}) => {

    const [cartOpen, setCartOpen] = useState(false)
    const [cart, setCart] = useState([
  
      ])
    const contextData = {
        cartOpen, setCartOpen,
        cart, setCart
    } 
    return (
        <CartContext.Provider value={contextData}>
            {
                children
            }

        </CartContext.Provider>
    )
}

export const useCart =() => {{
    return useContext(CartContext)
}}

export default CartContext