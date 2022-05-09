import React,{useState,useEffect, useRef,useSelect} from "react";
import "./Product.css";
import basketAddAction from "../../Action/basketAddAction";
import {useSelector} from "react-redux"
import store from "../../Redux/store";
import axios from "axios";
import productAddAction from "../../Action/productAddAction";
import {useNavigate} from 'react-router-dom'




function Product(props){

    const [basket,setBasket] = useState();
    const reduxData = useSelector((storeData)=>{
        return storeData;
    })


    const navigate = useNavigate();

    const addToBasket=()=>{
        setBasket({
            "id":props.id,
            "title":props.title,
            "price":props.price,
            "rating":props.rating,
            "image":props.image,
        })

        insertData();
    }

    async function insertData(){
        const data = await axios.post('http://localhost:5000/api/v1/products//addproduct',{
            "id":props.id,
            "title":props.title,
            "price":props.price,
            "rating":props.rating,
            "image":props.image,
            "createdBy":reduxData.userReducer.user.email,
        })
        console.log(data)
    }



    const update = useRef(false);

    useEffect(()=>{
        console.log(props)
        if(update.current){
            basketAddAction(basket);
        }else{
            update.current=true;
        }
    },[basket])

    function productview(data){

        //   console.log('clicked')
        productAddAction(data)
        navigate('/productview')
      }



    return(
        <div  className={props.des?"prdt__des":"prdt"}>
            <div onClick={()=>productview(props)} className="product__info">
            <p>{props.title}</p>
            <p className="product__price">
                <small>$</small>
                <strong>{props.price}</strong>
            </p>
            <div className="product__rating">
                {Array(props.rating).fill().map((_,i)=>{
                return <p key={i.toString()} className="star">⭐</p>})}
            </div>
            </div>
            <img onClick={()=>productview(props)} className="product__image" src={props.image} alt=""/>
            {props.des && <p className="product__des">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>}
            <button className="product__button" onClick={addToBasket}>Add to Basket</button>
        </div>
    )
}

export default Product;