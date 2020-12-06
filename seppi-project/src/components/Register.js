import React from 'react';
import 'typeface-roboto';
import {Link} from "react-router-dom"

const Register =() => {
   
    const initialState = {
        firstName: "",
          lastName: "",
          email: "",
        password: "",
        confirmPassword: ""      
    };
    const [data, setData] = React.useState(initialState);
    
    const handleChange = event => {
        setData({
          ...data,
          [event.target.name]: event.target.value
        });
      };

    //  registerFormat = {
    //     width: '90%',
    //     minHeight: '500px',
    //     position: 'absolute',
    //     top: '45%',
    //     marginTop: '-200px',
    //     backgroundColor: '#fff',
    //     borderRadius: '2px',
    //     zIndex: '100',
    //     padding: '15px',
    //     boxShadow: '0px 0px 4px rgba(0,0,0,.14),0px 4px 8px rgba(0,0,0,.28)',
    //   }

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
                <form>
                <input type="text" 
                className="form-control mt-2" 
                id="firstname" 
                placeholder="Firstname"
                name="firstName"
                value={data.firstName}
                onChange={handleChange} 
                required/>
                <input type="text" 
                className="form-control mt-2" 
                id="lastname" 
                name="lastName"
                placeholder="Lastname"
                value={data.lastName}
                onChange={handleChange} 
                required/>
                <input 
                type="text" 
                className="form-control mt-2" 
                id="email" 
                name="email"
                placeholder="Email" 
                value={data.email}
                onChange={handleChange} 
                required/>
                <input 
                type="password" 
                className="form-control mt-2" 
                id="password" 
                name="password"
                placeholder="Enter Password"
                value={data.password}
                onChange={handleChange}  
                required/>
                <input 
                type="password" 
                className="form-control mt-2" 
                id="PasswordConfirm" 
                name="confirmPassword"
                placeholder="Confirm Password"
                value={data.confrirmPassword}
                onChange={handleChange}  
                required/>
                <div id = "passwordInfo" className="mt-2">
                    Please provide a password of at least 6 characters.<br/>
                    Your password must include at least 1 uppercase letter or special character.
                </div>
                <input type="submit" id="registerButton" 
                // onClick= {alert('registeration successful')} 
                className="btn btn-primary mt-3" value = "Create my Account"/>
                </form>
                <br/>
                <Link className="btn btn-success mt-2" to="/LoginPage" style={{backgroundColor: "orange", borderColor: "transparent", borderRadius: "15px", width: "30%"}}>
                    Go Home
                </Link>
            </div>

    );
};

export default Register;