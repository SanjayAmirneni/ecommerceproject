import React, { useEffect,useState } from "react";
import logo from "../../images/amazon.png";
import SearchIcon from '@material-ui/icons/Search.js';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import "./Header.css"
import {useSelector} from "react-redux";
import userRemoveAction from "../../Action/userRomoveAction";
import basketAddAction from "../../Action/basketAddAction";
import {Link, useNavigate} from "react-router-dom"
import axios from "axios";
import basketEmptyAction from '../../Action/basketEmptyAction'
import userAddAction from "../../Action/userAddAction";
import optionChange from "../../Action/changeOptionAction";
import { sessionService } from "redux-react-session";
import Cookies from 'js-cookie'




function Header(){

    var reduxData = useSelector((storeData)=>{
        // console.log(storeData.basketReducer.basket.length);
        return storeData;
    })

    const cookieval = Cookies.get()

    const navigate = useNavigate();
    const [search,setSearch] = useState("");

    function signout(){
        if(reduxData.userReducer.user){
                userRemoveAction(null)
                basketEmptyAction({})
                // sessionService.deleteSession('USER_DATA')
                sessionService.deleteUser();
                navigate("/");
        }
    }


    function checkSession(){
        const cookieval = Cookies.get()
        // console.log(cookieval)
        if(!Object.keys(cookieval).length>0){
            userRemoveAction(null)
                basketEmptyAction({})
                // sessionService.deleteSession('USER_DATA')
                sessionService.deleteUser();
                navigate("/");
        }

    }

    setInterval( checkSession, 60000);
  

    onmousemove=()=>{
        const cookieval = Cookies.get()
        if(Object.keys(cookieval).length>0){
            sessionService.saveUser(reduxData.userReducer.user.email)
        }
        console.log("mouse hover")
    }

    useEffect(async ()=>{


        try {
            console.log(reduxData)
            const serializedStore = window.localStorage.getItem('user');
            if(serializedStore === null) return undefined;
            reduxData.userReducer.user = (JSON.parse(serializedStore))}
            catch(e) {
                console.log(e);
                return undefined;
            }

        const res = await axios.get('http://localhost:5000/api/v1/products/getproducts',{
            params:{
            createdBy:reduxData.userReducer.user.email}
        })
        // console.log(res.data)
        // res.data.forEach(element => {
        //     basketAddAction(element)
        //     console.log(element)
        // });

        reduxData.basketReducer.basket = res.data;

        try {
            const serializedStore = JSON.stringify(reduxData);
            window.localStorage.setItem('reduxData', serializedStore);
        } catch(e) {
            console.log(e);
        }

        userRemoveAction(null)
        basketEmptyAction({})


        try {
            if(Object.keys(cookieval).length>0){
                sessionService.saveUser(reduxData.userReducer.user.email)
            }
            const serializedStore = window.localStorage.getItem('reduxData');
            if(serializedStore === null) return undefined;
            reduxData = (JSON.parse(serializedStore))
            console.log('reduxdata : ',reduxData)
            // console.log(Object.keys(cookieval).length)
            
            
            userAddAction({
                email:reduxData.userReducer.user.email,
                password:reduxData.userReducer.user.password
            });
            reduxData.basketReducer.basket.forEach(element => {
                basketAddAction(element)
            });
        } catch(e) {
            console.log(e);
            return undefined;
        }



    
    },[])

    function handleClick(){
        optionChange(search)
    }
    
    // useEffect(()=>{
    //     return ()=>{
    //         reduxData={}
    //         console.log('cleanup')
    //     }
    // },[])


    return(
        <div>
        <div className="header_container">
            <Link to="/home" style={{ textDecoration: 'none' }}>
            {/* <img className="logo" src={logo} alt="amazon"/> */}
            <h1 className="logo">Ecommerce</h1>
            </Link>
        <div className="search">
            <input className="search_input"  type="text" onChange={(e)=>setSearch(e.target.value)} />
            <SearchIcon onClick={handleClick} className="search_icon"/>
        </div>
        <div className="header_nav">
            <div className="header_option">
                <span className="header_option_1">{`Hello ${reduxData.userReducer.user?.email?reduxData.userReducer.user.email:"Guest"}`}</span>
                {/* <Link to={!reduxData.userReducer.user && "/signin"} style={{textDecoration:'none'}}> */}
                <span onClick={signout} className="header_option_2">{reduxData.userReducer.user?.email?"Sign out":"Sign in"}</span>
                {/* </Link> */}
            </div>
            <Link to="/orders">
            <div className="header_option">
                <span className="header_option_1">Returns</span>
                <span className="header_option_2">& Orders</span>
            </div>
            </Link>
            {/* <div className="header_option">
                <span className="header_option_1">Your</span>
                <span className="header_option_2">Prime</span>
            </div> */}
            <Link to="/checkout" style={{textDecoration:'none'}}>
            <div className="basket">
                <ShoppingBasketIcon />
                <span className="basket_count">{reduxData.basketReducer.basket.length}</span>
            </div>
            </Link>
        </div>
        </div>
        {/* <div className="header__options">
            <div className="header__priceoptions">
                <h3>Price</h3>

                <input type="number" placeholder="min"></input>
                <input type="number" placeholder="max"></input>

            </div>
            <form >
                 <label>
                        Sort
                <select value={dropdownvalue} onChange={handleDropdown}>
                    <option value={"-price"}>Sort by Lowest Price</option>
                    <option value={"price"}>Sort by Highest Price</option>
                    <option value={"rating"}>Sort by More Popular</option>
                    <option vlaue={"-rating"}>Sort by Less Popular</option>
                </select>
                </label>
        <input type="submit" value="Submit" />
      </form>
        </div> */}
        </div>
    )
}

export default Header;