import React from 'react';
import '../css/Recipe.css';

const Recipe = (props) => {
	return (
		<div class="recipe">
			<div class="image-container">
				<img class="recipe-image" src={props.image} />
			</div>
			<span class="recipe-label">{props.label}</span>
		</div>
	);
};

export default Recipe;