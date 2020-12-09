import React, {useEffect} from 'react';
import PageTitle from './PageTitle';
import 'typeface-roboto';
import Modal from 'react-bootstrap/Modal'
import { Button, Form, Col } from "react-bootstrap";
import { Link } from 'react-router-dom'
import UserContext from '../context'
import {useState} from 'react';
import Grocery1 from '../images/grocery1.png';
import Grocery2 from '../images/grocery2.png';
import Grocery3 from '../images/grocery3.png';
import { useCookies } from 'react-cookie';
import Recipe from './Recipe'

const LoginPage = () => {
  useEffect(() => {
    getRecipe();
 }, []);

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

  const [suggestions, setSuggestion] = useState([]);

  // doLogin function
  const app_name = 'seppi'
  const buildPath = (route) => {
    if (process.env.NODE_ENV === "production") {
      return "https://" + app_name + ".herokuapp.com/" + route;
    } else {
      return "http://localhost:5000/" + route;
    }
  };

  const loginState = {
    name: "",
    email: "",
    password: "",
  };

  const [data, setData] = React.useState(loginState);
  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  const doLogin = async (event) => {
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
      setLoginResult("Email/Password combination is incorrect.");
      return;
    } else if (status === 401) {
      var y = document.getElementById("loginFooter");
      y.style.display = "block";
      setLoginResult("Email not verified, please check your email.");
      return;
    } else {
      var z = document.getElementById("loginFooter");
      z.style.display = "block";
			setLoginResult('Failed to login to account due to internal server error.');
			return;
    }
    window.location.href = '/SearchResults';
  };

  const [signUpResult, setSignUpResult] = useState("");

  const registerState = {
    name: "",
    email: "",
    password: "",
  };

  const [data2, setData2] = React.useState(registerState);
  const handleRegChange = (event) => {
    setData2({
      ...data2,
      [event.target.name]: event.target.value,
    });
  };

  const doRegister = async (event) => {
    event.preventDefault();

    // Validate input data
    if (data2.password !== data2.confirmPassword) {
      var password = document.getElementById("registerFooter");
      password.style.display = "block";
      setSignUpResult("Passwords don't match.");
      return;
    }

    const response = await fetch(buildPath("register"), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data2.name,
        email: data2.email,
        password: data2.password,
      }),
    }).catch((error) => console.error(error));

    let status = await response.status;
    if (status === 200) {
      var x = document.getElementById("registerFooter");
      x.style.display = "block";
      setSignUpResult(
        "Please confirm your email address by clicking the link we sent you."
      );
      return;
    } else if (status === 400) {
      var y = document.getElementById("registerFooter");
      y.style.display = "block";
      setSignUpResult("This email is already registered.");
      return;
    } else {
      var z = document.getElementById("registerFooter");
      z.style.display = "block";
      setSignUpResult("Failed to create account due to internal server error.");
      return;
    }
  };


/*
const recipeStuff = {
  label: "",
  image: "",
  ingredients: ""
};
*/

const getRecipe = async event => {

  let arr = [];

  //Each response gets two recipes
  const response = await
   fetch(buildPath('searchRecipeTop'), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        search: 'chicken',
        idToken: cookies.idToken,
        from: 0,
        to: 100
    })

  })

  let json = JSON.parse(await response.text());
  arr.push(json);

  const response1 = await
   fetch(buildPath('searchRecipeTop'), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        search: 'vegetables',
        idToken: cookies.idToken,
        from: 0,
        to: 100
    })

  })

  json = JSON.parse(await response1.text());
  arr.push(json);

  const response2 = await
   fetch(buildPath('searchRecipeTop'), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        search: 'pasta',
        idToken: cookies.idToken,
        from: 0,
        to: 100
    })

  })

  json = JSON.parse(await response2.text());
  arr.push(json);

  setSuggestion(arr);

  //alert(JSON.stringify(arr[2].hits.top));

};




  return (

    <div class="bg-contain"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(114, 51, 51, 0) 10%, rgba(0, 100, 0, 2)), url("../images/home_page.jpeg")`,
        backgroundRepeat: "no-repeat",
        width: "100%",
        position:'relative',
        height: "100vh",
        minHeight:'768px',
        backgroundSize: "cover",
      }}
    >
      <div className="MainBody">
        <div className="signIn">
          <Button
            variant="light"
            className="btn btn-primary"
            id="logIN"
            onClick={handleShowLogin}
          >
            &nbsp;Log In&nbsp;
          </Button>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            variant="light"
            className="btn btn-primary"
            id="signUP"
            onClick={handleShowRegister}
          >
            Sign Up
          </Button>
        </div>
        <PageTitle />
        <div style={{ top: "10%", position: "relative" }}>
          <Form id="searchParameter">
            <Form.Row className="align-items-center">
              <Col>
                <Form.Label htmlFor="inlineFormInput" srOnly></Form.Label>
                <Form.Control
                  className="mb-2"
                  id="inlineFormInput"
                  placeholder="Search by Recipe, Ingredient, dish ..."
                />
              </Col>

              <Button
                variant="light"
                to="/Register"
                type="submit"
                className="mb-2 background-orange"
                style={{
                  marginLeft: "-0.35rem",
                  background: "orange",
                  textAlign: "center",
                  fontWeight: "500",
                  borderRadius: "1px solid orange",
                  border: "2px solid orange",
                  color: "white",
                }}
              >
                Search{" "}
                <img overflow="hidden" src="../images/search.png" width="20" />
              </Button>
            </Form.Row>
          </Form>

          <div class="container">
            <Button
              variant="light"
              className="btn btn-success mt-2"
              id="searchFilter"
              to="/SearchResult"
            >
              <span style={{ fontWeight: "500", textAlign: "center" }}>
                {" "}
                Advanced Search <img
                  src="../images/filter.png"
                  width="20"
                />{" "}
              </span>
            </Button>
          </div>
        </div>
      </div>
      <div className="subBody">
        <div>


        <div class="SuggestionsHeading">
          Suggested Recipes
          <br/>
          <div class="Suggestions" onClick={getRecipe}>
            <div id="FavContainer">
              <div id="FavoritesRows">
                  {suggestions !== undefined ? suggestions.map((item) => <Recipe link={item.hits.top.recipe.url} label={item.hits.top.recipe.label} image={item.hits.top.recipe.image} match={item.hits.top.recipe.match} not={item.hits.top.recipe.not}/>) : <div></div>}
                  {suggestions !== undefined ? suggestions.map((item) => <Recipe link={item.hits.second.recipe.url} label={item.hits.second.recipe.label} image={item.hits.second.recipe.image} match={item.hits.second.recipe.match} not={item.hits.top.recipe.not}/>) : <div></div>}
              </div>
          </div>
          </div>
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
      <div class="WelcomeTo">
        <div class="leftsidePNG"></div>
        <div class="rightside">
          <h1>Welcome to Seppi's Recipe Family!</h1>
          <br />
          <br />
          <div class="rightsideText1"  class="container-fluid">
            Whether you are a cooking enthusiast or only have enough time to
            throw together lunch, Seppi's goal is to provide access to new
            recipes and connect to a community of other like-minded cooks.
          </div>
          <br />
          <br />
          <Form>
            <Form.Row className="align-items-center">
              <Col>
                <Form.Label htmlFor="inlineFormInput" srOnly>
                  Name
                </Form.Label>
                <Form.Control
                  className="mb-2"
                  id="inlineFormInput"
                  placeholder="Enter Your Email Address"
                />
              </Col>

              <Button
                variant="light"
                type="submit" onChange={handleShowRegister}
                className="mb-2 background-orange"
                style={{
                  background: "orange",
                  color: "white",
                  borderRadius: "2px solid orange",
                }}
              >
                Sign Up
              </Button>
            </Form.Row>
          </Form>
          <br />
          <br />
          <div class="rightsideText2">
            By clicking “Sign Up” you will be directed to the sign up page to
            complete your registation.
          </div>

        </div>
        </div>
        <div>
        <footer
          class="container-fluid text-center text-white"
          style={{
            backgroundColor: "orange",
            position: "relative",
            bottom: "0",
            width: "100%",
            height: "4rem",
            left: "0",
            right: "0",
          }}
        >
          <div
            class="edamamCredit"
            style={{ position: "relative", float: "right" }}
          ></div>
            {" "}
          <p>Developed by COP4331-002 Group-14</p>
          <p>@2020</p>
        </footer>
      </div>

      {/* Login Modal */}
      <Modal show={show} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title id="inner-title">Log In To Seppi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={doLogin} className="loginsForm">
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
              <Link
                className="col-md-4 mt-4 text-left"
                to="/ForgotPassword"
                style={{ color: "grey", paddingLeft: "320px" }}
              >
                Forgot password?{" "}
              </Link>
            </p>
            <button id="loginButton" type="submit" className="btn btn-primary">
              Login
            </button>
            <br />
            <div className="row">
              <p className="col-md-12 mt-4 text-center" id="switchToRegister">
                Don't have an account?{" "}
                <Link to="/Register" style={{ color: "orange" }}>
                  Register{" "}
                </Link>
              </p>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer style={{ textAlign: "center" }}>
          <div id="loginFooter">{loginResult}</div>
        </Modal.Footer>
      </Modal>

      {/* Register modal */}
      <Modal show={showreg} onHide={handleCloseRegister}>
        <Modal.Header closeButton>
          <Modal.Title id="RegisterHeader">Sign up with email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ textAlign: "center" }}>
            Already a member?
            <Link to="/Login" style={{ color: "orange" }}>
              {" "}
              Sign In
            </Link>
          </div>
          <form onSubmit={doRegister}>
            <input
              type="text"
              className="form-control mt-2"
              id="name"
              placeholder="Name"
              name="name"
              value={data2.name}
              onChange={handleRegChange}
              required
            />
            <input
              type="text"
              className="form-control mt-2"
              id="email"
              name="email"
              placeholder="Email"
              value={data2.email}
              onChange={handleRegChange}
              required
            />
            <input
              type="password"
              className="form-control mt-2"
              id="password"
              name="password"
              placeholder="Enter Password"
              value={data2.password}
              onChange={handleRegChange}
              required
            />
            <input
              type="password"
              className="form-control mt-2"
              id="PasswordConfirm"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={data2.confirmPassword}
              onChange={handleRegChange}
              required
            />
            <div id="passwordInfo" className="mt-2">
              Please provide a password of at least 6 characters.
              <br />
              Your password must include at least 1 uppercase letter or special
              character.
            </div>
            <input
              type="submit"
              id="registerButton"
              className="btn btn-primary mt-3"
              value="Create my Account"
            />
          </form>
        </Modal.Body>
        <Modal.Footer style={{ textAlign: "center" }}>
          <div id="registerFooter">{signUpResult}</div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoginPage;
