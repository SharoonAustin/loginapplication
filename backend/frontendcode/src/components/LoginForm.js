import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import {addTheUser} from '../actions/addTheUser'
import {history} from '../routers/AppRouter';
import {reset} from '../actions/addTheUser'

import axios from 'axios';

const LoginForm=(props)=>{
    
    useEffect(()=>{
        localStorage.clear();
        props.dispatch(reset());
    },[])
    
    function adminData(e){
        e.preventDefault();
    
        let request={
             email: e.target.email.value,
             password: e.target.password.value
         }
    
        axios.post('http://localhost:3000/login',request)
        .then(response=>{
           
            if(response.data.status==401){
                const data=response.data.Message
                localStorage.setItem('id',data[0]._id);
                localStorage.setItem('isadmin',data[0].isadmin);
                history.push('/AdminDashboard')
            }
            else if(response.data.status==400){
                localStorage.setItem("id",response.data.Message._id);
                history.push('/Profile');
            }
            else{
                history.push('/IncorrectLogin');
            }
    
        }) 
        .catch(err=>{
            console.log(err);
        })
    } 
    
    return(
        <div className="box-layout">
        <form onSubmit={(e)=>adminData(e)}>
          <input type="email" id="emailid" className="form-control" name="email" placeholder="Email" required></input> 
          <hr/>     
          <input type="password" id="passid" className="form-control" name="password" placeholder="Password" required></input>                 
          <hr/>
          <button type="submit" className="button">Login</button>
          </form>    
          </div>
  
    )
    
}


export default connect()(LoginForm);