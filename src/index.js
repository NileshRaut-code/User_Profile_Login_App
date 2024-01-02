import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './comp/Login';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Browse from './comp/Browse';
const routing=createBrowserRouter([
  {
    path:"/",
    element:(<App/>)
  }
  ,{
    path:"/login",
    element:(<Login/>)
  }
  ,{
    path:"/browse",
    element:(<Browse/>)
  }
])



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={appStore}>
  <RouterProvider router={routing} />
    </Provider>  
   
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
