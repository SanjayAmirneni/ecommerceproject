
export const basketReducer = (state={basket:[],},action) => {
    switch(action.type) {
        case "Add_To_Basket":
            state = {
                ...state,
                basket : [...state.basket,action.payload]
            }
            return state;
        case "Remove_From_Basket":
            const index = state.basket.findIndex(
                (ele) => ele.id === action.payload.id
            );

            let newBasket = [...state.basket];

            if(index >= 0){
                newBasket.splice(index,1);
            }else{
                console.warn(`Cant remove product (id: ${action.payload.id}) as it is not in the basket!`)

            }

            state = {
                ...state,
                basket : newBasket,
            }
            return state;  
            
        case "Empty_Basket":
            state={
                ...state,
                basket:[]
            }
    }
    return state;
    
    
}
