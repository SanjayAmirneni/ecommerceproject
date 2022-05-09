import store from "../Redux/store";

const basketRemoveAction=(data)=>{
    store.dispatch({
        type:"Remove_From_Basket",
        payload : data,
    });
}

export default basketRemoveAction;