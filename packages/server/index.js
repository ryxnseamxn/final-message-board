const express = require("express");
const app = express(); 
const functions = require('firebase-functions');


exports.api = functions.https.onRequest(app); 