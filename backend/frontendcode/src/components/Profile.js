import React,{useState, useEffect} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {history} from '../routers/AppRouter';
import {addTheUser,reset} from '../actions/addTheUser'
import {Link} from 'react-router-dom';

const Profile=(props)=>{

   const[email, setEmail]=useState("");
   const[firstname, setfirstname]=useState("")

   
   useEffect(()=>{
   const key=localStorage.getItem('id')
   axios.get(`http://localhost:3000/getData/${key}`)
   .then(response=>{
      setEmail(response.data.email);      
      setfirstname(response.data.firstname)
   })
   },[])   
   
   const Logout=()=>{
     localStorage.clear();
     props.dispatch(reset());
     history.push('/');
  }

  return (
   localStorage.getItem('id')!=null
   ?
   ( 
   <div className="box-layout">
   <div className="box-layout__box"> 
   <h1>Hello {firstname}</h1>
   <h4>{email}</h4>
   <h4>{firstname}</h4>
   <button onClick={()=>Logout()}>Logout</button>
   </div>
   </div>
   )
   :
   (
      <div>
      <Link to="/">Please Login as a admin to view the user details</Link>
      </div>
   )
  )
}

const connectTheData=((state)=>{
   return{
       item:state
   }
})


export default connect(connectTheData)(Profile);
