import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './components/Login/LoginPage';
import FailedLoginPage from './components/Login/FailedLogin';
import ErrorPage from './components/Errorpage/errorPage';
import Home from './components/Home/Home';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage/>,
    errorElement: <ErrorPage />
  },
  {
    path: "/home/:userId",
    element: <Home />
  },
  {
    path: "/failed-login",
    element: <FailedLoginPage/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
