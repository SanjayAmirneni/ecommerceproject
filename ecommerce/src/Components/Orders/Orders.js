import React, { useEffect,useState } from "react";
import {useSelector} from "react-redux";
import Order from "../Order/Order";
import "./Orders.css"
import axios from "axios";
// import { sessionService } from 'redux-react-session';
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'


function Orders(){
    const reduxData = useSelector((storeData)=>{
        return storeData;
    })

    const [orderState,setOrderState] = useState([])
    const cookieval = Cookies.get()
    const navigate = useNavigate()


    useEffect(async ()=>{
        Object.keys(cookieval).length>0? navigate('/orders'):navigate('/')

        if(reduxData.userReducer.user){
        const res = await axios.get('http://localhost:5000/api/v1/orders/getorders',{
                params:{
                "createdBy":reduxData.userReducer.user.email}
            })
            console.log(res.data)
            setOrderState(res.data)}
            // console.log(sessionService.checkAuth);
            // console.log(Cookies.get())
    },[])




    return (
        <div className="orders">
            <h1>Your Orders</h1>

            <div>
                   {/* {orderState? <Order order={orderState.orders} />:""} */}
                   {orderState.map((ele)=>{
                       console.log(ele)
                   return <Order order = {ele} /> }
                   )}
            </div>
        </div>
    )
}

export default Orders;