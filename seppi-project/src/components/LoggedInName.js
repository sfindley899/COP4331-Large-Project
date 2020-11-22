import React from 'react';

function LoggedInName()
{

    //var user={}

    const doLogout = event => 
    {
	    event.preventDefault();
		
        alert('doLogout');
    };    

    return(
      <div id="loggedInDiv">
        <span id="userName">Logged In As John Doe </span><br />
        <button type="button" id="logoutButton" class="buttons" 
           onClick={doLogout}> Log Out </button>
      </div>
    );
};

export default LoggedInName;
