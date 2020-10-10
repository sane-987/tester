const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/demodb' ,{useNewUrlParser:true} ,{useUnifiedTopology:true})
var db = mongoose.connection;
db.on('error' , console.log.bind(console , 'connection error'));
db.once('open' , function(calback) {
    console.log('connection succeded');
});



module.exports = db;