import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../utils/AuthContext"


export const PrivateRoutes = () => {
    const {user} = useAuth()
    console.log(user)
    return user ? <Outlet/> : <Navigate to="/login"/>
}