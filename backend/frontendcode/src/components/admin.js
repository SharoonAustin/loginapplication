import React,{useState, useEffect} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {history} from '../routers/AppRouter';
import {addTheUser,reset} from '../actions/addTheUser'
import {Link} from 'react-router-dom';

class Admin extends React.Component{
   constructor(){
      super();
      this.caller=this.caller.bind(this);
      this.caller();
   }
   state={
      stateOptions:[{}]
   }

   caller=()=>{
   axios.get('https://loginapplicationsharoon.herokuapp.com/getData')
   .then(response=>{
      const data=response.data;
      this.setState({stateOptions: data});
   })  
   }

   Logout=()=>{
     localStorage.clear();
     this.props.dispatch(reset());
     history.push('/');
   }

   render()
   {
   return (
   localStorage.getItem('id')!=null && localStorage.getItem('isadmin')!=null
   ?
   (  
   <div className="box-layout">
   <div className="container">          
   <table className="table">
   <thead>
   <tr>
   <th>First-Name</th>
   <th>Email</th>
   <th><Link to="/Register"><button>Register</button></Link></th>
   </tr>
   </thead>
   <tbody>
   {this.state.stateOptions.map((item) => (
      <tr key={item._id}>
        <td>{item.firstname}</td>
        <td>{item.email}</td>
      </tr>
   ))}
   </tbody>
   </table>
   <button onClick={()=>this.Logout()}>Logout</button>
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
}
export default connect()(Admin);