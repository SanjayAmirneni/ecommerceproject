import React,{useEffect, useState} from "react";
import { useSelector } from "react-redux";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import "./Payment.css"
import {Link} from "react-router-dom";
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import {useNavigate} from "react-router-dom";
import basketEmpty from "../../Action/basketEmptyAction";
import axios from "axios";
import Cookies from 'js-cookie'

function Payment(){

    const reduxData = useSelector((storedata)=>{
        return storedata;
    })

    const totalPrice = reduxData.basketReducer.basket.reduce((price,ele)=>price+ele.price,0)

    const stripe = useStripe();
    const elements = useElements();
    
    const [error,setError] = useState(null);
    const [disabled,setDisabled] = useState(true);
    const [processing,setProcessing] = useState("");
    const [succeeded,setSucceeded] = useState(false);
    const [clientSecret,setClientSecret] = useState(true);
    const navigate = useNavigate();
    const cookieval = Cookies.get()

    async function paymentSubmit(e){
        e.preventDefault();

        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method : {
                card:elements.getElement(CardElement)
            }
        }).then(({paymentIntent})=>{

            console.log(paymentIntent)
            setSucceeded(true);
            setError(null)
            setProcessing(false)
            basketEmpty(reduxData.basketReducer.basket)
            reduxData.basketReducer.basket.forEach(async (element) => {
                const response = await axios.post('http://localhost:5000/api/v1/orders/addorder',{
                    "id":element.id,
                    "title":element.title,
                    "price":element.price,
                    "rating":element.rating,
                    "image":element.image,
                    "createdBy":reduxData.userReducer.user.email,
                })


                const product = await axios.delete('http://localhost:5000/api/v1/products/deleteproduct',{
                    "createdBy":reduxData.userReducer.user.email,
                    "title":element.title,
                })
                // console.log(product)

            });
            

            navigate('/orders',{replace:true})
        })
    }


   

    function paymentChange(e){
        setError(e.error?e.error.message:"");
        setDisabled(e.empty)
    }

    useEffect(()=>{
        Object.keys(cookieval).length>0? navigate('/payment'):navigate('/')
        const getClientSecret = async() =>{
            const response = await axios.post('http://localhost:5000/api/v1/payments/create?total',{ "total":totalPrice*100})
            console.log(response);
            setClientSecret(response.data.clientSecret);
        }

        getClientSecret();
    },[reduxData.basketReducer.basket])


    console.log("Client Secret:", clientSecret);

    return(
        <div className="payment">
            <div className="payment__container">

                <h1>Checkout (
                    <Link to="/checkout">
                    {reduxData.basketReducer.basket?.length} items)
                    </Link>
                    </h1>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{reduxData.userReducer.user?reduxData.userReducer.user.email:"Guest"}</p>
                        <p>5611 W 134th Ter</p>
                        <p>OverlandPark, KS</p>
                    </div>
                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        {
                            reduxData.basketReducer.basket.map((ele)=>{
                              return  <CheckoutProduct
                                id={ele.id}
                                title={ele.title}
                                price={ele.price}
                                rating={ele.rating}
                                image={ele.image} />
                            })
                        }
                    </div>
                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form onSubmit={paymentSubmit}>
                            <CardElement onChange={paymentChange}/>

                            <div className="payment__priceContainer">
                            <CurrencyFormat 
                                renderText={(value)=>(
                                    <h3>Order Total : {value} </h3> )}
                                decimalScale={2}
                                value={totalPrice}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                            />
                            <button className="payment__button" disabled={processing || disabled || succeeded} >
                                <span>{processing ? <p>Processing</p>:"Buy Now"}</span>
                            </button>
                            </div>

                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Payment;