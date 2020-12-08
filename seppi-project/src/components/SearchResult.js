import React from 'react';
import 'typeface-roboto';
import Modal from 'react-bootstrap/Modal'
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap'
import {makeStyles, withStyles, ListSubheader, List, ListItem, ListItemText, Collapse, Checkbox, FormControlLabel, FormGroup, createMuiTheme} from '@material-ui/core'
import {ExpandLess, ExpandMore, CheckBoxOutlineBlank, CheckBox} from '@material-ui/icons'
import { grey, orange } from '@material-ui/core/colors';

const SearchResult =() => {

  const [show, setList] = React.useState(false);
  const handleCloseList = () => setList(false);
  const handleShowList = () => setList(true);

  // Filter Folder use states
  const [openMealandCourse, setOpenMealandCourse] = React.useState(false);
  const [openDishType, setOpenDishType] = React.useState(false);
  const [openDietaryConcerns, setOpenDietaryConcerns] = React.useState(false);
  const [openIngredients, setOpenIngredients] = React.useState(false);
  const [openCuisine, setOpenCuisine] = React.useState(false);
  const [filterState, setFilter] = React.useState({
    //Meal and Course Type
    dinner: false,
    snack: false,
    breakfast: false,
    lunch: false,
    teatime: false,

    //Dish Type
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
    
    //Dietary Concerns
    balanced: false,
    highfiber: false,
    highprotein: false,
    lowcarb: false,
    lowfat: false,
    lowsodium: false,
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
  });

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
    setFilter({ ...filterState, [event.target.name]: event.target.checked });
  };

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
        <Navbar.Brand href="/home" class="navbar-brand">Seppi</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Form inline id="SearchBar">
            <FormControl type="text" font="typeface-roboto" placeholder="Search by recipe, ingredient, dish, ..." class="mr-sm-2" />
            <Button id="SearchSubmitButton" className="fa fa-search" type="submit"></Button>
          </Form>
          <Nav className="ml-auto">
            <Nav.Link href="#Favorites">Favorites</Nav.Link>
            <Nav.Link href="#Lists">Lists</Nav.Link>
            <Nav.Link href="#Account">Account</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Filters */}
      <div class="filter-box">
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
                    control={<OrangeCheckbox checked={filterState.dinner} onChange={handleChange} name="dinner" />}
                    label="Dinner"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.snack} onChange={handleChange} name="snack" />}
                    label="Snack"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.breakfast} onChange={handleChange} name="breakfast" />}
                    label="Breakfast"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.lunch} onChange={handleChange} name="lunch" />}
                    label="Lunch"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.teatime} onChange={handleChange} name="teatime" />}
                    label="Teatime"
                  />
                </FormGroup>
              </ListItem>
            </List>
          </Collapse>
          <div id="FilterDivider"></div>
          <ListItem button onClick={handleClickDishType}>
            <ListItemText primary="Dish Type" id="FilterFolder"/>
            {openDishType ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openDishType} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            <ListItem className={classes.nested}>
                <FormGroup>
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.alcoholcocktail} onChange={handleChange} name="alcoholcocktail" />}
                    label="Alcohol-cocktail"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.buiscuitsandcookies} onChange={handleChange} name="buiscuitsandcookies" />}
                    label="Biscuits and cookies"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.bread} onChange={handleChange} name="bread" />}
                    label="Bread"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.cereals} onChange={handleChange} name="cereals" />}
                    label="Cereals"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.condimentsandsauces} onChange={handleChange} name="condimentsandsauces" />}
                    label="Condiments and sauces"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.drinks} onChange={handleChange} name="drinks" />}
                    label="Drinks"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.desserts} onChange={handleChange} name="desserts" />}
                    label="Desserts"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.eggdishtype} onChange={handleChange} name="eggdishtype" />}
                    label="Egg"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.maincourse} onChange={handleChange} name="maincourse" />}
                    label="Main Course"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.omelet} onChange={handleChange} name="omelet" />}
                    label="Omelet"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.pancake} onChange={handleChange} name="pancake" />}
                    label="Pancake"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.preps} onChange={handleChange} name="preps" />}
                    label="Preps"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.preserve} onChange={handleChange} name="preserve" />}
                    label="Preserve"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.salad} onChange={handleChange} name="salad" />}
                    label="Salad"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.sandwiches} onChange={handleChange} name="sandwiches" />}
                    label="Sandwiches"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.soup} onChange={handleChange} name="soup" />}
                    label="Soup"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.starter} onChange={handleChange} name="starter" />}
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
                    control={<OrangeCheckbox checked={filterState.balanced} onChange={handleChange} name="balanced" />}
                    label="Balanced"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.highfiber} onChange={handleChange} name="highfiber" />}
                    label="High-Fiber"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.highprotein} onChange={handleChange} name="highprotein" />}
                    label="High-Protein"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.lowcarb} onChange={handleChange} name="lowcarb" />}
                    label="Low-Card"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.lowfat} onChange={handleChange} name="lowfat" />}
                    label="Low-Fat"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.lowsodium} onChange={handleChange} name="lowsodium" />}
                    label="Low-Sodium"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.alcoholfree} onChange={handleChange} name="alcoholfree" />}
                    label="Alcohol-free"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.immunesupportive} onChange={handleChange} name="immunesupportive" />}
                    label="Immune-Supportive"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.celeryfree} onChange={handleChange} name="celeryfree" />}
                    label="Celery-free"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.crustaceanfree} onChange={handleChange} name="crustaceanfree" />}
                    label="Crustacean-free"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.dairy} onChange={handleChange} name="dairy" />}
                    label="Dairy"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.egghealth} onChange={handleChange} name="egghealth" />}
                    label="Eggs"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.fish} onChange={handleChange} name="fish" />}
                    label="Fish"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.fodmapfree} onChange={handleChange} name="fodmapfree" />}
                    label="FODMAP free"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.gluten} onChange={handleChange} name="gluten" />}
                    label="Gluten"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.keto} onChange={handleChange} name="keto" />}
                    label="Keto"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.kidneyfriendly} onChange={handleChange} name="kidneyfriendly" />}
                    label="Kidney friendly"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.kosher} onChange={handleChange} name="kosher" />}
                    label="Kosher"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.lowpotassium} onChange={handleChange} name="lowpotassium" />}
                    label="Low potassium"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.lupinefree} onChange={handleChange} name="lupinefree" />}
                    label="Lupine-free"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.mustardfree} onChange={handleChange} name="mustardfree" />}
                    label="Mustard-free"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.nooiladded} onChange={handleChange} name="nooiladded" />}
                    label="No oil added"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.nosugar} onChange={handleChange} name="nosugar" />}
                    label="Sugar-free"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.paleo} onChange={handleChange} name="paleo" />}
                    label="Paleo"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.peanuts} onChange={handleChange} name="peanuts" />}
                    label="Peanuts"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.pescatarian} onChange={handleChange} name="pescatarian" />}
                    label="Pescatarian"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.porkfree} onChange={handleChange} name="porkfree" />}
                    label="Pork-free"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.redmeatfree} onChange={handleChange} name="redmeatfree" />}
                    label="Red meat-free"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.sesamefree} onChange={handleChange} name="sesamefree" />}
                    label="Sesame-free"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.shellfish} onChange={handleChange} name="shellfish" />}
                    label="Shellfish"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.soy} onChange={handleChange} name="soy" />}
                    label="Soy"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.sugarconscious} onChange={handleChange} name="sugarconscious" />}
                    label="Sugar-conscious"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.treenuts} onChange={handleChange} name="treenuts" />}
                    label="Tree nuts"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.vegan} onChange={handleChange} name="vegan" />}
                    label="Vegan"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.vegetarian} onChange={handleChange} name="vegetarian" />}
                    label="Vegetarian"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.wheatfree} onChange={handleChange} name="wheatfree" />}
                    label="Wheat-free"
                  />
                </FormGroup>
              </ListItem>
            </List>
          </Collapse>
          <div id="FilterDivider"></div>
          <ListItem button onClick={handleClickIngredients}>
            <ListItemText primary="Ingredients" id="FilterFolder"/>
            {openIngredients ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openIngredients} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem className={classes.nested}>
                <FormGroup>
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.chicken} onChange={handleChange} name="chicken" />}
                    label="Chicken"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.beef} onChange={handleChange} name="beef" />}
                    label="Beef"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.fishingredient} onChange={handleChange} name="fishingredient" />}
                    label="Fish"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.pork} onChange={handleChange} name="pork" />}
                    label="Pork"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.vegetable} onChange={handleChange} name="vegetable" />}
                    label="Vegetable"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.turkey} onChange={handleChange} name="turkey" />}
                    label="Turkey"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.apple} onChange={handleChange} name="apple" />}
                    label="Apple"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.bean} onChange={handleChange} name="bean" />}
                    label="Bean"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.broccoli} onChange={handleChange} name="broccoli" />}
                    label="Broccoli"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.cabbage} onChange={handleChange} name="cabbage" />}
                    label="Cabbage"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.carrot} onChange={handleChange} name="carrot" />}
                    label="Carrot"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.chocolate} onChange={handleChange} name="chocolate" />}
                    label="Chocolate"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.citrus} onChange={handleChange} name="citrus" />}
                    label="Citrus"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.cranberry} onChange={handleChange} name="cranberry" />}
                    label="Cranberry"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.duck} onChange={handleChange} name="duck" />}
                    label="Duck"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.eggingredient} onChange={handleChange} name="eggingredient" />}
                    label="Egg"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.eggplant} onChange={handleChange} name="eggplant" />}
                    label="Eggplant"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.fruit} onChange={handleChange} name="fruit" />}
                    label="Fruit"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.greenbean} onChange={handleChange} name="greenbean" />}
                    label="Green Bean"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.groundbeef} onChange={handleChange} name="groundbeef" />}
                    label="Ground Beef"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.ham} onChange={handleChange} name="ham" />}
                    label="Ham"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.kale} onChange={handleChange} name="kale" />}
                    label="Kale"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.lamb} onChange={handleChange} name="lamb" />}
                    label="Lamb"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.leafygreen} onChange={handleChange} name="leafygreen" />}
                    label="Leafy Green"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.lemon} onChange={handleChange} name="lemon" />}
                    label="Lemon"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.mushroom} onChange={handleChange} name="mushroom" />}
                    label="Mushroom"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.pasta} onChange={handleChange} name="pasta" />}
                    label="Pasta"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.potato} onChange={handleChange} name="potato" />}
                    label="Potato"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.poultry} onChange={handleChange} name="poultry" />}
                    label="Poultry"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.rice} onChange={handleChange} name="rice" />}
                    label="Rice"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.salmon} onChange={handleChange} name="salmon" />}
                    label="Salmon"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.scallop} onChange={handleChange} name="scallop" />}
                    label="Scallop"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.seafood} onChange={handleChange} name="seafood" />}
                    label="Seafood"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.shellfishingredient} onChange={handleChange} name="shellfishingredient" />}
                    label="Shellfish"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.shrimp} onChange={handleChange} name="shrimp" />}
                    label="Shrimp"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.spinach} onChange={handleChange} name="spinach" />}
                    label="Spinach"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.sweetpotato} onChange={handleChange} name="sweetpotato" />}
                    label="Sweet Potato"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.tomato} onChange={handleChange} name="tomato" />}
                    label="Tomato"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.zucchini} onChange={handleChange} name="zucchini" />}
                    label="Zucchini"
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
                    control={<OrangeCheckbox checked={filterState.american} onChange={handleChange} name="american" />}
                    label="American"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.asian} onChange={handleChange} name="asian" />}
                    label="Asian"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.british} onChange={handleChange} name="british" />}
                    label="British"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.caribbean} onChange={handleChange} name="caribbean" />}
                    label="Caribbean"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.centraleurope} onChange={handleChange} name="centraleurope" />}
                    label="Central Europe"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.chinese} onChange={handleChange} name="chinese" />}
                    label="Chinese"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.easterneurope} onChange={handleChange} name="easterneurope" />}
                    label="Eastern Europe"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.french} onChange={handleChange} name="french" />}
                    label="French"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.indian} onChange={handleChange} name="indian" />}
                    label="Indian"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.italian} onChange={handleChange} name="italian" />}
                    label="Italian"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.japanese} onChange={handleChange} name="japanese" />}
                    label="Japanese"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.koshercuisine} onChange={handleChange} name="koshercuisine" />}
                    label="Kosher"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.mediterranean} onChange={handleChange} name="mediterranean" />}
                    label="Mediterranean"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.mexican} onChange={handleChange} name="mexican" />}
                    label="Mexican"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.middleeastern} onChange={handleChange} name="middleeastern" />}
                    label="Middle Eastern"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.nordic} onChange={handleChange} name="nordic" />}
                    label="Nordic"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.southamerican} onChange={handleChange} name="southamerican" />}
                    label="South American"
                  />
                  <FormControlLabel
                    control={<OrangeCheckbox checked={filterState.southeastasian} onChange={handleChange} name="southeastasian" />}
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
      


    </div>
  );
};

export default SearchResult;