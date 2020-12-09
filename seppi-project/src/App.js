import React, { useContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import CardPage from './components/CardPage';
import SearchResult from './components/SearchResult';
import NotSignedIn from './components/NotSignedIn';
import { CookiesProvider } from 'react-cookie';

import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

function App() {
  const [state, setState] = useState({
	  name: '',
    email: '',
    filterStack: [],
    categories: {},
    expiring: [],
    list: {response: [], numChecked: 0},
    idToken: '',
  });

  return (

      <CookiesProvider>
      <div className="App">
        {/* <Router>      */}
          <Switch>
            <Route  path="/CardPage"><CardPage/></Route>
            <Route  path="/ForgotPassword"><ForgotPassword/></Route>
            <Route  path="/Register"><Register/></Route>
            <Route  path="/Login"><Login/></Route>
            <Route  path="/SearchResult"><SearchResult/></Route>
            <Route  path="/NotSignedIn"><NotSignedIn/></Route>
          <LoginPage path="/"/>

          </Switch>
          {/* </Router> */}
      </div>
      </CookiesProvider>
  );
}

export default App;
