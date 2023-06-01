import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Main from './pages/Main.jsx'
import Root from './pages/Root.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../client/styles/index.css';
import './styles/index.css';
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Favorites from './pages/Favorites.jsx'


// Utilizing the <Outlet> component defined inside of Root.js, paths/components Home, Main, Login, Signup, and Favorites will be rendered based on the URL (Navbar will be constantly rendered)
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/main", element: <Main />},
      { path: "/login", element: <Login />},
      { path: "/signup", element: <Signup />},
      { path: "/favs", element: <Favorites />}
    ],
  },
]);

export default function App() {
  return (
    // RouterProvider: is the top-level component used in React Router to provide the routing context to its descendants.
  <RouterProvider 
    router={router}>
  </RouterProvider>
  );

}

