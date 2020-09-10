const express = require('express');
const app = express();
const exhbs = require('express-handlebars');
const mongoose =require('mongoose');

//db config
const db = require('./config/keys').MongoURI;

//connect to mongo
mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true})
    .then( () => console.log('mongodb connected>>>...')) 
    .catch(err => console.log(err))


app.engine('handlebars',exhbs({
    defaultLayout:'main'
}));

//bodyParser
app.use(express.urlencoded( { extended:false}));

app.set('view engine','handlebars');

app.use(express.static('images'));
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));



app.listen(3000 ,() =>{
    console.log('started server');
});
