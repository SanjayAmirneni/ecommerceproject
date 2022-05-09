export const userReducer = (state={user:{}},action)=>{
    switch(action.type){
        case "Add_User":
            state={
                ...state,
                user:action.payload,
            }
            return state;
        
        case "Remove_User":
            state={
                ...state,
                user:action.payload,
            }
    }
    return state;
    
}