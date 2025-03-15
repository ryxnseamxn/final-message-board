const express = require("express");
const cors = require('cors');
const messageRouter = require("./routes/messageRouter");
const censor = require("./middleware/censor"); 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: [
    'https://message-board-6c23d.web.app',
    'https://message-board-6c23d.firebaseapp.com',
    'http://localhost:3000'
  ],
  credentials: true
}));

app.use(express.json());
app.use(censor);
app.use(messageRouter);

// Health check endpoint
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});