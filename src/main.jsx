import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './index.css'
import Root, { action as rootAction } from './routes/Root/Root'
import Category, { loader as categoryLoader } from './routes/Category/Category'
import ErrorPage from './error-page'


const router = createBrowserRouter([
  {
    path: `${import.meta.env.BASE_URL}`,
    element: <Root />,
    action: rootAction,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to={import.meta.env.BASE_URL + "/category/puppies"} /> },
      {
        path: `${import.meta.env.BASE_URL}/category/:category`,
        element: <Category />,
        loader: categoryLoader,
        errorElement: <div>Oh no! It looks like there are no (more) matches for your search!</div>
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
