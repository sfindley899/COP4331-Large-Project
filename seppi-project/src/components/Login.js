import React, { useState } from 'react';
import LoginToRegister from './LoginToRegister';
import {Link} from "react-router-dom"
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
                headers:{'Content-Type': 'application/json'}
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
                window.location.href = '/CardPage';
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
          <label htmlFor="email">Email address</label>
          <input
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
          <label htmlFor="password">Password</label>
          <input
            value={data.password}
            onChange={handleChange}
            name="password"
            type="password"
            className="form-control"
            id="loginPassword"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button><br/>
        <div className="row">
      <p> <Link className="col-md-4 mt-4 text-left" to="/ForgotPassword"  style={{color:"blue"}}>
          Forgot password?{" "}
          </Link></p>
        <p className="col-md-8 mt-4 text-right" id="switchToRegister">
          Don't have an account?{" "}
          <Link className="btn btn-primary" to="/register">
            Register
          </Link>
        </p>
</div>
      </form>
      <div>
         <span id="loginResult">{message}</span>
       </div>
        </div>
      </div>

    );
};

export default Login;
