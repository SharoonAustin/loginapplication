import React,{useState, useEffect} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';
import AdminPanel from './AdminPanel';

class Admin extends React.Component{
   constructor(){
      super();
      this.caller=this.caller.bind(this);
      this.caller();
   }

   state={
      stateOptions:[{}],
      isadmin:false
   }
   caller = async ()=>{
      let data
      try{
      data=await axios.get('https://loginapplicationsharoon.herokuapp.com/getData')
      .then(response=>{
         return response.data;
      })
      }
      catch(err) {}
      this.setState({stateOptions:data});
      this.setState({isadmin:data[0].isadmin})
      }

  

   render()
   {
   let i=1;

   return (
   localStorage.getItem('id')!=null && localStorage.getItem('isadmin')!=null
   ?
   (  
      <React.Fragment>
      <AdminPanel isadmin={this.state.isadmin}/>
   <div className="box-layout-1">         
   <Link to="/Register"><button className="Register-Button">Add User</button></Link>
   <br/>
   <div className="container">
   <span >
   <h2 className="span-tag">Home-Admin-Users</h2>
   </span>
   <br/>
   <table className="table">
   <thead>
   <tr>
   <th>#</th>
   <th>Name</th>
   <th>Mobile</th>
   <th>Email</th>
   <th>UserName</th>
   <th>UserType</th>
   <th>Mentees</th>
   <th></th>
   </tr>
   </thead>
   <tbody>
   {this.state.stateOptions.map((item) => (
      <tr key={Math.random()}>
         <td>{i++}</td>
         <td></td>
         <td></td>
         <td>{item.email}</td>
        <td>{item.firstname}</td>
        {
         item.isadmin &&
            <td>SUPER_ADMIN</td>
        }
        {
         !item.isadmin &&
            <td>-</td>
        }
        <td>-</td>
      </tr>
   ))}
   </tbody>
   </table>
   </div>
   </div>
   </React.Fragment>
   )
   :
   (
      <React.Fragment>
      <Link to="/">Please Login as a admin to view the user details</Link>
      </React.Fragment>
   )
   )
   }
}
export default connect()(Admin);