import React, { useState } from 'react';
import axios from 'axios';

const Register = props => {
    const [ confirmReg, setConfirmReg ] = useState("");
    const [ errs, setErrs ] = useState({});

    // Check this OUT!!!
    // using a single state object to hold all data!
    const [ user, setUser ] = useState({
        userName: "",
        email: "",
        pasword: "",
        confirmPassword: "",
    })

    // using a single function to update the state object
    // we can use the input's name attribute as the key in to the object
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    const register = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/user/register",
            user,       // the uer state is already an object with the
            {
                // this will force the sending of the credentials/cookies so
                // XMLHttpRequest from a different domain cannot set cookie
                // unless withCredentials is set to true before making the
                withCredentials: true,
            })
            .then(res => {
                console.lof(res.data);

                // when we successfully created teh account, reset state for
                // We do this if we are NOT navigating automatically away from
                setUser({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                })
                .catch((err) => {
                    console.log(err);
                    setErrs(err.response.data.errors);
                })
            });
    };

    return(
        <div className='register'>
            <h2>Register</h2>
            {
                confirmReg ?
                <h4 style={{color: "green"}}>{confirmReg}</h4>
                : null
            }
            <form onSubmit={register}>
                <div>
                    <label>Username</label>
                    {
                        errs.userName ?
                        <span className='error-text'>
                            {errs.userName.message}
                        </span> : null
                    }
                    <input
                    type="text"
                    name="userName"
                    value={user.userName}
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Email</label>
                    {
                        errs.email ?
                        <span className='error-text'>
                            {errs.email.message}
                        </span> : null
                    }
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Password</label>
                    {
                        errs.password ?
                        <span className='error-text'>
                            {errs.password.message}
                        </span> : null
                    }
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Confirm Password</label>
                    {
                        errs.confirmPassword ?
                        <span className='error-text'>
                            {errs.confirmPassword.message}
                        </span> : null
                    }
                    <input
                        type="password"
                        name='confirmPassword'
                        value={user.confirmPassword}
                        onChange={handleChange}
                    />
                    <div className='center'>
                        <button type='submit' className='btn btn-primary'>Register Me</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default Register;