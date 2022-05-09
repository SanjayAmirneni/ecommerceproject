import React,{useEffect} from "react";
import moment from "moment";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import CurrencyFormat from "react-currency-format";
import "./Order.css"

function Order({order}){

    useEffect(()=>{
        console.log(order);
        console.log(order.createdDate)
        console.log(order.basket)
        console.log(order.amount)
        console.log(order.id)
    })
    return(
        <div className="order">
            {/* <h2>Order</h2> */}
            {/* <img  className='order__image' src={order.image} /> */}
            <p>{`ID : ${order._id}`}</p>
            <p className="order__id"><small>{`Date : ${order.createdDate}`}</small></p>

            {/* {order.basket?.map(item=>{ */}
                 <CheckoutProduct
                            id={order.id}
                            title={order.title}
                            image={order.image}
                            price={order.price}
                            rating={order.rating}
                            />
            {/* })} */}

                {/* <CurrencyFormat 
                renderText={(value)=>(
                   <h3 className="order__total">Order Total : {value}</h3>
                )}
                decimalScale={2}
                value={order.amount / 100}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                /> */}
        </div>
    )
}

export default Order;