import React,{useEffect, useState} from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";



    

function Subtotal(){



    
    const navigate = useNavigate();

    const reduxData = useSelector((storeData)=>{
        return storeData;
    })
    
//     const [totalPrice,setTotalPrice] = useState(0)

//     useEffect(()=>{
//         var price = 0;
//     reduxData.basketReducer.basket.forEach(element => {
//         console.log(price)
//         price = price+element.price
//     });
//     setTotalPrice(price)
// },[])

    // console.log(reduxData.basketReducer.basket)
    // console.log(reduxData.basketReducer.basket[1])

    const totalPrice = reduxData.basketReducer.basket.reduce((price,ele)=>price+ele.price,0)  



    function proceed(){
        reduxData.userReducer.user?navigate('/payment'):navigate('/signin')
    }

    return(
        <div className="subtotal">
            <CurrencyFormat 
                renderText={(value)=>(
                    <>
                    <p>
                       Subtotal ({reduxData.basketReducer.basket.length} items): <strong>{value}</strong>
                    </p>
                    <small className="subtotal__gift">
                        <input type="checkbox" />This order contains a gift
                    </small>
                    </>
                )}
                decimalScale={2}
                value={totalPrice}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                />
            
            <button onClick={proceed}>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal;