import React, { createContext } from 'react';

// Context used between many screens for the user's info, such as display name, email, etc.
const UserContext = createContext();
export default UserContext;