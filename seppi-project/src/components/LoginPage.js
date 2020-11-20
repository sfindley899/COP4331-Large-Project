import React from 'react';
import PageTitle from './PageTitle';
import SkyLight from 'react-skylight';
import 'typeface-roboto';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import Login from './Login'
import Register from './Register'

const LoginPage = () => {
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

  // login state
  const initialState = {
    email: "",
    password: "",
  };
  const [data, setData] = React.useState(initialState);
  const [message, setMessage] = React.useState('')
  const handleChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };
  const doLogin = async event => {
    event.preventDefault();

    var obj = {
      email: data.email.value,
      password: data.password.value
    };
    var js = JSON.stringify(obj);
    // alert(js);
    try {
      const response = await fetch(buildPath('api/login'),
        {
          method: 'POST',
          body: js,
          headers: { 'Content-Type': 'application/json' }
        });

      var res = JSON.parse(await response.text());
      alert(res);
      if (res.id <= 0) {
        setMessage('User/Password combination incorrect');
      }
      else {
        var user = { firstName: res.firstName, lastName: res.lastName, id: res.id }
        localStorage.setItem('user_data', JSON.stringify(user));

        setMessage('');
        window.location.href = '/CardPage';
      }
    }
    catch (e) {
      alert(e.toString());
      return;
    }
  };
  
// Register state
  const regState = {
    firstName: "",
      lastName: "",
      email: "",
    password: "",
    confirmPassword: ""      
};
const [regdata, setRegData] = React.useState(regState);

const handleRegChange = event => {
    setRegData({
      ...data,
      [event.target.name]: event.target.value
    });
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
        <PageTitle />
        <form id="searchParameter">
          <input id="search" type="text" placeholder="Search" /><span className="search" style={{ position: "absolute", backgroundColor: "white", padding: '2px', marginTop: "0.5px" }}><i className="fa fa-search" ></i></span>
        </form>
        <div className="centered">
        </div>
      </div>
      <div className="subBody">
        <div>
          <div className="Suggestions" style={{ color: 'white' }}>
            Suggested Recipes
              </div>
        </div>
      </div>
      {/* Login Modal */}
      <Modal show={show} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Login To Seppi</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <form
            onSubmit={doLogin} className="loginsForm">
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
        </button><br />
            <div className="row">
              <p> <Link className="col-md-4 mt-4 text-left" to="/ForgotPassword" style={{ color: "blue" }}>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLogin}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseLogin}>
            Save Changes
          </Button>
          <span id="loginResult">{message}</span>
        </Modal.Footer>
      </Modal>


      {/* Register modal */}
      <Modal show={showreg} onHide={handleCloseRegister} >
        <Modal.Header closeButton>
          <Modal.Title>Sign up with email</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <div> Already a member?<Link className="btn btn-primary" to="/Login"> Sign In</Link>
          </div>
          <form>
            <input type="text"
              className="form-control mt-2"
              id="firstname"
              placeholder="Firstname"
              name="firstName"
              value={regdata.firstName}
              onChange={handleRegChange}
              required />
            <input type="text"
              className="form-control mt-2"
              id="lastname"
              name="lastName"
              placeholder="Lastname"
              value={regdata.lastName}
              onChange={handleRegChange}
              required />
            <input
              type="text"
              className="form-control mt-2"
              id="email"
              name="email"
              placeholder="Email"
              value={regdata.email}
              onChange={handleRegChange}
              required />
            <input
              type="password"
              className="form-control mt-2"
              id="password"
              name="password"
              placeholder="Enter Password"
              value={regdata.password}
              onChange={handleRegChange}
              required />
            <input
              type="password"
              className="form-control mt-2"
              id="PasswordConfirm"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={regdata.confrirmPassword}
              onChange={handleRegChange}
              required />
            <div id="passwordInfo" className="mt-2">
              Please provide a password of at least 6 characters.<br />
                    Your password must include at least 1 uppercase letter or special character.
                </div>
            <input type="submit" id="registerButton"
              // onClick= {alert('registeration successful')} 
              className="btn btn-primary mt-3" value="Create my Account" />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRegister}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseRegister}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default LoginPage;