import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import CardPage from './components/CardPage';
import SearchResult from './components/SearchResult';
import NotSignedIn from './components/NotSignedIn';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";


function App() {
  return (
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
  );
}

export default App;
