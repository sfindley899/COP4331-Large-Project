const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


require('dotenv').config();

const firebaseAdminSdk = require('firebase-admin'),
    firebaseAdminApp = firebaseAdminSdk.initializeApp({credential: firebaseAdminSdk.credential.cert(
      JSON.parse(Buffer.from(process.env.GOOGLE_CONFIG_BASE64_ENCODED_STRING, 'base64').toString('ascii')))
});


const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
	res.send("server running")
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

app.listen(port, () => {
		console.log(`Server is running on port: ${port}`);
});