import React, { useState } from 'react';
import '../css/Recipe.css';
import RecipePreview from './RecipePreview';
import { useCookies } from 'react-cookie';
const Recipe = (props) => {
    const [cookies, setCookie] = useCookies(['name', 'email', 'idToken', 'favorites']);
	const renderMatching = () => {
        if (cookies.idToken != null)
        {
            if (props.match !== undefined && props.not !== undefined) {
                return (
                    <div class="match-container">
                        Matching Ingredients: {" "}
                        {props.match.map((item)=><span>{item}</span>).length} <br/>
                        Missing Ingredients: {"\n"}  {props.not.map((item)=><span>{item}</span>).length}
                    </div>
                );
            }
            else {
                return (
                    <div>
                    </div>
                );
            }
        }
        else {
            return (
                <div>
                </div>
            );
        }

	}

	return (
		<div onClick={(event) => {event.preventDefault(); window.open(props.link)}} class="recipe">
			<div class="image-container">
				<img class="recipe-image" src={props.image} />
			</div>
			<span class="recipe-label">{props.label}</span>
			{renderMatching()}
		</div>
	);
};

export default Recipe;
