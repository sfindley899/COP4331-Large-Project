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

    const [state, setState] = useState(props.bookmarked);

    const app_name = 'seppi'
    const buildPath = (route) => {
        if (process.env.NODE_ENV === 'production') {
          return 'https://' + app_name + '.herokuapp.com/' + route;
        }
        else {
          return 'http://localhost:5000/' + route;
        }
      }

    const removeFavorite = async () => {
        const response = await fetch(buildPath('removeFavorite'), {
            method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
                idToken: cookies.idToken,
                shareAs: props.shareAs 
		    })
        }).catch(error => console.error(error));

        let status = await response.status;

        if (status !== 200) {
            return;
        }


    };

    const addFavorite = async () => {
        const response = await fetch(buildPath('addFavorite'), {
            method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
            idToken: cookies.idToken,
            shareAs: props.shareAs
		    })
        }).catch(error => console.error(error));

        let status = await response.status;

        if (status !== 200) {
            return;
        }

    };

    const handleChange = (event) => {
        if (state) {
            removeFavorite();
        }
        else {
            addFavorite();
        }

        setState({ ...state, [event.target.name]: event.target.checked });
    };

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
				{cookies.idToken !== undefined ? 
                <FormControlLabel
                    control={<OrangeHeart icon={<FavoriteBorder />} checked={props.bookmarked}
                    onChange={handleChange}  id="favoriteButton" checkedIcon={<Favorite />} name="checkedH"/>}
                /> : <div></div>
				}
                {props.label}
            </span>
            {renderMatching()}
        </div>
	);
};

export default Recipe;
