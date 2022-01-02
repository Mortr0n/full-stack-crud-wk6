import React from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';

const Header = (props) => {

    const logout = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/user/logout', {
            // no body required for this request, but a post requires
            // data as a 2nd paramater if we plan to send it with the configuration se
            // settings so we give it an empty object
        }, {
            withCredentials: true,
        })
        .then((res) => {
            console.log(res.data);
            navigate('/logreg');
        })
        .catch((err) => {
            console.log(err);
        });
    };



    return(
        <div className='header'>
            <Link className='btn btn-primary me-2' to="/all" >Home</Link>
            <Link className='btn btn-success me-2' to="/new">Create Restaurant</Link>
            <button className='btn btn-danger' onClick={(e) => logout(e)}>Logout</button>
        </div>
    )

}
export default Header;