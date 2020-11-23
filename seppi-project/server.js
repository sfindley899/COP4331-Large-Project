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

  res.setHeader('Content-Type', 'application/json');
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
      res.setHeader('Content-Type', 'application/json');
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
                      return res.status(200).send({
                        name: user.displayName,
                        email: user.email,
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
      res.setHeader('Content-Type', 'application/json');
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
      res.setHeader('Content-Type', 'application/json');
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        return res.status(200).send(JSON.stringify({response:"successfully signed out"}));
      }).catch(function(error) {
        // An error happened.
        return res.status(400).send(JSON.stringify({response:error}));
      });
});

app.post('/changeEmail', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
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
  res.setHeader('Content-Type', 'application/json');
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
    res.setHeader('Content-Type', 'application/json');
    var user = firebase.auth().currentUser;

    if (user !== null)
    {
      let origString = req.body.recipe.uri;
      let replacementString = '_S';
      let uri =  origString.replace(/\//g, replacementString);

      // Add the recipe JSON object to user's favorites list.
      let userRef = db.collection('users').doc(user.uid);
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
    }
    else
    {
      return res.status(400).send(JSON.stringify({response : 'No user'}));
    }
});

app.post('/removeFavorite', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    var user = firebase.auth().currentUser;

    if (user !== null) {
      let origString = req.body.uri;
      let replacementString = '_S';
      let uri =  origString.replace(/\//g, replacementString);

      let userRef = db.collection('users').doc(user.uid);

      const favoritesRef = userRef.collection('BookmarkedRecipes');
      await favoritesRef.doc(uri).delete();

      // Return the new favorite docs as a response.
      const favoritesDocs = await favoritesRef.get();
      let docs = [];
      favoritesDocs.forEach(doc => {
        docs.push(doc.data());
      });

      return res.status(200).send({favorites : docs});
    }
    else {
      return res.status(400).send({response: 'No user'});
    }
});

app.post('/getFavorites', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    var user = firebase.auth().currentUser;

    if (user !== null) {
      let userRef = db.collection('users').doc(user.uid);

      const favoritesRef = userRef.collection('BookmarkedRecipes');
      const favoritesDocs = await favoritesRef.get();
      let docs = [];
      favoritesDocs.forEach(doc => {
        docs.push(doc.data());
      });

      return res.status(200).send({favorites : docs});
    }
    else {
      return res.status(400).send(JSON.stringify({response: 'No user'}));
    }
});

app.post('/searchRecipe', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    var user = firebase.auth().currentUser;

    if (user === null) {
      return res.status(400).send({response: 'No User'});
    }

    let userRef = db.collection('users').doc(user.uid);
    const favoritesRef = userRef.collection('BookmarkedRecipes');
    const favoritesDocs = await favoritesRef.get();

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

            for (let i = 0; i < data.hits.length; ++i) {
              if (docSet.has(data.hits[i].recipe.uri)) {
                data.hits[i].bookmarked = true;
              }
            }

            return res.status(200).send(data);
        });

    }).on('error', (e) => {
      console.error(e);
    });
});

app.post('/userInfo', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
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


    // Add a new document in collection "cities" with ID 'LA'
    var user = firebase.auth().currentUser;
    const res1 = db.collection('users').doc(user.uid)
              .set({
                  Allergies: req.body.allergies,
                  Diet: req.body.diet,
                  UID: user.uid
              });
    console.log(res1);
    return res.status(200).send(JSON.stringify({response:"gottem"}));
});



app.post('/addIngredient', (req, res) => {


    // Add a new document in collection "cities" with ID 'LA'
    var user = firebase.auth().currentUser;
    const res1 = db.collection('users').doc(user.uid).collection('IngredientList').doc(req.body.Ingredient)
              .set({
                  Ingredient: req.body.Ingredient,
                  Amount: req.body.Amount,
                  ExpirationDate: req.body.Expiration
              });
    console.log(res1);
    return res.status(200).send(JSON.stringify({response:"Success"}));
});

app.post('/getIngredients', (req, res) => {
            var user = firebase.auth().currentUser;
            var array = [];
            var res1 = db.collection("users").doc(user.uid).collection("IngredientList").get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    var data = doc.data();
                    var obj = [{Ingredients: data.Ingredients}]
                    array.push(obj);

                });
                return res.status(200).send(JSON.stringify({response:array}));
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });

});

app.post('/getUser', (req, res) => {
            var user = firebase.auth().currentUser;
            db.collection("users").where("UID", "==", user.uid)
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
  res.setHeader('Content-Type', 'application/json');
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      user.updateProfile({
        displayName: req.body.name,
      }).then(function() {
        // Profile updated successfully!
        return res.status(200).send({name: user.displayName});
      })
      .catch(function(error) {
        return res.status(400).send(JSON.stringify({response:error}));
      });
    }
    else {
      return res.status(400).send({response: "User not logged in."});
    }
  });
});

app.post('/userInfo', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
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

app.listen(port, () => {
		console.log(`Server is running on port: ${port}`);
});
