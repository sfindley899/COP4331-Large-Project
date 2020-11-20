import React from 'react';
import LoginPage from './LoginPage';
import 'typeface-roboto';
import {Link} from "react-router-dom"
class ForgotPassword extends React.Component {
    
    forgotFormat = {
        width: '90%',
        minHeight: '500px',
        position: 'absolute',
        top: '45%',
        marginTop: '-200px',
        backgroundColor: '#fff',
        borderRadius: '2px',
        zIndex: '100',
        padding: '15px',
        boxShadow: '0px 0px 4px rgba(0,0,0,.14),0px 4px 8px rgba(0,0,0,.28)',
      }

    render () {
    return(
        <div id="forgotPasswordDiv">
            <div>
                <br />
                <span id="inner-title"><h1>Forgot Password?</h1></span><br />
                <form>
                <p id="forgot-pass-prompt" style={{fontSize: "20px"}}>Please enter your email address below and we will send you a link and instructions to reset your password.</p>
                <input type="text" id="Email" className="form-control" style={{width: "50%", margin: "0 auto"}} placeholder="Email" required/><br />
                <br />
                <button id = "forgot">
                    Reset Password
                </button>
                </form>
                <div id = "switchToLogin" className="found mt-4">
                    Found that Password <Link className="btn btn-primary" to="/Login">
            Login
          </Link>
                </div>
            </div>
            <Link className="btn btn-success mt-2" to="/LoginPage">
           Go Home
          </Link>
        </div>
    );
    }
};

export default ForgotPassword;