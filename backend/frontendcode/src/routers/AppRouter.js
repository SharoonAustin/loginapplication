import {Router, Route, Switch, Link, NavLink} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import React from 'react'
import LoginForm from '../components/LoginForm';
import Profile from '../components/Profile';
import Register from '../components/Register';
import Admin from '../components/Admin';
import IncorrectLogin from '../components/IncorrectLogin'
export const history= createHistory();

const AppRouter=()=>
    (
    <Router history={history}>
    <div>
    <Switch>
    <Route path="/" component={LoginForm} exact={true} />
    <Route path="/Profile" component={Profile}/>
    <Route path="/AdminDashboard" component={Admin}/>
    <Route path="/IncorrectLogin" component={IncorrectLogin}/>
    <Route path="/Register" component={Register}/>

    </Switch>
    </div>
    </Router>
)

 export default AppRouter;