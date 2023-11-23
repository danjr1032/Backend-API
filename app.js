const express = require ( 'express');
const mongoose = require ('mongoose');
const bcryptjs = require ('bcryptjs')
const cors = require ('cors');
// const jsonwebtoken = require ('jsonwebtoken');
const bodyParser = require ('body-parser');
// const dotenv = require ('dotenv');
const userRoute = require ('./routes/user.Route');
const pickupRoute = require('./routes/pickup.Route');
const Router = require ("./routes/contact.Route");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const corsOptions = {
    "origin": "http://localhost:5500",
    "method": "GET, POST, PATCH, PUT, DELETE",
    "preflightContinue": false,
    "optionSuccessStatus": 204
};



app.use('/', userRoute);
app.use('/', pickupRoute);
app.use('/', Router);
  


const mongoURI = "mongodb+srv://tapjidan:Gutet2023@trashpoint.qsmced1.mongodb.net/trashdb?retryWrites=true&w=majority";

mongoose.connect(mongoURI, { 
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => console.error('Error connecting to MongoDB:', err));
  
  
const port = 5500;
  
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});
