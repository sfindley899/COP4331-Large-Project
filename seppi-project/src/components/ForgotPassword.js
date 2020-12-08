import React from 'react';
import 'typeface-roboto';
import {Link} from "react-router-dom"

const ForgotPassword =() => {
    
    const app_name = 'seppi'
    const buildPath = (route) => {
        if (process.env.NODE_ENV === 'production') {
        return 'https://' + app_name + '.herokuapp.com/' + route;
        }
        else {
        return 'http://localhost:5000/' + route;
        }
    }

    const forgotState = {
        email: ""
    };

    const handleChange = event => {
        setText({
          ...text,
          [event.target.name]: event.target.value
        });
      };

    const [text, setText] = React.useState(forgotState);
	const [resetResult, setResetResult] = React.useState('');

    const resetPassword = async event => {
        event.preventDefault();
        
		const response = await fetch(buildPath('resetPassword'), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: text.email,
			})
		})
		.catch((error) => console.log(error));

		let status = await response.status;
		console.log('status: ' + status);

		if (status === 200)
		{
            var x = document.getElementById("loginFooter");
            x.style.display = "block";
			setResetResult('Email to reset your password was sent.');
			return;
		}
		else
		{
            var x = document.getElementById("loginFooter");
            x.style.display = "block";
			setResetResult('This email is not associated with a Seppi account.');
			return;
		}
	};

    return(
        <div id="forgotPasswordDiv">
            <div>
                <br />
                <span id="inner-title"><h1>Forgot Password?</h1></span><br />
                <form onSubmit={resetPassword}>
                <p id="forgot-pass-prompt" style={{fontSize: "20px", width: "40%", margin: "0 auto"}}>
                Please enter your email address below and we will send you a link and instructions to reset your password.
                </p>
                <input onChange={handleChange} value={text.email} name="email" type="email" id="Email" className="form-control" style={{width: "40%", margin: "0 auto", fontSize: "25px"}} placeholder="Email" required/><br />
                 <div id="loginFooter">
                    {resetResult}
                </div>
                <button id = "forgot" className="btn btn-success mt-2" style={{height: "50px", fontSize: "25px", backgroundColor: "orange", borderColor: "transparent", borderRadius: "10px", width: "40%"}}>
                    Reset Password
                </button>
                </form>
                <div id = "switchToLogin" className="found mt-4">
                    Found your Password?{" "}
                    <Link to="/Login" style={{color: "orange"}}>
                    Login in Now
                    </Link>
                </div>
            </div>
            <br/>
            <Link className="btn btn-success mt-2" to="/LoginPage" style={{backgroundColor: "orange", borderColor: "transparent", borderRadius: "15px", width: "12%"}}>
                Go Home
            </Link>
        </div>
    );
};

export default ForgotPassword;