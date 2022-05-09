import React,{useEffect,useState} from "react";
import { useNavigate} from 'react-router-dom'
import Product from "../Product/Product";
import { useSelector } from "react-redux";
import './ProductView.css'
import { StoreMallDirectorySharp } from "@material-ui/icons";


function ProductView(){

    const navigate = useNavigate()

    const reduxData = useSelector((storeData)=>{
        return storeData
    })

    const [props,setProps] = useState({})

    

    function back(){
        navigate('/home')
    }

    useEffect(()=>{
        setProps(reduxData.productReducer.product)
        console.log(props)
    },[])

    return (
        <div className="product__container">
        <div className="product__section">
            {/* <h1>Product View</h1> */}
            <Product  
                                id={props.id}
                                title={props.title}
                                price={props.price}
                                rating={props.rating}
                                image={props.image}
                                des={true} />
            
        </div>
        <button className="button" onClick={back}>Home</button>
        </div>
    )
}

export default ProductView