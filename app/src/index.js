import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './tests/reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import History from './routes/History';
import Login from './routes/Login';
import Profile from './routes/Profile';
import Quote from './routes/Quote';
import Register from './routes/Register';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/history",
    element: <History/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/profile",
    element: <Profile/>,
  },
  {
    path: "/quote",
    element: <Quote/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

reportWebVitals();
