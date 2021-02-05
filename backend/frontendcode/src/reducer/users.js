const defaultExpense=[];
//Reducer function
const userReducer=(state=defaultExpense, action)=>{
    switch(action.type){
        case 'ADD_THE_USER':
            return [...state,action.item] 
        
        case 'RESET':
            return defaultExpense
    
        default:
            return state;
        
    }
}

export default userReducer;