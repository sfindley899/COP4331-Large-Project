import React from 'react';
import 'typeface-roboto';
import {Link} from "react-router-dom"

class ForgotPassword extends React.Component {
    
    render () {
    return(
        <div id="forgotPasswordDiv">
            <div>
                <br />
                <span id="inner-title"><h1>Forgot Password?</h1></span><br />
                <form>
                <p id="forgot-pass-prompt" style={{fontSize: "20px", width: "40%", margin: "0 auto"}}>
                Please enter your email address below and we will send you a link and instructions to reset your password.
                </p>
                <input type="text" id="Email" className="form-control" style={{width: "40%", margin: "0 auto", fontSize: "25px"}} placeholder="Email" required/><br />
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
    }
};

export default ForgotPassword;