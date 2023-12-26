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
import { AuthProvider, useAuth } from './utils/AuthContext.jsx'
import Produt from './pages/Produt.jsx'
import Add from './pages/Add.jsx'
import { PrivateRoutes } from './comp/Private.jsx'

import Edit from './pages/Edit.jsx'
import Cartpage from './pages/Cartpage.jsx'
import { CartProvider } from './utils/CartContext.jsx'

const Layout = () => {
  return (
    <div className=' relative'>
      <ScrollRestoration />
      <CartProvider>
        <AuthProvider>
          <Nav />
          <Outlet />
          <Footer />
        </AuthProvider>
      </CartProvider>
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
      {
        path: '/add',
        element: (
          <>
            <ScrollRestoration />
            <AuthProvider>
              <PrivateRoutes>
                <Add />
              </PrivateRoutes>
            </AuthProvider>
          </>
        ),
      },
      {
        path: '/edit/:id',
        element: (
          <>
            <ScrollRestoration />
            <AuthProvider>
              <PrivateRoutes>
                <Edit />
              </PrivateRoutes>
            </AuthProvider>
          </>
        ),
      },
      {
        path: '/cart',
        element: (
          <>
            <ScrollRestoration />
            <AuthProvider>
              <Cartpage />
            </AuthProvider>
          </>
        ),
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
        <CartProvider>
        <Nav />
        <Produt />

        </CartProvider>
  
      </AuthProvider>
    ),
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
