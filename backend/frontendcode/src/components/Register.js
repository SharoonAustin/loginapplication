import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import {history} from '../routers/AppRouter';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Register=(props)=>{

    function adminData(e){
        e.preventDefault();
    
        let request={
             email: e.target.email.value,
             password: e.target.password.value,
             firstname:e.target.firstname.value
         }
    
        axios.post('https://loginapplicationsharoon.herokuapp.com/register',request)
        .then(response=>{
           
            if(response.data.status==400){
               setTimeout(()=>{
                history.push('/AdminDashboard')
            },1000)
            }
            else if(response.data.status==200){
                props.history.push('/');
            }
    
        }) 
        .catch(err=>{
            console.log(err);
        })
    } 
    
    return(
    
    localStorage.getItem('id')!=null && localStorage.getItem('isadmin')!=null
    ?
    (  
    <React.Fragment>
    <img className="home" src="Graffiti.jpg"></img>
    <div className="box-layout">
    <form onSubmit={(e)=>adminData(e)}>
      <center><h4>Add New User</h4></center>
      <br/><br/><br/>
      <input type="text" className="form-control" name="firstname" placeholder="First Name" required></input>
       <hr/>
      <input type="email" className="form-control" name="email" placeholder="Email" required></input> 
      <hr/>     
      <input type="password" className="form-control" name="password" placeholder="Password" required></input>                 
      <hr/>
      <button type="submit" className="button">Register</button>
      </form>    
      </div>
      </React.Fragment>
    )
    :(
        <div>
        <Link to="/">Please Login as a admin to register a new user</Link>
        </div>
    )
    )
}



export default connect()(Register);
