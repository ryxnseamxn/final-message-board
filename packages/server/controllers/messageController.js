const db = require("../db/db");
const asyncHandler = require("express-async-handler");

exports.getMessages = asyncHandler( async (req, res) => {
    let messages = await db.getMessages(); 
    res.json({ messages: messages}); 
}); 

exports.addMessage = asyncHandler(async (req, res) => {
    const text = req.body.text; 
    const user = req.body.user;
    res.send(await db.addMessage(user, text)); 
}); 

exports.getMessage = asyncHandler(async (req, res) => {
    let message = await db.getMessage(req.params.id); 
    res.json({ message: message })
});