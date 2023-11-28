const express = require ( 'express');
const mongoose = require ('mongoose');
const bcryptjs = require ('bcryptjs')
const cors = require ('cors');
const bodyParser = require ('body-parser');
const passport = require ('passport')
const userRoute = require ('./routes/user.Route');
const pickupRoute = require('./routes/pickup.Route');
const Router = require ("./routes/contact.Route");
const authRouter = require('./middleware/auth');
// const session = require('express-session')
// const dotenv = require ('dotenv');
// const jsonwebtoken = require ('jsonwebtoken');




const app = express();
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(session({
//     secret: '$$$19274bad%%good##@2*0*2*3', 
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: true },
// }));


const corsOptions = {
    "origin": "http://localhost:5500",
    "method": "POST, GET, PATCH, PUT, DELETE",
    "preflightContinue": false,
    "optionSuccessStatus": 204
};



app.use('/', userRoute);
app.use('/', pickupRoute);
app.use('/', Router);
app.use('/', authRouter)


const mongoURI = "mongodb+srv://tapjidan:Gutet2023@trashpoint.qsmced1.mongodb.net/trashdb?retryWrites=true&w=majority";

mongoose.connect(mongoURI, { 
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`)
    });
})
.catch((err) => console.error('Error connecting to MongoDB:', err));
  
  
const port = 5500;
  
