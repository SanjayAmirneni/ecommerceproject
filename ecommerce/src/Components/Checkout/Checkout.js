import React,{useEffect, useState} from "react";
import "./Checkout.css";
import Subtotal from "../Subtotal/Subtotal";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import {useSelector} from "react-redux";
import axios from "axios";
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'

function Checkout(){

    const reduxData = useSelector((storeData)=>{
        return storeData;
    })

    const cookieval = Cookies.get()
    const navigate = useNavigate()

    useEffect(()=>{
        // console.log(Object.keys(cookieval).length)
        Object.keys(cookieval).length>0? navigate('/checkout'):navigate('/')
    },[])



    return(
        <div className="checkout">
            <div className="checkout__left">
                <img className="checkout__img" src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt="poster"/>
                <div>
                <h2 className="checkout__name">{`Hello, ${reduxData.userReducer.user?reduxData.userReducer.user.email:"Guest"}`}</h2>
                <h2 className="checkout__title">{`Your shopping Basket ${reduxData.basketReducer.basket[0]?"":"is empty."}`}</h2>
                {reduxData.basketReducer.basket.map(ele=>(
                    <CheckoutProduct
                    id={ele.id}
                    title={ele.title}
                    price={ele.price}
                    rating={ele.rating}
                    image={ele.image}
                    hidebutton />
                ))}
          
                </div>
            </div>
            <div className="checkout__right">
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout;