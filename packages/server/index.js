require('dotenv').config();
const express = require("express");
const cors = require('cors');
const messageRouter = require("./routes/messageRouter");
const censor = require("./middleware/censor"); 
const functions = require('firebase-functions');
const app = express(); 

const allowedOrigins = [
    'https://react-message-app-31d4f.firebaseapp.com', 
    'https://react-message-app-31d4f.web.app', 
    'http://localhost:3000'
]

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(censor); 
app.use(messageRouter); 

exports.api = functions.https.onRequest(app); 