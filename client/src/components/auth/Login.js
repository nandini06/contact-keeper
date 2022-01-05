import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = (props) => {
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const navigate = useNavigate();

    const {login, error, clearErrors, isAuthenticated} = authContext;
    const { setAlert } = alertContext;

    useEffect(() => {
        if(isAuthenticated){
            navigate('/home');
        }
        if(error === 'Invalid Credentials'){
            setAlert(error,'danger');
            clearErrors();
        }
        //eslint-disable-next-line
    }, [error, isAuthenticated]);

    const [user, setUser] = useState({
        email : '',
        password : ''
    });

    const { email, password } = user;

    const onChange = (e) => {
        setUser({...user,[e.target.name]: e.target.value});
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(email === '' || password === '') {
            setAlert('Please fill in all required fields', 'danger');
        } else {
            login({ email, password});
        }
    }

    return (
        <div className="form-container"> 
            <h1>
                Account <span className="text-primary">Login</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={email} 
                        onChange={onChange} 
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={password} 
                        onChange={onChange} 
                        required
                    />
                </div>
                <input type="submit" value="Login" className="btn btn-primary btn-block"/>
            </form>
        </div>
    )
}

export default Login;
