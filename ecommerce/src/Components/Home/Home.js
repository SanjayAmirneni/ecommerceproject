import React,{useEffect,useState} from "react";
import "./Home.css"
import Product from "../Product/Product";
import EcommerceImg from "../../ecommerce.jpg"
import axios from "axios";
import {useSelector} from 'react-redux'
import ReactPaginate from "react-paginate";
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import productAddAction from "../../Action/productAddAction";
import {sessionService} from 'redux-react-session'

function Home(){

    const reduxData = useSelector((storeData)=>{
        return storeData;
    })
    const cookieval = Cookies.get()
    const [products,setProducts] = useState([]);
    const [currentItems,setCurrentItems] = useState(null);
    const [pageCount,setPageCount] = useState(0);
    const [itemOffset,setItemOffset] = useState(0);
    var itemsPerPage = 9;
    const navigate = useNavigate()

    useEffect(  async ()=>{
        var option = reduxData.searchReducer.option?.toLowerCase()
        const response  = await axios.get(`http://localhost:5000/api/v1/productitem/getproducts`,{params:{
            category:option,
        }})
        console.log(response)
        // console.log(response.data);
        setProducts(response.data);
        setItemOffset(0)
    },[reduxData.searchReducer])

    useEffect(()=>{
        // sessionService.saveUser(userData.data[0].mailID)
        // console.log(Object.keys(cookieval).length)
        // console.log(sessionService.checkAuth())
        // console.log( Object.keys(reduxData.sessionReducer.user).length)
        Object.keys(cookieval).length>0? navigate('/home'):navigate('/')
        // reduxData.sessionReducer.user?navigate('/home'):navigate('/')
    },[])

    useEffect(()=>{
        const endOffset = itemOffset + itemsPerPage;
        const items = products.slice(itemOffset,endOffset)
        setCurrentItems(items);
        const pagecount = (Math.ceil(products.length/itemsPerPage))
        setPageCount(pagecount);
        // console.log(items,pagecount)
        // console.log(pageCount);
        // console.log(itemOffset);
        // console.log(currentItems);
        // console.log(endOffset);
    },[itemOffset,itemsPerPage,products]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % products.length;
        console.log(
          `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
      };

      function print(){
    //     console.log(pageCount);
    //     console.log(itemOffset);
    //     console.log(currentItems);
      }


    //   function productview(data){

    //     //   console.log('clicked')
    //     productAddAction(data)
    //     navigate('/productview')
    //   }

    return(
        <div className="home">

            <div>
            <div onClick={print} className="home__img">
            <img className="home__image" src={EcommerceImg} />
            </div>
            <div className="home__row">

                {currentItems?.map(ele=>{
                    return <div  key={ele._id}><Product  
                                id={ele.id}
                                title={ele.title}
                                price={ele.price}
                                rating={ele.rating}
                                image={ele.image}
                                des = {false} /></div>
                })}
                

            </div>
            <div >
            <ReactPaginate className="page__btns"
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    // pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                />
                </div>
            </div>
            
        </div>
    )
}

export default Home;