import store from "../../src/Redux/store"

const productAddAction = (data) => {
    store.dispatch({
        type:"Add_Product",
        payload : data,
    });
};

export default productAddAction;