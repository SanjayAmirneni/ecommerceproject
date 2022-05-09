import store from "../Redux/store";

function optionChange(data){
    store.dispatch({
        type:"Option",
        payload:data,
    })
}


export default optionChange;