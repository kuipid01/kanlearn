import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import { Nav } from './comp/Nav.jsx';
import Footer from './comp/Footer.jsx';
import Home from './comp/Home.jsx';
const Layout = () => {

  return (
    <div>
  
        <ScrollRestoration />
        <Nav />
        <Outlet />
        <Footer />
     
    </div>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      
    ],
  },
  
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/join",
    element: <Register/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
