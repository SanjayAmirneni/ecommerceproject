export const productReducer = (state={product:{}},action)=>{
    switch(action.type){
        case "Add_Product":
            state={
                ...state,
                product:{...action.payload},
            }
            
    }
    return state;
    
}