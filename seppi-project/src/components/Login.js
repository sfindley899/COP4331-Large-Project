import React, {useState, useContext} from 'react';
import {Link} from "react-router-dom"
import {UserContext}from '../context'

const Login=() => {
    const app_name = 'seppi'
    // User's login status
    const [state, setState] = useContext(UserContext);
    const [loginResult, setLoginResult] = useState('');

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
    const loginState = {
      name: "",
      email: "",
      password: "",
    };
  
    const [data, setData] = React.useState(loginState);
    const handleChange = event => {
      setData({
        ...data,
        [event.target.name]: event.target.value
      });
    };
    const doLogin = async event => {
      event.preventDefault();
      const response = await fetch(buildPath('login'), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        })
      })
      .catch((error) => console.error(error));
      let status = await response.status;
      if (status === 200) {
        var res = JSON.parse(await response.text());
        setState(state => ({ ...state, name: res.name, email: res.email, idToken: res.idToken }));
        window.location.href = '/SearchResult';
      }
      else if (status === 400) {
        var x = document.getElementById("loginFooter");
        x.style.display = "block";
        setLoginResult('Email/Password combination is incorrect.');
        return;
      }
      else if (status === 401) {
        var y = document.getElementById("loginFooter");
        y.style.display = "block";
        setLoginResult('Email not verified, please check your email.');
        return;
      }
      else {
        var z = document.getElementById("loginFooter");
        z.style.display = "block";
        setLoginResult('Failed to login to account due to internal server error.');
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
        <div id="loginFooter" style={{textAlign: "center", backgroundColor: "white", color: "black"}}>
            {loginResult}
        </div>
        </div>
      </div>

    );
};

export default Login;
