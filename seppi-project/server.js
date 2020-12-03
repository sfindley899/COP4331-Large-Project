const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const swagger = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');

require('dotenv').config();

// Firebase-admin
const firebaseAdminSdk = require('firebase-admin'),
    firebaseAdminApp = firebaseAdminSdk.initializeApp({credential: firebaseAdminSdk.credential.cert(
      JSON.parse(Buffer.from(process.env.GOOGLE_CONFIG_BASE64_ENCODED_STRING, 'base64').toString('ascii')))
});

// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebase = require('firebase/app'),
    firebase2 = firebase.initializeApp(JSON.parse(Buffer.from(process.env.GOOGLE_CONFIG_BASE64_ENCODED_STRING, 'base64').toString('ascii')))

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

// Required for side-effects
require("firebase/app");
require("firebase/firestore");
require("firebase/auth");
const db = firebaseAdminSdk.firestore();
const port = process.env.PORT || 5000;
var router = express.Router();
const app = express();
app.set('port', (process.env.PORT || 5000));

app.use(cors());
app.use(express.json());

// Rest API requirements
app.use(bodyParser.urlencoded({
	extended: true
  }));
  app.use(bodyParser.json());


app.get('/user', (req, res) => {
	res.send("Helloo")
})

app.post('/register', (req, res) => {
  if (req.body.name == "")
  {
      return res.status(400).send(JSON.stringify({response:"Need a non empty name"}));
  }
  firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
  .then(function () {
    user = firebase.auth().currentUser;
    user.sendEmailVerification();
  })
  .then(function () {
    // updates profile will add more when needed. req.body.name
    user.updateProfile({
      displayName: req.body.name
    });

    // Create a document for the user using the user's UID.
    var userRef = db.collection('users').doc(user.uid);

    // Set some of the user's fields.
    userRef.set({
      name: req.body.name,
      allergies: '',
      diet: '',
    });

    return res.status(200).send(JSON.stringify({response:"Register successful email verification sent to " + req.body.email}));
  })
  .catch(function(error) {
    return res.status(400).send(JSON.stringify({response:error.message}));
  });


 });
  app.post('/login', (req, res) => {
      if(!res.headersSent) {
      // signs in
      firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then(function() {
          if(!res.headersSent) {
              var user = firebase.auth().currentUser;
                if (user) {
                  // User is signed in.
                  // checks if email is verified
                  if (user.emailVerified == false)
                  {
                      console.log("email not verified resending email");

                      user.sendEmailVerification().then(function() {
                          return res.status(401).send(JSON.stringify({response:"email not verified"}));

                 }).catch(function(error) {
                   // An error happened.
                   // this probably happens from too many requests to send email verification
                   return res.status(401).send(JSON.stringify({response:error}));
                 });

                  }
                  // sends 200 when email is verified.
                  else if(user != null) {
                      firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
  // Send token to your backend via HTTPS
  // ...
  return res.status(200).send({
    name: user.displayName,
    email: user.email,
    idToken: idToken
  });
}).catch(function(error) {
  // Handle error
});


                  }
                  // user not signed in
                } else {
                  // No user is signed in.
                    return res.status(400).send(JSON.stringify({response:"No User"}));
                }
          }
          // catches when sign in has problems.
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        return res.status(400).send(JSON.stringify({response:error.message}));
     });
 }

  });

  app.post('/resetPassword', (req, res) => {
      var auth = firebase.auth();

    var emailAddress = req.body.email;

    auth.sendPasswordResetEmail(emailAddress).then(function() {
        return res.status(200).send(JSON.stringify({response:"email ver sent"}));
        // Email sent.
  }).catch(function(error) {
      return res.status(400).send(JSON.stringify({response:error}));

  })
});

  app.post('/signout', (req, res) => {
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        return res.status(200).send(JSON.stringify({response:"successfully signed out"}));
      }).catch(function(error) {
        // An error happened.
        return res.status(400).send(JSON.stringify({response:error}));
      });
});

app.post('/changeEmail', (req, res) => {
    var user = firebase.auth().currentUser;
    var emailx = req.body.email;

    // cant change to empty email
    if (emailx != null && user != null)
    {
        user.updateEmail(emailx).then(function() {
            user.sendEmailVerification().then(function() {
         // Email sent.
         return res.status(200).send(JSON.stringify({email:user.emailAddress}));
       }).catch(function(error) {
         // An error happened.
         return res.status(400).send(JSON.stringify({response:error}));
       });
       }).catch(function(error) {
           // An error happened.
       console.log(error);
       return res.status(400).send(JSON.stringify({response:error}));
   });
    }
    else {

        return res.status(400).send(JSON.stringify({response:"no user"}));
    }


});

app.post('/resendEmailVerification', (req, res) => {
  var user = firebase.auth().currentUser;

  if (user != null)
  {
    user.sendEmailVerification().then(function() {
      // Email sent.
      return res.status(200).send(JSON.stringify({response: "resent email verification"}));
    }).catch(function(error) {
      // An error happened.
      return res.status(400).send(JSON.stringify({response:error}));
    });
  }
  else
  {
    return res.status(400).send(JSON.stringify({response:"no user"}));
  }

});

app.post('/addFavorite', async (req, res) => {
    if (req.body.idToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    var decodedToken = await firebaseAdminSdk.auth().verifyIdToken(req.body.idToken);
    if (decodedToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    const uid = decodedToken.uid;


      let origString = req.body.recipe.uri;
      let replacementString = '_S';
      let uri =  origString.replace(/\//g, replacementString);

      // Add the recipe JSON object to user's favorites list.
      let userRef = db.collection('users').doc(uid);
      await userRef.collection('BookmarkedRecipes').doc(uri).set(req.body);

      // Return the newly added favorite JSON.
      const recipeRef = userRef.collection('BookmarkedRecipes').doc(uri);
      const recipeDoc = await recipeRef.get();

      if (!recipeDoc.exists) {
        console.log('no such document');
        return res.status(400).send({response: 'No such document.'});
      }
      else {
        return res.status(200).send(recipeDoc.data());
      }

});

app.post('/removeFavorite', async (req, res) => {
    if (req.body.idToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    var decodedToken = await firebaseAdminSdk.auth().verifyIdToken(req.body.idToken);
    if (decodedToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    const uid = decodedToken.uid;
      let origString = req.body.uri;
      let replacementString = '_S';
      let uri =  origString.replace(/\//g, replacementString);

      let userRef = db.collection('users').doc(uid);

      const favoritesRef = userRef.collection('BookmarkedRecipes');
      await favoritesRef.doc(uri).delete();

      // Return the new favorite docs as a response.
      const favoritesDocs = await favoritesRef.get();
      let docs = [];
      favoritesDocs.forEach(doc => {
        docs.push(doc.data());
      });

      return res.status(200).send({favorites : docs});


});

app.post('/getFavorites', async (req, res) => {
    if (req.body.idToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    var decodedToken = await firebaseAdminSdk.auth().verifyIdToken(req.body.idToken);
    if (decodedToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    const uid = decodedToken.uid;

      let userRef = db.collection('users').doc(uid);

                  let categoriesRef = userRef.collection('IngredientList');
                  let arr = [];
                  let json = {};

                  let categories = await categoriesRef.get();
                  let categoriesArr = [];

                  categories.forEach(category => {
                    categoriesArr.push(category);
                  });

                  for (let i = 0; i < categoriesArr.length; ++i) {
                    let ingredients = await categoriesRef.doc(categoriesArr[i].id).collection('Ingredients').get();
                    // would check if expired here I guess. If wanted to add that
                    ingredients.forEach(ingredient => {
                        let data = ingredient.data();
                        let expiration = new Date(data.expiration).getTime();
                        let date = Date.now();
                        let days = Math.floor((expiration - date) / (1000 * 3600 * 24)) + 1;
                        if (days >= 0) {
                          arr.push(ingredient.data().ingredient);
                        }
                    });

                  }
                  console.log(arr);
      const favoritesRef = userRef.collection('BookmarkedRecipes');
      const favoritesDocs = await favoritesRef.get();
      let docs = [];
      favoritesDocs.forEach(doc => {
          array2 = []
              array1 = []
              match = []
              not = []
              var ratio = 0;
              var total = 0;
              for (let j = 0; j < doc.data().recipe.ingredients.length; j++)
              {
                  var y = 0;
                  for (let k = 0; k < arr.length; k++)
                  {
                      if (arr[k].toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"") == doc.data().recipe.ingredients[j].food.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"") || arr[k].toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").concat("s") == doc.data().recipe.ingredients[j].food.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""))
                      {
                          y = 1;
                          ratio++;
                          total++;
                          match.push(doc.data().recipe.ingredients[j].food)
                      }
                  }
                  total++;
                  if (y == 0)
                  {
                      not.push(doc.data().recipe.ingredients[j].food)
                  }
                  //array1.push(data.hits[i].recipe.ingredients[j].food)
              }
              console.log(doc.data().recipe.match)
              console.log(match)
              ratio = ratio / total
              recipe = doc.data().recipe;
              recipe.match = match
              recipe.not = not;
              recipe.ratio = ratio;
              let origString = doc.data().recipe.uri;
              let replacementString = '_S';
              let uri =  origString.replace(/\//g, replacementString);

              userRef.collection('BookmarkedRecipes').doc(uri).update({recipe: recipe});

      });
      favoritesDocs.forEach(doc => {

        docs.push(doc.data());
      });

      return res.status(200).send({favorites : docs});

});

app.post('/searchRecipe', async (req, res) => {
    if (req.body.idToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    var decodedToken = await firebaseAdminSdk.auth().verifyIdToken(req.body.idToken);
    if (decodedToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    const uid = decodedToken.uid;


    let userRef = db.collection('users').doc(uid);
    const favoritesRef = userRef.collection('BookmarkedRecipes');
    const favoritesDocs = await favoritesRef.get();

                let categoriesRef = userRef.collection('IngredientList');
                let arr = [];
                let json = {};

                let categories = await categoriesRef.get();
                let categoriesArr = [];

                categories.forEach(category => {
                  categoriesArr.push(category);
                });

                for (let i = 0; i < categoriesArr.length; ++i) {
                  let ingredients = await categoriesRef.doc(categoriesArr[i].id).collection('Ingredients').get();
                  // would check if expired here I guess. If wanted to add that
                  ingredients.forEach(ingredient => {
                      let data = ingredient.data();
                      let expiration = new Date(data.expiration).getTime();
                      let date = Date.now();
                      let days = Math.floor((expiration - date) / (1000 * 3600 * 24)) + 1;
                      if (days >= 0) {
                        arr.push(ingredient.data().ingredient);
                      }
                  });

                }
                console.log(arr)
    // Add the favorited URI's to a set.
    let docSet = new Set();
    favoritesDocs.forEach(doc => {
      docSet.add(doc.data().recipe.uri);
    });

    var apikey = process.env.RECIPE_API_KEY
    var app_id = process.env.RECIPE_APP_ID
    var url = 'https://api.edamam.com/search?q=' + req.body.search;

    if (req.body.filters !== undefined && req.body.filters !== null)
      url += '&' + req.body.filters;
    var from = 0;
    var to = 10;
    if (req.body.from != null)
    {
        from = req.body.from;
    }
    if (req.body.to != null)
    {
        to = req.body.from;
    }
    /* or if you want to send page and size of each page. where page 0 is starting.
    page = req.body.page;
    size = req.body.size;
    and then you can do
    url += '&from=' + page * size;
    var next = page + 1;
    url += '&to=' + next * size;
    */
    url += '&from=' + from;
    url += '&to=' + to;
    url += '&app_id='
    url += app_id
    url += "&app_key="
    url += apikey
    const https = require('https');
    var x = "";
    https.get(url, (_res) => {
      _res.on('data', (d) => {
        x += d;
      });
      _res.on("end", function () {
            // Process the search data and figure out which recipes are bookmarked by the user.
            let data = JSON.parse(x);

            // If data doesn't exist return.
            if (data === undefined || data.hits === undefined) {
              return res.status(400).send({response: 'No searches returned'});
            }
            array2 = []
            for (let i = 0; i < data.hits.length; ++i) {
                array1 = []
                match = []
                not = []
                var ratio = 0;
                var total = 0;
                for (let j = 0; j < data.hits[i].recipe.ingredients.length; j++)
                {
                    var y = 0;
                    for (let k = 0; k < arr.length; k++)
                    {
                        if (arr[k].toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"") == data.hits[i].recipe.ingredients[j].food.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"") || arr[k].toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").concat("s") == data.hits[i].recipe.ingredients[j].food.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""))
                        {
                            y = 1;
                            ratio++;
                            total++;
                            match.push(data.hits[i].recipe.ingredients[j].food)
                        }
                    }
                    total++;
                    if (y == 0)
                    {
                        not.push(data.hits[i].recipe.ingredients[j].food)
                    }
                    //array1.push(data.hits[i].recipe.ingredients[j].food)
                }
                data.hits[i].recipe.match = match
                data.hits[i].recipe.not = not
                data.hits[i].recipe.ratio = ratio / total
                array2.push(array1)
              if (docSet.has(data.hits[i].recipe.uri)) {
                data.hits[i].bookmarked = true;
              }
            }

            return res.status(200).send({hits: data.hits});
        });

    }).on('error', (e) => {
      console.error(e);
    });
});

app.post('/userInfo', (req, res) => {
      firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          console.log(user.displayName);
          // eventually an array if needed
          return res.status(200).send(JSON.stringify({response:user.displayName}));
        // User is signed in.
      } else {
          return res.status(400).send(JSON.stringify({response:"Not logged in"}));
        // No user is signed in.
      }
    });
});

app.post('/userSet', (req, res) => {
    var user = firebase.auth().currentUser;

    if (user === null) {
      return res.status(400).send({response: "No user logged in."});
    }

    const res1 = db.collection('users').doc(user.uid)
              .set({
                  Allergies: req.body.allergies,
                  Diet: req.body.diet,
                  UID: user.uid
              });
    console.log(res1);
    return res.status(200).send(JSON.stringify({response:"gottem"}));
});

app.post('/addIngredient', async (req, res) => {
    if (req.body.idToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    var decodedToken = await firebaseAdminSdk.auth().verifyIdToken(req.body.idToken);
    if (decodedToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    const uid = decodedToken.uid;
    if (req.body.category === undefined) {
      return res.status(400).send({response: "category field is required."});
    }
    else if (req.body.ingredient === undefined) {
      return res.status(400).send({response: "ingredient field is required."});
    }

    let userRef = db.collection('users').doc(uid);

    userRef.collection('IngredientList').doc(req.body.category).set({
      category: req.body.category
    });

    let ingredientRef = userRef.collection('IngredientList').doc(req.body.category).collection('Ingredients').doc(req.body.ingredient);
    const currDoc = await ingredientRef.get();
    if (currDoc.exists)
        return res.status(401).send({response: "Ingredient already exists!"});

    let amount = req.body.amount;
    let expiration = req.body.expiration;
    if (amount === undefined)
      amount = '1';
    if (expiration === undefined || expiration.trim().length === 0)
      expiration = 'No Expiration';

    ingredientRef.set({
      ingredient: req.body.ingredient,
      category: req.body.category,
      amount: amount,
      expiration: expiration,
    });

    return res.status(200).send({response : "Added ingredient to database."});
});

app.post('/removeIngredient', async (req, res) => {
    if (req.body.idToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    var decodedToken = await firebaseAdminSdk.auth().verifyIdToken(req.body.idToken);
    if (decodedToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    const uid = decodedToken.uid;


     if (req.body.category === undefined) {
      return res.status(400).send({response: "category field is required."});
    }
    else if (req.body.ingredient === undefined) {
      return res.status(400).send({response: "ingredient field is required."});
    }

    let userRef = db.collection('users').doc(uid);

    let ingredientRef = userRef.collection('IngredientList').doc(req.body.category)
                        .collection('Ingredients').doc(req.body.ingredient);

    const currDoc = await ingredientRef.get();
    if (!currDoc.exists)
        return res.status(401).send({response: "Ingredient doesn't exist!"});

    await ingredientRef.delete();

    return res.status(200).send({response: "Deleted Ingredient."});
});

app.post('/editIngredient', async (req, res) => {
    if (req.body.idToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    var decodedToken = await firebaseAdminSdk.auth().verifyIdToken(req.body.idToken);
    if (decodedToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    const uid = decodedToken.uid;
    if (req.body.category === undefined) {
      return res.status(400).send({response: "category field is required."});
    }
    else if (req.body.ingredient === undefined) {
      return res.status(400).send({response: "ingredient field is required."});
    }
    else if (req.body.expiration === undefined) {
      return res.status(400).send({response: "expiration field is required"});
    }

    let userRef = db.collection('users').doc(uid);

    let ingredientRef = userRef.collection('IngredientList').doc(req.body.category)
                        .collection('Ingredients').doc(req.body.ingredient);

    let ingredient = await ingredientRef.get();

    if (!ingredient.exists)
        return res.status(400).send({response: "Ingredient doesn't exist."});

    let newIngredient = req.body.newIngredient;

    if (newIngredient === undefined)
      newIngredient = req.body.ingredient;

    let newRef = userRef.collection('IngredientList').doc(req.body.category)
                 .collection('Ingredients').doc(newIngredient);

    let newIngredientDoc = await newRef.get();
    if (newIngredientDoc.exists && req.body.ingredient !== newIngredient)
      return res.status(401).send({response: "Ingredient name already exists for this category."});

      await ingredientRef.delete();

      newRef.set({
        ingredient: newIngredient,
        category: req.body.category,
        expiration: req.body.expiration,
      });

    return res.status(200).send({response: "Edited ingredient."});
});

app.post('/addCategory', async (req, res) => {
    if (req.body.idToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    var decodedToken = await firebaseAdminSdk.auth().verifyIdToken(req.body.idToken);
    if (decodedToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    const uid = decodedToken.uid;


    if (req.body.category === undefined) {
      return res.status(400).send({response: "category field is required."});
    }

    let userRef = db.collection('users').doc(uid);
    let categoryRef = userRef.collection('IngredientList').doc(req.body.category);

    const currDoc = await categoryRef.get();
    if (currDoc.exists)
        return res.status(401).send({response: "Category already exists!"});

    categoryRef.set({
      category: req.body.category
    });

    categoryRef.collection('Ingredients');

    return res.status(200).send({response: "Added category."});
});



app.post('/removeCategory', async (req, res) => {
    if (req.body.idToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    var decodedToken = await firebaseAdminSdk.auth().verifyIdToken(req.body.idToken);
    if (decodedToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    const uid = decodedToken.uid;
    if (req.body.category === undefined) {
      return res.status(400).send({response: "category field is required."});
    }

    let userRef = db.collection('users').doc(uid);
    let categoryRef = userRef.collection('IngredientList').doc(req.body.category);

    // Get all the ingredient documents and delete them in the collection.
    const ingredients = await categoryRef.collection('Ingredients').get();
    ingredients.forEach(ingredient => {
      ingredient.ref.delete();
    });

    // Delete the category document.
    await categoryRef.delete();

    return res.status(200).send({response: 'Deleted category'});
});

app.post('/getCategories', async (req, res) => {
    if (req.body.idToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    var decodedToken = await firebaseAdminSdk.auth().verifyIdToken(req.body.idToken);
    if (decodedToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    const uid = decodedToken.uid;

    let userRef = db.collection('users').doc(uid);
    let categoriesRef = userRef.collection('IngredientList');
    let arr = [];
    let json = {};

    let categories = await categoriesRef.get();
    let categoriesArr = [];

    categories.forEach(category => {
      categoriesArr.push(category);
    });

    for (let i = 0; i < categoriesArr.length; ++i) {
      let ingredients = await categoriesRef.doc(categoriesArr[i].id).collection('Ingredients').get();

      ingredients.forEach(ingredient => {
        arr.push(ingredient.data());
      });

      json[categoriesArr[i].id] = arr;
      arr = [];
    }

    return res.status(200).send({categories : json});
});

app.post('/deleteIngredient', async (req, res) => {
    if (req.body.idToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    var decodedToken = await firebaseAdminSdk.auth().verifyIdToken(req.body.idToken);
    if (decodedToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    const uid = decodedToken.uid;

            var array = [];
            var res1 = await db.collection("users").doc(uid).collection("IngredientList").doc(req.body.Ingredient).delete();
            return res.status(200).send(JSON.stringify({response:"Deleted"}));
});


app.post('/getGrocery', async(req, res) => {
    if (req.body.idToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    var decodedToken = await firebaseAdminSdk.auth().verifyIdToken(req.body.idToken);
    if (decodedToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    const uid = decodedToken.uid;

            var array = [];
            var numChecked = 0;
            var res1 = db.collection("users").doc(uid).collection("GroceryList").get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    var data = doc.data();
                    var myId = doc.id;
                    const data1 = {
                        id: myId
                    };

                    var obj = Object.assign(data, data1);

                    if (obj.check)
                      numChecked++;

                    array.push(obj)
                });

                return res.status(200).send(JSON.stringify({response:array, numChecked: numChecked}));
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
                return res.status(400).send(JSON.stringify({response: error}));
            });

});

app.post('/deleteGrocery', async (req, res) => {
    if (req.body.idToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    var decodedToken = await firebaseAdminSdk.auth().verifyIdToken(req.body.idToken);
    if (decodedToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    const uid = decodedToken.uid;
            if (req.body.id === undefined) {
              return res.status(400).send({response: "id is required"});
            }

            var array = [];
            var res1 = await db.collection("users").doc(uid).collection("GroceryList").doc(req.body.id).delete();
            return res.status(200).send(JSON.stringify({response:"Deleted"}));

});

app.post('/addGrocery', async (req, res) => {
    // Checked field
    if (req.body.idToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    var decodedToken = await firebaseAdminSdk.auth().verifyIdToken(req.body.idToken);
    if (decodedToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    const uid = decodedToken.uid;

    const res1 = await db.collection('users').doc(uid).collection('GroceryList').doc()
              .set({
                  ingredient: req.body.ingredient,
                  note: req.body.note,
                  check: false
              });
    return res.status(200).send(JSON.stringify({response:"Success"}));
});

app.post('/addGroceryArray', async (req, res) => {
    // Checked field
    if (req.body.idToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    var decodedToken = await firebaseAdminSdk.auth().verifyIdToken(req.body.idToken);
    if (decodedToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    const uid = decodedToken.uid;

    for (var i = 0; i < req.body.grocery.length; i++)
    {
        const res1 = await db.collection('users').doc(uid).collection('GroceryList').doc()
                  .set({
                      ingredient: req.body.grocery[i],
                      note: "For recipe: " + req.body.recipe,
                      check: 0
                  });
    }

    return res.status(200).send(JSON.stringify({response:"Success"}));
});

app.post('/updateGrocery', async (req, res) => {
    const data1 = {
        ingredient: req.body.ingredient,
        note: req.body.note,
        check: req.body.check
    };
    if (req.body.idToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    var decodedToken = await firebaseAdminSdk.auth().verifyIdToken(req.body.idToken);
    if (decodedToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    const uid = decodedToken.uid;
    if (req.body.note === undefined) {
      return res.status(400).send({response: "note field is required."});
    }
    else if (req.body.ingredient === undefined) {
      return res.status(400).send({response: "ingredient field is required."});
    }
    else if (req.body.check === undefined) {
      return res.status(400).send({response: "check field is required"});
    }
    else if (req.body.id === undefined) {
      return res.status(400).send({response: "id field is required"});
    }

    var docref = await db.collection("users").doc(uid).collection("GroceryList").doc(req.body.id).update(data1);
    return res.status(200).send(JSON.stringify({response:"Updated"}));
});


app.post('/lookupBarcode', async(req, res) => {
    if (req.body.idToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    var decodedToken = await firebaseAdminSdk.auth().verifyIdToken(req.body.idToken);
    if (decodedToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    const uid = decodedToken.uid;
    if (req.body.code === undefined) {
      return res.status(400).send({response: "code field is required."});
    }

    var apikey = process.env.FOOD_API_KEY
    var app_id = process.env.FOOD_APP_ID
    var url = 'https://api.edamam.com/api/food-database/v2/parser?upc=' + req.body.code;

    url += '&app_id='
    url += app_id
    url += "&app_key="
    url += apikey
    const https = require('https');
    var x = "";

    https.get(url, (_res) => {
      _res.on('data', (d) => {
        x += d;
      });
      _res.on("end", function () {
            let data = JSON.parse(x);

            // If data doesn't exist return.
            if (data === undefined) {
              return res.status(400).send({response: 'No data found.'});
            }
            else if (data.error === "not_found") {
              return res.status(401).send({response: data.error});
            }

            return res.status(200).send(data);
      });

    }).on('error', (e) => {
      console.error(e);
      return res.status(400).send({response: e});
    });
});

app.post('/getExpiringIngredients', async (req, res) => {
    if (req.body.idToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    var decodedToken = await firebaseAdminSdk.auth().verifyIdToken(req.body.idToken);
    if (decodedToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    const uid = decodedToken.uid;

    let userRef = db.collection('users').doc(uid);
    let categoriesRef = userRef.collection('IngredientList');
    let categories = await categoriesRef.get();
    let categoriesArr = [];
    let arr = [];

    categories.forEach(category => {
      categoriesArr.push(category);
    });

    for (let i = 0; i < categoriesArr.length; ++i) {
      let ingredients = await categoriesRef.doc(categoriesArr[i].id).collection('Ingredients').get();

      ingredients.forEach(ingredient => {
        let data = ingredient.data();
        let expiration = new Date(data.expiration).getTime();
        let date = Date.now();
        let days = Math.floor((expiration - date) / (1000 * 3600 * 24)) + 1;

        if (days <= 0 || (days > 0 && days <= 5)) {
          data['daysExpired'] = days;
          arr.push(data);
        }
      });
    }

    return res.status(200).send({expiring: arr});
});

app.post('/getUser', async(req, res) => {
    if (req.body.idToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    var decodedToken = await firebaseAdminSdk.auth().verifyIdToken(req.body.idToken);
    if (decodedToken == null)
    {
        return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
    const uid = decodedToken.uid;

            db.collection("users").where("UID", "==", uid)
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            // doc.data() is never undefined for query doc snapshots
                            var data = doc.data();
                            var al = data.Allergies;
                            obj = [{Allergies: data.Allergies}, {Diet: data.Diet}]
                            return res.status(200).send(JSON.stringify({response:obj}));

                        });
                    })
                    .catch(function(error) {
                        console.log("Error getting documents: ", error);
                    });
});

app.post('/changeDisplayName', (req, res) => {
  var user = firebase.auth().currentUser;

  if (user === null) {
    return res.status(400).send({response: "No user logged in."});
  }

  user.updateProfile({
    displayName: req.body.name,
  }).then(function() {
    // Profile updated successfully!
    return res.status(200).send({name: user.displayName});
  })
  .catch(function(error) {
    return res.status(400).send(JSON.stringify({response:error}));
  });

});

if (process.env.NODE_ENV === 'production')
{
  app.use(express.static(__dirname));
  app.use(express.static(path.join(__dirname, "build")));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.get('/', (req, res) => {
	res.send("Helloo")
})

app.use((req, res, next) =>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

// Swagger Hub Init
app.use('/swagger', swagger.serve, swagger.setup(swaggerDocument));
app.use('/backend', router);


router.route('/register')
  .post();

router.route('/login')
  .post();

router.route('/userInfo')
    .post();

router.route('/changeEmail')
     .post();

router.route('/signout')
    .post();

router.route('/resetPassword')
    .post();

const server = app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
});

module.exports = server;
