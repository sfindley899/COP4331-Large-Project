import React, { useState } from 'react';
import '../css/Recipe.css';
import RecipePreview from './RecipePreview';

const Recipe = (props) => {
	return (
		<div onClick={(event) => {event.preventDefault(); window.open(props.link)}} class="recipe">
			<div class="image-container">
				<img class="recipe-image" src={props.image} />
			</div>
			<span class="recipe-label">{props.label}</span>
			<div class="match-container">
				Matching Ingredients:
				{props.match.map((item)=><span>{item}</span>)}
			</div>
		</div>
	);
};

export default Recipe;