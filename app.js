const express = require ( 'express');
const mongoose = require ('mongoose');
const bcryptjs = require ('bcryptjs')
const cors = require ('cors');
const bodyParser = require ('body-parser');
const passport = require ('passport')
const session = require ('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const userRoute = require ('./routes/user.Route');
const requestRouter = require('./routes/request.Route');
const Router = require ("./routes/contact.Route");
const authRouter = require('./middleware/auth');


// const dotenv = require ('dotenv');
// const jwt = require ('jsonwebtoken');







const app = express();
const store = new MongoDBStore({
    uri:"mongodb+srv://tapjidan:Gutet2023@trashpoint.qsmced1.mongodb.net/trashdb?retryWrites=true&w=majority",
    collection: 'mySessions'
  });
  
  store.on('error', function(error) {
    console.log(error);
  });

app.use(passport.initialize());


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
      secret: 'iamtryingmybesttobeadeveloper', 
      resave: true,
      saveUninitialized: true,
      store: store,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, 
      },
    })
  );


const corsOptions = {
    "origin": "http://localhost:5500",
    "method": "POST, GET, PATCH, PUT, DELETE",
    "preflightContinue": false,
    "optionSuccessStatus": 204
};



app.use('/user', userRoute);
app.use('/request',  requestRouter);
app.use('/contact', Router);
app.use('/', authRouter)

const mongoURI = "mongodb+srv://tapjidan:Gutet2023@trashpoint.qsmced1.mongodb.net/trashdb?retryWrites=true&w=majority";

mongoose.connect(mongoURI, { 
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`)
    });
})
.catch((err) => console.error('Error connecting to MongoDB:', err));
  
  
const port = 5500;
  
