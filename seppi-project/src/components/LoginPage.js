import React from 'react';
import PageTitle from './PageTitle';
import 'typeface-roboto';
import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom'
import UserContext from '../context'
import {useState} from 'react';
import { useCookies } from 'react-cookie';

const LoginPage = () => {

  // User's login status
  const [cookies, setCookie] = useCookies(['name', 'email', 'idToken', 'favorites']);
  const [loginResult, setLoginResult] = useState('');

  // Login button handler
  const [show, setShowLogin] = React.useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  // Register button handler
  const [showreg, setShowRegister] = React.useState(false);
  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

  // doLogin function 
  const app_name = 'seppi'
  const buildPath = (route) => {
    if (process.env.NODE_ENV === 'production') {
      return 'https://' + app_name + '.herokuapp.com/' + route;
    }
    else {
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

      setCookie('name', res.name, {path: '/'});
      setCookie('email', res.email, {path: '/'});
      setCookie('idToken', res.idToken, {path: '/'});
      setCookie('favorites', {}, {path: '/'});
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
    window.location.href = '/SearchResult';
  };
  
const [regdata, setRegData] = React.useState(UserContext);
const [signUpResult, setSignUpResult] = useState('');

const registerState = {
  name: "",
  email: "",
  password: ""
};

const [data2, setData2] = React.useState(registerState);
const handleRegChange = event => {
  setData2({
    ...data2,
    [event.target.name]: event.target.value
  });
};

const doRegister = async event => {
    event.preventDefault();

    // Validate input data
		if (data2.password !== data2.confirmPassword) {
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
				name: data2.name,
				email: data2.email,
				password: data2.password
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

  return (
    <div style={{
      backgroundImage: `linear-gradient(to top, rgba(114, 51, 51, 0) 10%, rgba(0, 100, 0, 2)), url("../images/home_page.jpeg")`, backgroundRepeat: 'no-repeat', width: '100%', height: '650px', backgroundSize: "cover"
    }}>
      <div className="MainBody">
        <div className="signIn">

          <button className="btn btn-primary" id="logIN" onClick={handleShowLogin}>
            Log In
              </button>&nbsp;&nbsp;
              <button className="btn btn-primary" id="signUP" onClick={handleShowRegister}>
            Sign Up
              </button>
        </div>
        <PageTitle/>
        <form id="searchParameter">
          <input id="search" type="text" placeholder="Search by recipe, ingredient, dish..." />
          <span className="searchImage" style={{borderRadius: "1px", width: "4%", backgroundSize: "cover", height: "50px",color: "white", position: "absolute", backgroundColor: "orange", padding: '2px', marginTop: "0.5px" }}>
            <i className="fa fa-search" style={{paddingTop: "8px", fontSize: "30px"}}></i>
          </span>
        </form>
        <br/>
        <br/>
<<<<<<< HEAD
        <Link className="btn btn-success mt-2" id = "searchFilter" to="/SearchResults">
=======
        <Link className="btn btn-success mt-2" id = "searchFilter">
>>>>>>> origin/develop
          Advanced Search
        </Link>
      </div>
      <div className="subBody">
        <div>
          <div className="Suggestions" style={{ color: 'black' }}>
            Suggested Recipes
          </div>
          <div class = "Icons">
                <div class = "leftIcon">
                  <div class = "leftInfo">
                    <h2>Try the App</h2>
                    Get the best experience through the app.
                    <br/>
                    <button id = "leftButton">Get the app</button>
                  </div>
                </div>
                <div class ="middleIcon">
                  <div class = "middleInfo">
                    <h2>Add your Ingredients</h2>
                    Refine your recipe search to include the ingredients readily available.
                    <br/>
                    <button id = "middleButton">Add to your Pantry</button>
                  </div>
                </div>
                <div class = "rightIcon">
                 <div class = "rightInfo">
                    <h2>Find a Recipe</h2>
                    Search from thousands of recipes based on the items in your inventory.
                    <br/>
                    <button id = "rightButton">Search for a Recipe</button>
                 </div>
                </div>
              </div>
              <div class = "WelcomeTo">
                <div class = "leftsidePNG"></div>
                <div class = "rightside">
                  <h1>Welcome to Seppi's Recipe Family!</h1>
                  <br/>
                  <br/>
                  <div class = "rightsideText1">Whether you are a cooking enthusiast or only have enough time to throw together lunch, Seppi's goal is to provide access to new recipes and connect to a community of other like-minded cooks.</div>
                  <br/>
                  <br/>
                  <input id = "submitEmail" type="text" placeholder = "Enter you email address"></input>
                  <button id = "submitEmailButton" onClick={handleShowRegister} >Sign Up</button>
                  <br/>
                  <br/>
                  <div class = "rightsideText2">By clicking “Sign Up” you will be directed to the sign up page to complete your registation.</div>
                </div>
              </div>
              <div class = "edamamCredit">
              </div>
        </div>
      </div>
      {/* Login Modal */}
      <Modal show={show} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title id = "inner-title">Log In To Seppi</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <form
            onSubmit={doLogin} className="loginsForm">
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
                <Link className="col-md-4 mt-4 text-left" to="/ForgotPassword" style={{color: "grey", paddingLeft: "320px"}}>
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
                <Link to="/Register" style={{color: "orange"}}>
                Register{" "}
                </Link>
              </p>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer style={{textAlign: "center"}}>
          <div id="loginFooter">
            {loginResult}
          </div>
        </Modal.Footer>
      </Modal>


      {/* Register modal */}
      <Modal show={showreg} onHide={handleCloseRegister} >
        <Modal.Header closeButton>
          <Modal.Title id="RegisterHeader">Sign up with email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{textAlign: "center"}}> 
            Already a member?<Link to="/Login" style={{color: "orange"}}> Sign In</Link>
          </div>
          <form  onSubmit={doRegister}>
            <input type="text"
              className="form-control mt-2"
              id="name"
              placeholder="Name"
              name="name"
              value={data2.name}
              onChange={handleRegChange}
              required />
            <input
              type="text"
              className="form-control mt-2"
              id="email"
              name="email"
              placeholder="Email"
              value={data2.email}
              onChange={handleRegChange}
              required />
            <input
              type="password"
              className="form-control mt-2"
              id="password"
              name="password"
              placeholder="Enter Password"
              value={data2.password}
              onChange={handleRegChange}
              required />
            <input
              type="password"
              className="form-control mt-2"
              id="PasswordConfirm"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={data2.confirmPassword}
              onChange={handleRegChange}
              required />
            <div id="passwordInfo" className="mt-2">
              Please provide a password of at least 6 characters.<br />
                    Your password must include at least 1 uppercase letter or special character.
                </div>
            <input type="submit" id="registerButton"
              className="btn btn-primary mt-3" value="Create my Account" />
          </form>
        </Modal.Body>
        <Modal.Footer style={{textAlign: "center"}}>
          <div id="registerFooter">
            {signUpResult}
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default LoginPage;