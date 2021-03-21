import React,{useState, useEffect} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';
import AdminPanel from './AdminPanel';

class Profile extends React.Component{
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
      const key=localStorage.getItem('id');
      let data
      try{
      data=await axios.get(`https://loginapplicationsharoon.herokuapp.com/getData/${key}`)
      .then(response=>{
         return response.data;
      })
      }
      catch(err) {}
      this.setState({stateOptions:data});
      this.setState({isadmin:data.isadmin})
      }

   render()
   {
   let i=1;

   return (
   localStorage.getItem('id')!=null
   ?
   (  
      <React.Fragment>
      <AdminPanel isadmin={this.state.isadmin}/>
   <div className="box-layout-1">         
   <br/>
   <div className="container">
   <span >
   <h2 className="span-tag">User-Detail</h2>
   </span>
   <br/><br/>
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
      <tr key={Math.random()}>
         <td>{i++}</td>
         <td></td>
         <td></td>
         <td>{this.state.stateOptions.email}</td>
        <td>{this.state.stateOptions.firstname}</td>
        {
         this.state.stateOptions.isadmin &&
            <td>SUPER_ADMIN</td>
        }
        {
         !this.state.stateOptions.isadmin &&
            <td>-</td>
        }
        <td>-</td>
      </tr>
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
export default connect()(Profile);


