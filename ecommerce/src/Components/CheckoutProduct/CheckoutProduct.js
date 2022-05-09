import React,{useState,useEffect,useRef} from "react";
import "./CheckoutProduct.css"
import basketRemoveAction from "../../Action/basketRemoveAction";
import store from "../../Redux/store";
import {useSelector} from "react-redux";
import axios from "axios";

function CheckoutProduct(props){

    const [basket,setBasket] = useState();

    const reduxData = useSelector((storeData)=>{
        return storeData
    })


    

    function removeProduct(){
        setBasket({
            "id":props.id,
            "title":props.title,
            "price":props.price,
            "rating":props.rating,
            "image":props.image,
        })
        deleteProduct();
    }

    async function deleteProduct(){
        const product = await axios.delete('http://localhost:5000/api/v1/products/deleteproduct',{
            "createdBy":reduxData.userReducer.user.email,
            "title":props.title,
        })
        console.log(product)
    }

    var flag = useRef(false);

    useEffect(()=>{
        if(flag.current){
            basketRemoveAction(basket)
        }
        else{
            flag.current=true;
            
        }
    },[basket])


    return(
        <div className="checkoutProduct">
            <img src={props.image} className="checkoutPrdt__image"/>
            <div className="checkoutPrdt__info">
                <p className="checkoutPrdt__title">{props.title}</p>
                <p className="checkoutPrdt__price">
                    <small>$</small>
                    <strong>{props.price}</strong>
                </p>
                <div className="checkoutPrdt__rating">
                    {
                        Array(props.rating).fill().map((_,i)=>(<p key={i.toString()}>⭐</p>))
                    }
                </div>
               {props.hidebutton &&( <button onClick={removeProduct}>Remove from Basket</button>)}

            </div>
        </div>
    )
}

export default CheckoutProduct;