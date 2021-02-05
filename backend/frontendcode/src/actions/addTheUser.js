
export const addTheUser=( {isadmin= false, _id= "", firstname= "", email= "", password= "", __v= 0})=>{
    return{
        type:'ADD_THE_USER',
        item:{isadmin,firstname,email,_id}
    }
}

export const reset=()=>{
    return{
        type:'RESET'
    }
}