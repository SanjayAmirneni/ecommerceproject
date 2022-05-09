import React from "react";
import "./Test.css";




function Product({id,title,image,price,rating}){


const addToBasket=()=>{
    console.log("clicked");

    }


    return(
        <div  className="product">
            <div  className="product__info">
            <p  >{title}</p>
            <p className="product__price">
                <small>$</small>
                <strong>{price}</strong>
            </p>
            <div className="product__rating">
                {Array(rating).fill().map((_,i)=>{
                return <p key={i.toString()} className="star">⭐</p>})}
            </div>
            </div>
            <img className="product__image" src={image} alt=""/>
            {/* <button onClick={addToBasket()}-------<<<<   Working when called like this    >>>>>>----------->Add to Basket</button> */}
            <button onClick={()=>addToBasket()}>Add to Basket</button>
        </div>
    )
}

export default Product;