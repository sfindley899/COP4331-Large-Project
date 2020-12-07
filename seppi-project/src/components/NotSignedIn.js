import React from 'react';
import 'typeface-roboto';
import {Link} from "react-router-dom"

const NotSignedIn =() => {

  document.body.style.height = "100vh";

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
              <button id="FavPageButton" onClick={() => alert("Hello")}>
                <div id = "FavImage"></div>
                Favorites
              </button>
              <button id="AccountSettings">
                <div id = "AccountImage"></div>
                Account
              </button>
              <button id="List">
                <div id="ListImage"></div>
                Lists
              </button>
            </div>
          </div>
        </div>
        <br/>
        <div id="FavHeader" className="row">
            <div id="HeartImage"></div>
            <div style={{color: "black", width: "50%", textAlign: "left", fontWeight: "bold", fontSize: "30px"}}>Favorites</div>
        </div>
        <br/>
        <div id="FavBody">
            <div id="biggerHeartImage"></div>
            <h1>You are just a step away from your favorite recipes!</h1>
            You need to be signed on into Seppi to view your favorites. Keep track of the recipes you love or want to view later.
            <br/>
            <br/>
            <div style={{fontWeight: "bold"}}>
                <Link to="/Login" style={{color: "#FA730B"}}> Sign in</Link>{" "}
                to view your Favorites
            </div>
        </div>
    </div>
  );
};

export default NotSignedIn;