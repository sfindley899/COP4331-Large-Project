import React, { useContext, useState } from 'react';
import 'typeface-roboto';
import Modal from 'react-bootstrap/Modal'
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap'
import {makeStyles, withStyles, ListSubheader, List, ListItem, ListItemText, Collapse, Checkbox, FormControlLabel, FormGroup, createMuiTheme} from '@material-ui/core'
import {ExpandLess, ExpandMore, CheckBoxOutlineBlank, CheckBox} from '@material-ui/icons'
import { grey, orange } from '@material-ui/core/colors';
import Recipe from './Recipe';
import AccountButton from './AccountButton';
import { useCookies } from 'react-cookie';
import UserContext from '../context';

const SearchResults =() => {
  const [state, setState] = useContext(UserContext);
  const [filterText, setFilterText] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['name', 'email', 'idToken', 'favorites']);
  const [searchData, setSearchData] = useState([]);
  const [showAccount, setShowAccount] = React.useState(false);
  const [accountModalPath, setAccountModalPath] = React.useState('');
  const [changeAccountInfoResult, setChangeAccountInfoResult] = React.useState('');
  const [show, setList] = React.useState(false);
  const handleCloseList = () => setList(false);
  const handleShowList = () => setList(true);
  const handleShowAccount = () => setShowAccount(!showAccount);

  const handleBackButton = () => {
    setAccountModalPath("");
  }

  const app_name = 'seppi'
  const buildPath = (route) => {
    if (process.env.NODE_ENV === 'production') {
      return 'https://' + app_name + '.herokuapp.com/' + route;
    }
    else {
      return 'http://localhost:5000/' + route;
    }
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

  function keyToApiParameter(key) {
		// Convert key strings for diet
		if (key === 'highfiber')
			return 'high-fiber';
		if (key === 'highprotein')
			return 'high-protein';
		if (key === 'lowcarb')
			return 'low-carb';
		if (key === 'lowfat')
      return 'low-fat';
    if (key === 'lowsodium')
      return 'low-sodium';

    // dish type
    if (key === 'alcoholcocktail')
      return 'Alcohol-cocktail';
    if (key === 'buiscuitsandcookies')
      return 'Biscuits and cookies';
    if (key === 'condimentsandsauces')
      return 'Condiments and sauces';
    if (key === 'eggdishtype')
      return 'Egg';
    if (key === 'maincourse')
      return 'Main course';

		// Convert key strings for health
		if (key === 'alcoholfree')
			return 'alcohol-free';
		if (key === 'immunesupportive')
			return 'immuno-supportive';
		if (key === 'celeryfree')
			return 'celery-free';
		if (key === 'crustaceanfree')
			return 'crustacean-free';
		if (key === 'dairy')
      return 'dairy-free';
    if (key === 'egghealth')
      return 'egg-free';
    if (key === 'fish')
      return 'fish-free';
    if (key === 'fodmapfree')
      return 'fodmap-free';
    if (key === 'gluten')
      return 'gluten-free';
    if (key === 'keto')
      return 'keto-friendly';
    if (key === 'kidneyfriendly')
      return 'kidney-friendly';
    if (key === 'lowpotassium')
      return 'low-potassium';
    if (key === 'lupinefree')
      return 'lupine-free';
    if (key === 'mustardfree')
      return 'mustard-free';
    if (key === 'nooiladded')
      return 'no-oil-added';
    if (key === 'nosugar')
      return 'low-sugar';
    if (key === 'peanuts')
      return 'peanut-free';
    if (key === 'porkfree')
      return 'pork-free';
    if (key === 'redmeatfree')
      return 'red-meat-free';
    if (key === 'sesamefree')
      return 'sesame-free';
    if (key === 'shellfish')
      return 'shellfish-free';
    if (key === 'soy')
      return 'soy-free';
    if (key === 'sugarconscious')
      return 'sugar-conscious';
    if (key === 'treenuts')
      return 'tree-nut-free';
    if (key === 'wheatfree')
      return 'wheat-free';

    // cuisine type
    if (key === 'centraleurope')
      return 'Central Europe';
    if (key === 'easterneurope')
      return 'Eastern Europe';
    if (key === 'koshercuisine')
      return 'Kosher';
    if (key === 'middleeastern')
      return 'Middle Eastern';
    if (key === 'southamerican')
      return 'South American';
    if (key === 'southeastasian')
      return 'South East Asian';
  };

  const applyFilters = () => {
		setFilterText(filterText => '');
		let firstFoundKey = true;

		for (var key of Object.keys(filterState.mealType)) {
			let str = '';
			if (filterState.mealType[key]) {
				if (firstFoundKey) {
					str += 'mealType=';
					firstFoundKey = false;
				}
				if (keyToApiParameter(key) === undefined)
					str += key + '&';
				else
					str += keyToApiParameter(key) + '&';
				setFilterText(filterText => filterText + str);
			}
		}

		firstFoundKey = true;
		for (var key of Object.keys(filterState.dishType)) {
			let str = '';
			if (filterState.dishType[key]) {
				if (firstFoundKey) {
					str += 'dishType=';
					firstFoundKey = false;
				}
				if (keyToApiParameter(key) === undefined)
					str += key + '&';
				else
					str += keyToApiParameter(key) + '&';
				setFilterText(filterText => filterText + str);
			}
		}

		firstFoundKey = true;
		for (var key of Object.keys(filterState.health)) {
			let str = '';
			if (filterState.health[key]) {
				if (firstFoundKey) {
					str += 'health=';
					firstFoundKey = false;
				}
				if (keyToApiParameter(key) === undefined)
					str += key + '&';
				else
					str += keyToApiParameter(key) + '&';
				setFilterText(filterText => filterText + str)
			}
		}

		firstFoundKey = true;
		for (var key of Object.keys(filterState.diet)) {
			let str = '';
			if (filterState.diet[key]) {
				if (firstFoundKey) {
					str += 'diet=';
					firstFoundKey = false;
				}
				if (keyToApiParameter(key) === undefined)
					str += key + '&';
				else
					str += keyToApiParameter(key) + '&';
				setFilterText(filterText => filterText + str)
			}
		}

		firstFoundKey = true;
		for (var key of Object.keys(filterState.cuisineType)) {
			let str = '';
			if (filterState.cuisineType[key]) {
				if (firstFoundKey) {
					str += 'cuisineType=';
					firstFoundKey = false;
				}
				if (keyToApiParameter(key) === undefined)
					str += key + '&';
				else
					str += keyToApiParameter(key) + '&';
				setFilterText(filterText => filterText + str)
			}
		}

		setState(state => ({ ...state, filterStack: []}));
	};

  const searchRecipe = async event => {
    event.preventDefault();

    let searchText = document.getElementById("searchBar").value;

    const response = await fetch(buildPath('searchRecipe'), {
      method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
        search: searchText,
        filters: filterText,
        from: 0,
        to: 50,
        idToken: cookies.idToken
			})
    }).catch(error => console.error(error));

    let status = await response.status;

    if (status !== 200) {
      console.log("Couldn't fetch ingredients");
      return;
    }

    let json = JSON.parse(await response.text());
    var n = json.hits.length;
        for (var i = 0; i < n-1; i++)
            for (var j = 0; j < n-i-1; j++)
                if (json.hits[j].recipe.ratio <= json.hits[j+1].recipe.ratio)
                {
                    // swap arr[j+1] and arr[j]
                    var temp = json.hits[j];
                    json.hits[j] = json.hits[j+1];
                    json.hits[j+1] = temp;
                }
    setSearchData(json.hits);
  }

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
            onClick={() => window.location.href='/SearchResults'}
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

  // Filter Folder use states
  const [openMealandCourse, setOpenMealandCourse] = React.useState(false);
  const [openDishType, setOpenDishType] = React.useState(false);
  const [openDietaryConcerns, setOpenDietaryConcerns] = React.useState(false);
  const [openIngredients, setOpenIngredients] = React.useState(false);
  const [openCuisine, setOpenCuisine] = React.useState(false);
  const [filterState, setFilter] = React.useState({
    //Meal and Course Type
    mealType: {
      dinner: false,
      snack: false,
      breakfast: false,
      lunch: false,
      teatime: false,
    },

    //Dish Type
    dishType: {
      alcoholcocktail: false,
      buiscuitsandcookies: false,
      bread: false,
      cereals: false,
      condimentsandsauces: false,
      drinks: false,
      desserts: false,
      eggdishtype: false,
      maincourse: false,
      omelet: false,
      pancake: false,
      preps: false,
      preserve: false,
      salad: false,
      sandwiches: false,
      soup: false,
      starter: false,
    },

    //Dietary Concerns
    diet: {
      balanced: false,
      highfiber: false,
      highprotein: false,
      lowcarb: false,
      lowfat: false,
      lowsodium: false,
    },

    health: {
      alcoholfree: false,
      immunesupportive: false,
      celeryfree: false,
      crustaceanfree: false,
      dairy: false,
      egghealth: false,
      fish: false,
      fodmapfree: false,
      gluten: false,
      keto: false,
      kidneyfriendly: false,
      kosher: false,
      lowpotassium: false,
      lupinefree: false,
      mustardfree: false,
      nooiladded: false,
      nosugar: false,
      paleo: false,
      peanuts: false,
      pescatarian: false,
      porkfree: false,
      redmeatfree: false,
      sesamefree: false,
      shellfish: false,
      soy: false,
      sugarconscious: false,
      treenuts: false,
      vegan: false,
      vegetarian: false,
      wheatfree: false,
    },

    //Ingredients
    chicken: false,
    beef: false,
    fishingredient: false,
    pork: false,
    vegetable: false,
    turkey: false,
    apple: false,
    bean: false,
    broccoli: false,
    cabbage: false,
    carrot: false,
    chocolate: false,
    citrus: false,
    cranberry: false,
    duck: false,
    eggingredient: false,
    eggplant: false,
    fruit: false,
    greenbean: false,
    groundbeef: false,
    ham: false,
    kale: false,
    lamb: false,
    leafygreen: false,
    lemon: false,
    mushroom: false,
    pasta: false,
    potato: false,
    poultry: false,
    rice: false,
    salmon: false,
    scallop: false,
    seafood: false,
    shellfishingredient: false,
    shrimp: false,
    spinach: false,
    sweetpotato: false,
    tomato: false,
    zucchini: false,

    //Cuisine
    cuisineType: {
      american: false,
      asian: false,
      british: false,
      caribbean: false,
      centraleurope: false,
      chinese: false,
      easterneurope: false,
      french: false,
      indian: false,
      italian: false,
      japanese: false,
      koshercuisine: false,
      mediterranean: false,
      mexican: false,
      middleeastern: false,
      nordic: false,
      southamerican: false,
      southeastasian: false,
    }
  });
  //const [filterState, setTag] = React.useState()

  document.body.style.height = "100vh";

  const openFavorites = event => {
    {/*Function to produce object inside Results div depending on if the user is logged in or not*/}

    return(
      <div></div>
    );
  }

  // Filter Folder Styles
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));
  const classes = useStyles();

  //Checkbox color
  const OrangeCheckbox = withStyles({
    root: {
      color: grey[400],
      '&$checked': {
        color: orange[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

  const OrangeFilterTag = withStyles({
    checked: {
      color: orange[600],
    },
  })((props) => <Button color="default" {...props} />);

  // Filter Folder click handles
  const handleClickMealandCourse = () => {
    setOpenMealandCourse(!openMealandCourse);
  };
  const handleClickDishType = () => {
    setOpenDishType(!openDishType);
  };
  const handleClickDietaryConcerns = () => {
    setOpenDietaryConcerns(!openDietaryConcerns);
  };
  const handleClickIngredients = () => {
    setOpenIngredients(!openIngredients);
  };
  const handleClickCuisine = () => {
    setOpenCuisine(!openCuisine);
  };

  //Filter selection handler
  const handleChange = (event) => {
    filterState[event.target.value][event.target.name] = event.target.checked;
    setFilter(filterState)
    //setFilter({ ...filterState, [event.target.name]: event.target.checked });
    applyFilters();
  };

  //Filter tag checker
  const toggleTag = (event) => {
      setFilter({ ...filterState, [event.target.name]: event.target.checked })
  }

  return(
    <div>

      {/* Navigation Bar */}
      <Navbar collapseOnSelect
        class= "navbar"
        sticky= "top"
        top="0"
        expand="sm"
        variant="dark"
      >
        <Navbar.Brand id="seppiButton" onClick={() => window.location.href = '/SearchResults'} class="navbar-brand">Seppi</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Form onSubmit={searchRecipe} inline id="SearchBar">
            <FormControl id="searchBar" type="text" font="typeface-roboto" placeholder="Search by recipe, ingredient, dish, ..." class="mr-sm-2" />
            <Button id="SearchSubmitButton" className="fa fa-search" type="submit"></Button>
          </Form>
          <Nav className="ml-auto">
            <Nav.Link href="/FavoriteRecipes">Favorites</Nav.Link>
            <Nav.Link onClick={handleShowAccount}>Account</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Filters */}

      <div class="filter-container">
          <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="FilterTitle">
              Filter By
            </ListSubheader>
          }
          className={classes.root}
        >
          <div id="FilterDivider"></div>
          <ListItem button onClick={handleClickMealandCourse}>
            <ListItemText primary="Meal and Course" id="FilterFolder"/>
            {openMealandCourse ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openMealandCourse} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem className={classes.nested}>
                <FormGroup>
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.mealType.dinner} onChange={handleChange} value='mealType' name="dinner" />}
                    label="Dinner"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.mealType.snack} onChange={handleChange} value='mealType' name="snack" />}
                    label="Snack"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.mealType.breakfast} onChange={handleChange}  value='mealType' name="breakfast" />}
                    label="Breakfast"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.mealType.lunch} onChange={handleChange}  value='mealType' name="lunch" />}
                    label="Lunch"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.mealType.teatime} onChange={handleChange}  value='mealType' name="teatime" />}
                    label="Teatime"
                  />
                </FormGroup>
              </ListItem>
            </List>
          </Collapse>
          <div id="FilterDivider"></div>
          <ListItem button onClick={handleClickDishType}>
            <ListItemText primary="Dish Type" id="FilterFolder"/>
            {openDishType ? <ExpandLess/> : <ExpandMore/>}
          </ListItem>
          <Collapse in={openDishType} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            <ListItem className={classes.nested}>
                <FormGroup>
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.dishType.alcoholcocktail} onChange={handleChange} value='dishType' name="alcoholcocktail" />}
                    label="Alcohol-cocktail"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.dishType.buiscuitsandcookies}  value='dishType' onChange={handleChange} name="buiscuitsandcookies" />}
                    label="Biscuits and cookies"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.dishType.bread}  value='dishType' onChange={handleChange} name="bread" />}
                    label="Bread"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.dishType.cereals}  value='dishType' onChange={handleChange} name="cereals" />}
                    label="Cereals"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.dishType.condimentsandsauces}  value='dishType' onChange={handleChange} name="condimentsandsauces" />}
                    label="Condiments and sauces"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.dishType.drinks}  value='dishType' onChange={handleChange} name="drinks" />}
                    label="Drinks"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.dishType.desserts}  value='dishType' onChange={handleChange} name="desserts" />}
                    label="Desserts"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.dishType.eggdishtype}  value='dishType' onChange={handleChange} name="eggdishtype" />}
                    label="Egg"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.dishType.maincourse}  value='dishType' onChange={handleChange} name="maincourse" />}
                    label="Main Course"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.dishType.omelet}  value='dishType' onChange={handleChange} name="omelet" />}
                    label="Omelet"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.dishType.pancake}  value='dishType' onChange={handleChange} name="pancake" />}
                    label="Pancake"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.dishType.preps}  value='dishType' onChange={handleChange} name="preps" />}
                    label="Preps"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.dishType.preserve}  value='dishType' onChange={handleChange} name="preserve" />}
                    label="Preserve"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.dishType.salad}  value='dishType' onChange={handleChange} name="salad" />}
                    label="Salad"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.dishType.sandwiches}  value='dishType' onChange={handleChange} name="sandwiches" />}
                    label="Sandwiches"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.dishType.soup}  value='dishType' onChange={handleChange} name="soup" />}
                    label="Soup"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.dishType.starter}  value='dishType' onChange={handleChange} name="starter" />}
                    label="Starter"
                  />
                </FormGroup>
              </ListItem>
            </List>
          </Collapse>
          <div id="FilterDivider"></div>
          <ListItem button onClick={handleClickDietaryConcerns}>
            <ListItemText primary="Dietary Concerns" id="FilterFolder"/>
            {openDietaryConcerns ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openDietaryConcerns} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem className={classes.nested}>
                <FormGroup>
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.diet.balanced} onChange={handleChange} value="diet" name="balanced" />}
                    label="Balanced"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.diet.highfiber} onChange={handleChange}  value="diet" name="highfiber" />}
                    label="High-Fiber"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.diet.highprotein} onChange={handleChange}  value="diet" name="highprotein" />}
                    label="High-Protein"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.diet.lowcarb} onChange={handleChange}  value="diet" name="lowcarb" />}
                    label="Low-Card"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.diet.lowfat} onChange={handleChange}  value="diet" name="lowfat" />}
                    label="Low-Fat"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.diet.lowsodium} onChange={handleChange}  value="diet" name="lowsodium" />}
                    label="Low-Sodium"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.health.alcoholfree} onChange={handleChange} value="health" name="alcoholfree" />}
                    label="Alcohol-free"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.health.immunesupportive} onChange={handleChange}  value="health" name="immunesupportive" />}
                    label="Immune-Supportive"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.health.celeryfree} onChange={handleChange}  value="health" name="celeryfree" />}
                    label="Celery-free"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.health.crustaceanfree} onChange={handleChange}  value="health" name="crustaceanfree" />}
                    label="Crustacean-free"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.health.dairy} onChange={handleChange}  value="health" name="dairy" />}
                    label="Dairy"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.health.egghealth} onChange={handleChange}  value="health" name="egghealth" />}
                    label="Eggs"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.health.fish} onChange={handleChange}  value="health" name="fish" />}
                    label="Fish"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.health.fodmapfree} onChange={handleChange}  value="health" name="fodmapfree" />}
                    label="FODMAP free"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.health.gluten} onChange={handleChange}  value="health" name="gluten" />}
                    label="Gluten"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.health.keto} onChange={handleChange}  value="health" name="keto" />}
                    label="Keto"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.health.kidneyfriendly} onChange={handleChange}  value="health" name="kidneyfriendly" />}
                    label="Kidney friendly"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.health.kosher} onChange={handleChange}  value="health" name="kosher" />}
                    label="Kosher"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.health.lowpotassium} onChange={handleChange}  value="health" name="lowpotassium" />}
                    label="Low potassium"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.health.lupinefree} onChange={handleChange}  value="health" name="lupinefree" />}
                    label="Lupine-free"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.health.mustardfree} onChange={handleChange}  value="health" name="mustardfree" />}
                    label="Mustard-free"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.health.nooiladded} onChange={handleChange}  value="health" name="nooiladded" />}
                    label="No oil added"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.health.nosugar} onChange={handleChange}  value="health" name="nosugar" />}
                    label="Sugar-free"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.health.paleo} onChange={handleChange}  value="health" name="paleo" />}
                    label="Paleo"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.health.peanuts} onChange={handleChange}  value="health" name="peanuts" />}
                    label="Peanuts"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.health.pescatarian} onChange={handleChange}  value="health" name="pescatarian" />}
                    label="Pescatarian"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.health.porkfree} onChange={handleChange}  value="health" name="porkfree" />}
                    label="Pork-free"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.health.redmeatfree} onChange={handleChange}  value="health" name="redmeatfree" />}
                    label="Red meat-free"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.health.sesamefree} onChange={handleChange}  value="health" name="sesamefree" />}
                    label="Sesame-free"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.health.shellfish} onChange={handleChange}  value="health" name="shellfish" />}
                    label="Shellfish"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.health.soy} onChange={handleChange}  value="health" name="soy" />}
                    label="Soy"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.health.sugarconscious} onChange={handleChange}  value="health" name="sugarconscious" />}
                    label="Sugar-conscious"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.health.treenuts} onChange={handleChange}  value="health" name="treenuts" />}
                    label="Tree nuts"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.health.vegan} onChange={handleChange}  value="health" name="vegan" />}
                    label="Vegan"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.health.vegetarian} onChange={handleChange}  value="health" name="vegetarian" />}
                    label="Vegetarian"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.health.wheatfree} onChange={handleChange}  value="health" name="wheatfree" />}
                    label="Wheat-free"
                  />
                </FormGroup>
              </ListItem>
            </List>
          </Collapse>
          <div id="FilterDivider"></div>
          <ListItem button onClick={handleClickCuisine}>
            <ListItemText primary="Cuisine" id="FilterFolder"/>
            {openCuisine ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openCuisine} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem className={classes.nested}>
                <FormGroup>
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.cuisineType.american} onChange={handleChange} value="cuisineType" name="american" />}
                    label="American"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.cuisineType.asian} onChange={handleChange} value="cuisineType" name="asian" />}
                    label="Asian"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.cuisineType.british} onChange={handleChange}  value="cuisineType" name="british" />}
                    label="British"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.cuisineType.caribbean} onChange={handleChange}  value="cuisineType" name="caribbean" />}
                    label="Caribbean"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.cuisineType.centraleurope} onChange={handleChange}  value="cuisineType" name="centraleurope" />}
                    label="Central Europe"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.cuisineType.chinese} onChange={handleChange}  value="cuisineType" name="chinese" />}
                    label="Chinese"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.cuisineType.easterneurope} onChange={handleChange}  value="cuisineType" name="easterneurope" />}
                    label="Eastern Europe"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.cuisineType.french} onChange={handleChange}  value="cuisineType" name="french" />}
                    label="French"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.cuisineType.indian} onChange={handleChange}  value="cuisineType" name="indian" />}
                    label="Indian"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.cuisineType.italian} onChange={handleChange} value="cuisineType" name="italian" />}
                    label="Italian"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.cuisineType.japanese} onChange={handleChange}  value="cuisineType" name="japanese" />}
                    label="Japanese"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.cuisineType.koshercuisine} onChange={handleChange}  value="cuisineType" name="koshercuisine" />}
                    label="Kosher"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.cuisineType.mediterranean} onChange={handleChange}  value="cuisineType" name="mediterranean" />}
                    label="Mediterranean"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.cuisineType.mexican} onChange={handleChange}  value="cuisineType" name="mexican" />}
                    label="Mexican"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.cuisineType.middleeastern} onChange={handleChange}  value="cuisineType" name="middleeastern" />}
                    label="Middle Eastern"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.cuisineType.nordic} onChange={handleChange} value="cuisineType"  name="nordic" />}
                    label="Nordic"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.cuisineType.southamerican} onChange={handleChange} value="cuisineType"  name="southamerican" />}
                    label="South American"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.cuisineType.southeastasian} onChange={handleChange}  value="cuisineType" name="southeastasian" />}
                    label="South East Asian"
                  />
                </FormGroup>
              </ListItem>
            </List>
          </Collapse>
          <div id="FilterDivider"></div>
        </List>
      </div>

      {/* Filter Tags */}
      <div class="filter-tag-container">
        {/* I skipped this for now, wanted to work on more crucial features first! */}
      </div>

      {/* Recipe Result List */}
      <div class="recipe-result-container">
        {searchData !== undefined ? searchData.map((item) => <Recipe link={item.recipe.url} match={item.recipe.match} not={item.recipe.not} label={item.recipe.label} image={item.recipe.image} />) : <div></div>}
      </div>

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

export default SearchResults;
