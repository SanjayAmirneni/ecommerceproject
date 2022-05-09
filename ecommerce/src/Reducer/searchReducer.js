export const searchReducer = (state={option:""},action)=>{
    switch(action.type){
        case "Option":
            state={
                ...state,
                option:action.payload,
            }
    }
    return state;
}