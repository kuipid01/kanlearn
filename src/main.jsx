import React from 'react'

import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import { Nav } from './comp/Nav.jsx'
import Footer from './comp/Footer.jsx'
import Home from './comp/Home.jsx'
import { AuthProvider } from './utils/AuthContext.jsx'
import Produt from './pages/Produt.jsx'

const Layout = () => {
  return (
    <div>
       <ScrollRestoration />
      <AuthProvider>
       
        <Nav />
        <Outlet />
        <Footer />
      </AuthProvider>
    </div>
  )
}
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },

  {
    path: '/login',
    element: (
      <AuthProvider>
        {' '}
        <Login />{' '}
      </AuthProvider>
    ),
  },
  {
    path: '/join',
    element: (
      <AuthProvider>
        {' '}
        <Register />{' '}
      </AuthProvider>
    ),
  },
  {
    path: '/course/:id',
    element: (
      <AuthProvider>
         <ScrollRestoration />
        <Nav />
        <Produt />
      </AuthProvider>
    ),
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
