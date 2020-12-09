import React, { useState } from 'react';
import '../css/Recipe.css';
import RecipePreview from './RecipePreview';
import { useCookies } from 'react-cookie';
import {withStyles, Checkbox, FormControlLabel} from '@material-ui/core'
import {Favorite, FavoriteBorder} from '@material-ui/icons'
import { orange } from '@material-ui/core/colors';

const Recipe = (props) => {
    const [cookies, setCookie] = useCookies(['name', 'email', 'idToken', 'favorites']);

    
    const OrangeHeart = withStyles({
        root: {
        color: orange[400],
        '&$checked': {
            color: orange[600],
        },
        },
        checked: {},
    })((props) => <Checkbox color="default" {...props} />);

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
        <div class="recipe">
            <div class="image-container">
                <img class="recipe-image" src={props.image} onClick={(event) => {event.preventDefault(); window.open(props.link)}}/>
            </div>
            <span class="recipe-label">
                <FormControlLabel
                    control={<OrangeHeart icon={<FavoriteBorder />} id="favoriteButton" checkedIcon={<Favorite />} name="checkedH"/>}
                />
                {props.label}
            </span>
            {renderMatching()}
        </div>
	);
};

export default Recipe;
