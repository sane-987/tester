const express = require('express');
const app = express();
const exhbs = require('express-handlebars');
const mongoose =require('mongoose');
const bodyParser = require('body-parser')


app.engine('handlebars',exhbs({
    defaultLayout:'main'
}));

//bodyParser
app.use(express.urlencoded( { extended:false}));

app.set('view engine','handlebars');
app.use(express.json);

app.use(express.static('images'));  
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));



app.listen(3000,() =>{
    console.log('started server at ');
});
