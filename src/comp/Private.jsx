import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../utils/AuthContext"


export const PrivateRoutes = ( {children}) => {
     const {user} = useAuth()
  
    return user ? children : <Navigate to="/login"/>
}