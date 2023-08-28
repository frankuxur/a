import axios from "axios";
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoutes = () => {
  const auth = document.cookie.split('token=')[1]
  
  return auth ? <Outlet /> : <Navigate to='/' />

}

export default PrivateRoutes