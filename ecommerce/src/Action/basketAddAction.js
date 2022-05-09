import store from "../../src/Redux/store"

const basketAddAction = (data) => {
    // console.log(data);
    store.dispatch({
        type:"Add_To_Basket",
        payload : data,
    });
};

export default basketAddAction;