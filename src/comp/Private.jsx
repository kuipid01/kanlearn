import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../utils/AuthContext"


export const PrivateRoutes = ( {children}) => {
    const {user} = useAuth()
    console.log(user)
    return user ? children : <Navigate to="/login"/>
}