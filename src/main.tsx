import React from 'react'
import ReactDOM from 'react-dom/client'
import './css/index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  RouterProvider, createBrowserRouter,
} from "react-router-dom";

import HomePage from './pages/home-page/index.tsx';
import ProfilePage from './pages/profile-page/index.tsx';
import CatPage from './pages/cat-page/index.tsx';

 

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />
  },
  {
    path: "/cat",
    element: <CatPage />
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);