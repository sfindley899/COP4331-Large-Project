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
    // create user
    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password).then(function() {

          // ...

         // goes in when state is changed.
        firebase.auth().onAuthStateChanged(function(user) {
            if(!res.headersSent)
            {

          if (user) {

            console.log("signed in");
            emailVerified = user.emailVerified;
            console.log(emailVerified)
            // sends email verification
            user.sendEmailVerification().then(function() {
         // Email sent.
         console.log("sent");
         if(!res.headersSent)
         {
             return res.status(200).send("email verification sent");
         }
         // catches errors for email ver
       }).catch(function(error) {
         // An error happened.
         console.log(error);
       });
            return;
          } else {
            // No user is signed in.
          }
       }
       });
       // catches problems with creating user.
    }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(error.message);
    if (error.message != null)
    {
        y = error.message;
        return res.status(400).send("email already exists");
    }
  });


 });
  app.post('/login', (req, res) => {
      if(!res.headersSent) {
      // signs in
      firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then(function() {
          if(!res.headersSent) {
              firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                  // User is signed in.
                  console.log("signed in");
                  // checks if email is verified
                  if (user.emailVerified == false)
                  {
                      console.log("email not verified resending email");
                      user.sendEmailVerification().then(function() {
                   // Email sent.
                   console.log("sent");
                 }).catch(function(error) {
                   // An error happened.
                   console.log(error);
                 });
                      // sends email not verified status
                      return res.status(401).send("email not verified");
                  }
                  // sends 200 when email is verified.
                  else if(user != null) {
                      console.log("emailVerified");
                      // sends token to get UID back later.
                      firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
                          // Send token to your backend via HTTPS
                          // ...
                return res.status(200).send({token: idToken});
                    }).catch(function(error) {
                    // Handle error
                    });

                  }
                  // user not signed in
                } else {
                  // No user is signed in.

                }
             });
          }
          // catches when sign in has problems.
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error.message);
        // ...
        return res.status(400).send("no user");

     });
 }

  });



  app.post('/resetPassword', (req, res) => {
      var auth = firebase.auth();

    var emailAddress = req.body.email;

    auth.sendPasswordResetEmail(emailAddress).then(function() {
        return res.status(200).send("email ver sent");
        // Email sent.
  }).catch(function(error) {
      return res.status(400).send(error);

  })


  });

if (process.env.NODE_ENV === 'production')
{
	app.use(express.static('frontend/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
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

app.listen(port, () => {
		console.log(`Server is running on port: ${port}`);
});
