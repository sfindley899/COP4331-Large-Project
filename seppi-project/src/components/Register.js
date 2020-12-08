import React from 'react';
import 'typeface-roboto';
import {Link} from "react-router-dom"
import {AuthContext, UserContext}from '../context'
import {useState, useContext} from 'react';

const Register =() => {
   
    const app_name = 'seppi'
    const buildPath = (route) => {
        if (process.env.NODE_ENV === 'production') {
        return 'https://' + app_name + '.herokuapp.com/' + route;
        }
        else {
        return 'http://localhost:5000/' + route;
        }
    }

    const [regdata, setRegData] = React.useState(UserContext);
    const [signUpResult, setSignUpResult] = useState('');
    
    const handleRegChange = event => {
        setRegData({
          ...regdata,
          [event.target.name]: event.target.value
        });
      };

    const doRegister = async event => {
        event.preventDefault();
        //	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
        // Validate input data
            if (regdata.password !== regdata.confirmPassword) {
                var password = document.getElementById("registerFooter");
                password.style.display = "block";
                setSignUpResult('Passwords don\'t match.');
                return;
        }
        
            const response = await fetch(buildPath('register'), {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: regdata.name,
                    email: regdata.email,
                    password: regdata.password
                })
            })
        .catch((error) => console.error(error));
        
            let status = await response.status;
            if (status === 200) {
                var x = document.getElementById("registerFooter");
                x.style.display = "block";
                setSignUpResult('Please confirm your email address by clicking the link we sent you.');
                return;
        }
            else if (status === 400) {
                var y = document.getElementById("registerFooter");
                y.style.display = "block";
                setSignUpResult('This email is already registered.');
                return;
            }
            else {
                var z = document.getElementById("registerFooter");
                z.style.display = "block";
                setSignUpResult('Failed to create account due to internal server error.');
                return;
            }
    };

    return(
        <div class="registerDiv" 
        style={{width: "40%", textAlign: "center", margin: "0 auto"}}>
                <br/>
                <br/>
                <br/>
                <h1>
                    Sign up with email
                </h1><br/>
                 <div> Already a member?<Link to="/Login" style={{color: "orange"}}> Sign In</Link>
                </div>
                <form onSubmit={doRegister}>
                <input type="text" 
                className="form-control mt-2" 
                id="name" 
                placeholder="Name"
                name="Name"
                value={regdata.name}
                onChange={handleRegChange}
                required/>
                <input 
                type="text" 
                className="form-control mt-2" 
                id="email" 
                name="email"
                placeholder="Email" 
                value={regdata.email}
                onChange={handleRegChange}
                required/>
                <input 
                type="password" 
                className="form-control mt-2" 
                id="password" 
                name="password"
                placeholder="Enter Password"
                value={regdata.password}
                onChange={handleRegChange}
                required/>
                <input 
                type="password" 
                className="form-control mt-2" 
                id="PasswordConfirm" 
                name="confirmPassword"
                placeholder="Confirm Password"
                value={regdata.confrirmPassword}
                onChange={handleRegChange}
                required/>
                <div id = "passwordInfo" className="mt-2">
                    Please provide a password of at least 6 characters.<br/>
                    Your password must include at least 1 uppercase letter or special character.
                </div>
                <input type="submit" id="registerButton" 
                className="btn btn-primary mt-3" value = "Create my Account"/>
                </form>
                <br/>
                <Link className="btn btn-success mt-2" to="/LoginPage" style={{backgroundColor: "orange", borderColor: "transparent", borderRadius: "15px", width: "30%"}}>
                    Go Home
                </Link>
                <div id="registerFooter" style={{backgroundColor: "white", color: "black"}}>
                    {signUpResult}
                </div>
            </div>

    );
};

export default Register;