// Import the dependencies
const express = require("express");
const path = require('path')
const cookieParser = require('cookie-parser');


// Routing Purpose
const { restrictToLoggedInuseronly, checkAuth } = require('./middleware/auth.middleware');
const { connectDB } = require("./connection");
const URL = require("./model/user");
const staticRoute = require('../URL_Shortner/routes/staticRouter')
const urlRoute = require("./routes/user")
const userRoute = require('./routes/user.route')

// app initialisation and the port number declaration
const app = express();
const PORT = 8100;

// MongoDB connection
connectDB('mongodb://localhost:27017/short-url-1')
.then(()=>{
    console.log("MongoDB connected!!!")
})

// EJS set-up
app.set("view engine", "ejs");
app.set('views',path.resolve('./views'));


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());

// App Routing
app.use("/url",restrictToLoggedInuseronly, urlRoute);  // Inline MiddleWare
app.use('/user', userRoute);
app.use('/', checkAuth, staticRoute);


// GET short URL redirect
app.get('/url/:shortId', async (req, res) => {
    // console.log("🔥🔥 Route HIT: /url/:shortId");

    const shortId = req.params.shortId;
    //console.log(`🔎 Attempting to find shortId: ${shortId}`);
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                    timestamp: Date.now(),
                    },
                },
            }
        );

        if (!entry) {
            console.log(`❌ No entry found for shortId: ${shortId}`);
            return res.status(404).send("Short URL not found");
        }

        console.log(`➡️ Redirecting to: ${entry.redirectURL}`);
        res.redirect(entry.redirectURL);
});


app.listen( PORT, () => {
  console.log(( `Server is connected at port : ${PORT}`)) ;
});


