import React from 'react';
import {reset} from '../actions/addTheUser'
import {connect} from 'react-redux';
import {history} from '../routers/AppRouter';


const AdminPanel=(props)=>{
    
    const Logout=()=>{
        localStorage.clear();
        props.dispatch(reset());
        history.push('/');
     }

    return(
        <div className="sidenav">
      <img className="logo" src="Career-Ninja.jpg"></img>
      <a href="#about">Dashboard</a>
      <a href="#services">Users</a>
      {props.isadmin && <a href="#clients">Admin Users</a>}
      <a href="#clients">Whatsapp</a>
      <br/><br/>
      <button className="logout-button" onClick={Logout}>Logout</button>
      </div>
    )
}

export default connect()(AdminPanel);
