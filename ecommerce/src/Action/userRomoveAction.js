import store from "../Redux/store";

function userRemoveAction(data){
    store.dispatch({
        type:"Remove_User",
        payload:data,
    })
}

export default userRemoveAction;