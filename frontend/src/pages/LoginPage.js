import React from 'react';
import PageTitle from '../components/PageTitle';

const LoginPage = () =>
{

    return(
      <div>
          <div class = "signIn">
          <button id = "logIN" >
            Log In
            </button>
            <button id = "signUP" >
            Sign Up
            </button>
          </div>
          <div class = "backGround">
            <PageTitle />
            <form id = "searchParameter">
               <input id = "search" type="text" placeholder = "Find a Recipe"></input>
            </form>
            <div class = "centered">
            </div>
          </div>
      </div>
    );
};

export default LoginPage;
