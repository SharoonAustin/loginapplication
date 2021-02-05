import {createStore} from 'redux';
import users from '../reducer/users'

export default ()=>{
    const store=createStore(users)
    return store;
}
