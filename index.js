const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
const cors = require('cors');

// Parse cookies before your custom middleware
app.use(cookieParser());

dotenv.config({path: './config.env'});
require('./db/connection');;


// Set up CORS with specific options
const corsOptions = {
    origin: 'https://shy-gray-raven-wrap.cyclic.app/',
    credentials: true,
  };
  
  app.use(cors(corsOptions));

//Middlewares:(Connecting with Router Files)
app.use(require('./router/todo'));
app.use(express.json()); 

//serve Client:
app.use(express.static(path.join('https://shy-gray-raven-wrap.cyclic.app/',"./frontEnd/dist")));

app.get("*", (req, res) => {
    res.sendFile('./frontEnd/dist/index.html',
        function(err) {
            res.status(500).send(err)
        }
    )
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, (e) => {
    if (e) console.log("Error in server setup.");
    console.log("Server is running on Port ", PORT);
})