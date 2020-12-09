import React, { useState, useContext } from 'react';
import 'typeface-roboto';
import Modal from 'react-bootstrap/Modal'
import Nav from 'react-bootstrap/Nav'
import AccountButton from './AccountButton';
import { useCookies } from 'react-cookie';
import UserContext from '../context';

const SearchResult = () => {
  const [state, setState] = useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies(['name', 'email', 'idToken', 'favorites']);
  const [show, setList] = React.useState(false);
  const [showAccount, setShowAccount] = React.useState(false);
  const [accountModalPath, setAccountModalPath] = React.useState('');
  const [changeAccountInfoResult, setChangeAccountInfoResult] = React.useState('');
  const handleCloseList = () => setList(false);
  const handleShowList = () => setList(true);
  const handleShowAccount = () => setShowAccount(!showAccount);

  const app_name = 'seppi'
  const buildPath = (route) => {
    if (process.env.NODE_ENV === 'production') {
      return 'https://' + app_name + '.herokuapp.com/' + route;
    }
    else {
      return 'http://localhost:5000/' + route;
    }
  }

  document.body.style.height = "100vh";

  const openFavorites = event => {
    {/*Function to produce object inside Results div depending on if the user is logged in or not*/}

    return(
      <div></div>
    );
  }

  const fetchFavorites = async () => {
    const response = await fetch(buildPath('getFavorites'), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          idToken: cookies.idToken,
        })
    }).catch(error => console.error(error));

    let status = await response.status;

    if (status !== 200) {
      console.log('Could not fetch favorites.');
      return;
    }

    let json = JSON.parse(await response.text());
    setState(state => ({ ...state, favorites: json.favorites}));

    //setCookie('favorites', json.favorites, {path: '/'});
  };

  const displayResults = event => {
    document.getElementById("Results").style.display = "block";
  }

  const hideResults = event => {
    document.getElementById("Results").style.display = "none";
  }

  const tempFavButton = event => {
    window.location.href = '/FavoriteRecipes';
  }

  const handleBackButton = () => {
    setAccountModalPath("");
  }

  const renderAccountModalTitle = () => {
    if (accountModalPath === "Change Account Information") {
      return (
        <div class="accountModalTitle">
              <div class="modal-account-top-bar">
                <button onClick={handleBackButton} class="btn">
                  <img src={require('../images/left-arrow.png')}/>
                </button>
              </div>
              <span class="modal-title-text">Account Information</span>
              <span class="modal-subtitle-text">Update Account Information</span>
        </div>
      );
    }
    else if (accountModalPath === "") {
      return (
        <div class="accountModalTitle">
          <div class="accountModalTitle">
            <span id="helloText" class="modal-title-text">
              Hello, {cookies.name}!
            </span>
            <span id="emailText" class="modal-subtitle-text">
              {cookies.email}
            </span>
          </div>
          <span class="modal-subtitle-text">Navigate To</span>
        </div>
      );
    }
  };

  const changeAccountInfo = async event => {
    event.preventDefault();

    let name = document.getElementById('inputAccountName').value

    const response = await fetch(buildPath('changeDisplayName'), {
      method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
        idToken: cookies.idToken,
        displayName: name
			})
    }).catch(error => console.error(error));

    let status = await response.status;
    let json = JSON.parse(await response.text());

    if (status === 200) {
      setCookie('name', name, {path: '/'});
    }
    else {
      setChangeAccountInfoResult('Failed to change account info.');
      return;
    }

    setChangeAccountInfoResult('Successfully changed account information.');
  }

  const signOut = async event => {
    event.preventDefault();

    const response = await fetch(buildPath('signout'), {
      method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
    }).catch(error => console.error(error));

    let status = await response.status;

    if (status !== 200) {
      console.log("Failed to sign out");
      return;
    }

    removeCookie('name');
    removeCookie('email');
    removeCookie('idToken');
    removeCookie('favorites');

    window.location.href = '/LoginPage';
  };

  const renderAccountModalBody = () => {
    if (accountModalPath === "") {
      return (
        <div>
          <AccountButton
            title="Change Account Information"
            onClick={() => setAccountModalPath("Change Account Information")}
          />
          <AccountButton
            title="Search Recipes"
            onClick={() => window.location.href='/SearchResult'}
          />
          <AccountButton
            title="Favorite Recipes"
            onClick={() => window.location.href='/FavoriteRecipes'}
          />
          <AccountButton
            title="Sign Out"
            onClick={signOut}
          />
        </div>
      );
    }
    else if (accountModalPath === "Change Account Information") {
      return (
        <div class="accountModalTitle">
          <form onSubmit={changeAccountInfo} className="loginsForm">
            <input 
              type="text"
              placeholder="Display Name"
              name="inputAccountName" 
              id="inputAccountName"
              className="form-control account-input"
              required
            />
           <div id="accountInfoResult">
             {changeAccountInfoResult}
           </div>

           <button id = "editAccountButton" type="submit" className="btn btn-primary">
              Edit Account Info
            </button>
          </form>
        </div>
      );
    }
  };

  return(
    <div style={{margin: "0 auto", height: "100vh"}}>
        <div style={{width: "100%", height: "100px", backgroundColor: "#FA730B"}}>
          <div className="row" style={{width: "100%"}}>
            <div style={{width: "25%", height: "100px", color: "white", paddingTop: "5px", fontSize: "60px", fontWeight: "bold"}}>
              Seppi
            </div>
            <div style ={{width: "50%", height: "100px",paddingTop: "25px", textAlign: "center"}}>
              <form>
                <input id="resultSearch" type="text" placeholder="Search by recipe, ingredient, dish..." />
                <span className="searchImage" style={{borderRadius: "1px", width: "4%", backgroundSize: "cover", height: "50px",color: "white", position: "absolute", backgroundColor: "orange", padding: '2px'}}>
                  <i className="fa fa-search" style={{paddingTop: "8px", fontSize: "30px"}}></i>
                </span>
              </form>
            </div>
            <div style={{width: "25%", height: "100px",paddingTop: "5px", textAlign: "center"}}>
              <button id="FavPageButton" onClick={() => tempFavButton()}>
                <div id = "FavImage"></div>
                Favorites
              </button>
              <button 
                id="AccountSettings"
                onClick={handleShowAccount}
               >
                <div id = "AccountImage"></div>
                Account
              </button>
              <button id="List" onClick={handleShowList}>
                <div id="ListImage"></div>
                Lists
              </button>
            </div>
          </div>
        </div>
        <br/>
        <div className="row" style={{width: "100%"}}>
          <div id="FilterArea">
            <br/>
            Filter By<br/>
            <div id="FilterDropDowns">
              Filter dropdowns go here
              <button onClick={() => displayResults()}>Display Search Results</button>
              <button onClick={() => hideResults()}>Hide Search Results</button>
            </div>
          </div>
          {/*Idea is to have contents in Results hidden and not computed till a Search is made, also hide when Favorite Button Clicked*/}
          <div id="Results">
            <div>
              <div className="row" id="FiltersChosen">
                <button>Filters Chosen here</button>
              </div>
              <div id="NumberOfResults">
                Number of results here
              </div>
            <br/>
            </div>
            Recipes here
          </div>
        </div>
        <Modal show={show} onHide={handleCloseList}>
        <Modal.Header className="justify-content-center">
          <Modal.Title>
            <Nav id ="listHeader">
              <Nav.Item>
                <Nav.Link role="tab">Pantry</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link role="tab">Grocery</Nav.Link>
              </Nav.Item>
            </Nav>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <form>
            
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={showAccount} onHide={handleShowAccount}>
        <Modal.Header className="justify-content-center">
          <Modal.Title>
            {renderAccountModalTitle()}
          </Modal.Title>

        </Modal.Header> 
        <Modal.Body>
          {renderAccountModalBody()}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SearchResult;