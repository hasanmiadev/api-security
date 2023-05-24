const authenticate = require('./authenticate');

const router = require('express').Router();

router.get('/public',authenticate, (req, res)=> {
    res.status(200).json({message:"I am Public Router Any one use it!"})
})

router.get('/protectd', authenticate, (req, res)=> {
    res.status(200).json({message:"Welcome to DeashBoard"});
})


module.exports = router