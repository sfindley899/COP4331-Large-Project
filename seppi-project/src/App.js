import React, { useContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import CardPage from './components/CardPage';
import SearchResults from './components/SearchResults';
import FavoriteRecipes from './components/FavoriteRecipes';
import { CookiesProvider } from 'react-cookie';
import UserContext from './context';

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
    favorites: []
  });

  return (
      <UserContext.Provider value={[state, setState]}>
      <CookiesProvider>
      <div className="App">
        {/* <Router>      */}
          <Switch>
            <Route  path="/CardPage"><CardPage/></Route>
            <Route  path="/ForgotPassword"><ForgotPassword/></Route>
            <Route  path="/Register"><Register/></Route>
            <Route  path="/Login"><Login/></Route>
            <Route  path="/SearchResults"><SearchResults/></Route>
            <Route  path="/FavoriteRecipes"><FavoriteRecipes/></Route>
          <LoginPage path="/"/>

          </Switch>
          {/* </Router> */}
      </div>
      </CookiesProvider>
      </UserContext.Provider>
  );
}

export default App;
