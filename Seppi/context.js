import React, { createContext, useState } from 'react';

// Context used between many screens for user authentication purposes.
export const AuthContext = createContext();

// Context used between many screens for the user's info, such as display name, email, etc.
const UserContext = React.createContext([{}, () => {}]);

const UserProvider = (props) => {
  const [state, setState] = useState({
	  name: '',
    email: '',
    filterStack: [],

	  // TODO: add more user specific info later
  });
 
  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
