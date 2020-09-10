const express =require('express');

const router = express.Router();

//login
router.get('/login', (req,res) => {
    res.render('login');  
})

//register
router.get('/register', (req,res) => {
    res.render('register');  
})


//register handle
router.post('/register', (req,res) => {
    const {name,email,password1,password2} = req.body;
    let errors=[];
    if(!name || !email || !password1 || !password2){
        errors.push({ msg:'please fill all fields'});
    }
    if(password1!==password2){
        errors.push({ msg:'passwords does not match'});
    }
    if(errors.length>0)
    {
        res.render('register');
    }
    else{
        res.send('hola you pass')
    }
})

module.exports = router;