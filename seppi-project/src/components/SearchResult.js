import React from 'react';
import 'typeface-roboto';
import Modal from 'react-bootstrap/Modal'
import Nav from 'react-bootstrap/Nav'


const SearchResult =() => {

  const [show, setList] = React.useState(false);
  const handleCloseList = () => setList(false);
  const handleShowList = () => setList(true);

  document.body.style.height = "100vh";

  const openFavorites = event => {
    {/*Function to produce object inside Results div depending on if the user is logged in or not*/}

    return(
      <div></div>
    );
  }

  const displayResults = event => {
    document.getElementById("Results").style.display = "block";
  }

  const hideResults = event => {
    document.getElementById("Results").style.display = "none";
  }

  const tempFavButton = event => {
    window.location.href = '/NotSignedIn';
  }

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
              <button id="AccountSettings">
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
    </div>
  );
};

export default SearchResult;