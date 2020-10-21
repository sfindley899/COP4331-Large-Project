import firebase from 'firebase';
import 'firebase/database'
import "firebase/firestore"

const firebaseAdminSdk = require('firebase-admin'),
    firebaseAdminApp = firebaseAdminSdk.initializeApp({credential: firebaseAdminSdk.credential.cert(
      JSON.parse(Buffer.from(process.env.GOOGLE_CONFIG_BASE64_ENCODED_STRING, 'base64').toString('ascii')))
});
export const db = firebase.database();

export const firestore = firebase.firestore()

export default FireBase;