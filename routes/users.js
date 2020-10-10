const express =require('express');
const router = express.Router();
const db = require('../config/keys');
//login
router.get('/login', (req,res) => {
    res.render('login');  
})
//register
router.get('/register', (req,res) => {
    res.render('register' , {success:''});  
})

router.get('/logout' , (req , res) => {
    res.render('login' , {success:''});
})

//register handle
router.post('/register', (req,res) => {
    var {name,email,password1,password2} = req.body;
    var data = {
        "name" :name ,
        "email" : email ,
        "password" : password1
    }
    let errors=[];
    if(name === '' || email ==='' || password1 === '' || password2 === '')
    {
        errors.push({msg:'please fill in the details'});
        console.log(errors);
        res.render('register' , {unsuccess:'please enter full details'});
    }
    else if(password1 !== password2){
        errors.push({msg:'password do not match'});
        console.log(errors);
        res.render('register' , {unsuccess:'password does not match'});
    }
    
    else{
        db.collection('details').insertOne(data , function (err , collection) {
            if(err) throw err;
            console.log('record inserted successfully');
        })
        res.render('register' , {success:'Registered successfully'});
    }
})

router.post('/login' , (req , res) => {
    var email = req.body.email;
    var password = req.body.password;
    let errors=[];
    
    if( email ==='' || password === '')
    {
        errors.push({msg:'please fill in the details'});
        console.log(errors);
        res.render('login' , {unsuccess:'please enter valid details'});
    }
    else {
        db.collection('details').findOne({email , password} , function(err , doc) {
            if(err) throw err;
            if(doc)
            {
                console.log('checked succesfully');
                res.render('dashboard',{username:email, success:'Logged in successfully'});

            }
            else
            {
                res.render('login' , {unsuccess:'please enter valid details'});
            }
        })
        
    }
})

router.post('/dashboard' , (req , res) => {
    var comment = req.body.comment;
    db.collection('details').updateOne({email:'sane@g.com'} , {$set :{comments:comment}});
    console.log(comment);
    res.render('dashboard');
})

module.exports = router;