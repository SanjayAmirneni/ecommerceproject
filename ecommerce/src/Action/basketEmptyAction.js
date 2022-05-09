import store from "../Redux/store";


function basketEmpty(data){
    store.dispatch({
        type:"Empty_Basket",
        payload:data,
    })
}

export default basketEmpty;