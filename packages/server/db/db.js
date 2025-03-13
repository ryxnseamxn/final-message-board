const connection = require('./pool'); 
const asyncHandler = require('express-async-handler');

exports.addMessage = asyncHandler( async (user, message) => {
    await connection.query(`INSERT INTO messages ("user", message, added) VALUES ($1, $2, NOW())`, [user, message]); 
});

exports.getMessages = asyncHandler( async () => {
    let result = await connection.query(`SELECT * FROM messages`); 
    return result.rows; 
});

exports.getMessage = asyncHandler( async (id) => {
    let result = await connection.query(`SELECT * FROM messages WHERE id = $1`, [id]); 
    return result.rows; 
});       