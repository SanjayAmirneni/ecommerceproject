import React,{useCallback, useEffect,useState} from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import {BrowserRouter as Router, Routes ,Route} from "react-router-dom"
import Checkout from './Components/Checkout/Checkout';
import SignIn from './Components/SignIn/SignIn';
import Test from "./Test"
import {auth} from "./config/firebase/firebase";
import {onAuthStateChanged} from "firebase/auth";
import userAddAction from './Action/userAddAction';
import Payment from './Components/Payment/Payment';
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import Orders from './Components/Orders/Orders';
import ProductView from './Components/ProductView/ProductView';
import {useSelector} from 'react-redux'
// import { sessionService } from 'redux-react-session';
// import Cookies from 'js-cookie'


function App() {

  const promise = loadStripe("pk_test_51Kcf2eJKbGhXxv9efcm3x1C3q0G3fHniz2pww4kz70ngDQnVmFNPQQaIcnkTgh1a8YdGL93DuwJVkGl9u8Mcpbjw00MFNAqCil");

  // const reduxData = useSelector((storeData)=>{
  //   return storeData
  // })

  // const [user,setUser] = useState('');
  // const [cookie,setCookie] = useState(false);

  // useEffect(()=>{
    // const cookieval = Cookies.get()
    // console.log(sessionService.checkAuth())
    // cookieval?setCookie(true):setCookie(false)
    // onAuthStateChanged(auth, (user) =>{
    //   if (user) {
    //     console.log(user.email);
    //     // const email=user.email
    //     setUser(user);
    //   }
    // })
    // userAddAction(user);
 
    // console.log(cookie)
  // },[user])
  return (
    <Router>
    <div className="App">
      
      <Routes>
        <Route path="/"
          element={<SignIn />}/>
        <Route path="/orders"
          element ={
            <div>
              <Header />
              <Orders />
            </div>
          } />
        <Route path="/payment"
        element={
        <div>
          <Header />
          <Elements stripe={promise}>
          <Payment />
          </Elements>
        </div>} />
        <Route path='/checkout'
         element={
         <div>
           <Header />
           <Checkout />
          </div>
          } />
        <Route path='/home'
        element={
        <div>
          <Header />
          <Home />
        </div>
      } />
      <Route path='/productview'
        element={
        <div>
          <Header />
          <ProductView  />
        </div>
      } />
      {/* <Route path='/'
        element={
        <div>
          <SignIn />
        </div>
      } /> */}
      </Routes>
    </div>
    </Router>



  );
}

export default App;
