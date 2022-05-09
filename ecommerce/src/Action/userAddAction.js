import store from "../Redux/store";

function userAddAction(data){
    store.dispatch({
        type:"Add_User",
        payload: data
    })
}

export default userAddAction;