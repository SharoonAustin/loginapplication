import React from 'react'
import {Link} from 'react-router-dom';

const IncorrectLogin=()=>{
    return(
        <div>
        <Link to="/">Either you are not registered or your Email/Password is incorrect. Click here to try again</Link>
        </div>
    )
}
export default IncorrectLogin;