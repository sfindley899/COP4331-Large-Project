import React, { useState } from 'react';
import {Link} from "react-router-dom"
import {AuthContext, UserContext}from '../context'

const Login=() => {
    const app_name = 'seppi'

    const buildPath=(route)=> {
        if (process.env.NODE_ENV === 'production') 
        {
            return 'https://' + app_name +  '.herokuapp.com/' + route;
        }
        else
        {        
            return 'http://localhost:5000/' + route;
        }
    }
    const initialState = {
        email: "",
        password: "",
          };
        const [data, setData] = React.useState(initialState);
        const   [message, setMessage] = React.useState('')  
    const handleChange = event => {
      setData({
        ...data,
        [event.target.name]: event.target.value
      });
    };
    const doLogin = async event => {
        event.preventDefault();
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        var obj = {email: data.email.value,
                   password:data.password.value
                   };
        var js = JSON.stringify(obj);
        // alert(js);
        try
        {    
            const response = await fetch(buildPath('api/login'),
                {method:'POST',
                body:js,
                headers:{Accept: 'application/json',
                         'Content-Type': 'application/json'
                }
            });

            var res = JSON.parse(await response.text());
            alert(res);
            if( res.id <= 0 )
            {
                setMessage('User/Password combination incorrect');
            }
            else
            {
                var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));

                setMessage('');
                window.location.href = '/SearchResult';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };

    return(
       <div className="loginForm">
        <div className="container">
        <form 
        onSubmit={doLogin} className="loginsForm">
        <h1>Login To Seppi</h1>
        <div className="form-group">
          <input
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            name="email"
            type="email"
            className="form-control"
            id="loginEmail"
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            name="password"
            type="password"
            className="form-control"
            id="loginPassword"
            required
          />
        </div>
        <p>
            <Link className="col-md-4 mt-4 text-right" to="/ForgotPassword" style={{color: "grey", paddingLeft: "385px"}}>
            Forgot password?{" "}
            </Link>
        </p>
            <button id = "loginButton" type="submit" className="btn btn-primary">
            Login
            </button>
            <br />
            <div className="row">
        <p className="col-md-12 mt-4 text-center" id="switchToRegister">
            Don't have an account?{" "}
            <Link to="/register" style={{color: "orange"}}>
            Register{" "}
            </Link>
        </p>
        </div>
      </form>
      <br/>
        <Link className="btn btn-success mt-2" to="/LoginPage" style={{backgroundColor: "orange", borderColor: "transparent", borderRadius: "15px", width: "30%"}}>
            Go Home
        </Link>
      <div>
         <span id="loginResult">{message}</span>
       </div>
        </div>
      </div>

    );
};

export default Login;
