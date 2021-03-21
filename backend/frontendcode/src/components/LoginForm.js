import React,{useEffect} from 'react';
import {connect} from 'react-redux';
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
    
        axios.post('https://loginapplicationsharoon.herokuapp.com/login',request)
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
    
    function myFunction(){
    let words=["a","b"];
    let wordsCount=new Map();
    for(let i=0; i<words.length; i++){
        if(wordsCount.get(words[i])===undefined)
            wordsCount.set(words[i],1);
        else
            wordsCount.set(words[i],wordsCount.get(words[i])+1);
    }
    for(let keys in wordsCount)
        console.log(keys +" "+ wordsCount[keys]);
    }


    myFunction();
    return(
        <React.Fragment>

        <img className="home" src="Graffiti.jpg"></img>
        <div className="box-layout">
        
        
        <form onSubmit={(e)=>adminData(e)}>
          <center><h4>Login Via Email</h4></center>
          <br/><br/><br/>
          <h6>Email Address</h6>
          <input type="email" id="emailid" className="form-control" name="email" placeholder="Email" required></input> 
          <hr/>
          <h6>Password</h6>     
          <input type="password" id="passid" className="form-control" name="password" placeholder="Password" required></input>                 
          <hr/>
          <button type="submit" className="button">Login</button>
          </form>    
          </div>
          </React.Fragment>
    )
    
}


export default connect()(LoginForm);