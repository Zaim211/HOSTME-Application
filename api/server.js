const router = require("./routes/index");
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require('cookie-parser')

// middleware to parse incoming requests
app.use(express.json());
// middleware to parse cookies
app.use(cookieParser());

// middleware to load environment variables
require("dotenv").config();

// middleware to connect with frontend
app.use(cors({
    origin: "https://hostme-application.vercel.app/",
    credentials: true,
}));

// middleware to serve static files
app.use('/uploads', express.static(__dirname+'/uploads'));

// middleware to load routes
app.use('/api', router);


app.listen(process.env.API_PORT, () => {
    console.log("Server started");
});

module.exports = app;