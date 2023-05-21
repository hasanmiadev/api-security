const router = require('express').Router();
const User = require('./User')
const bcrypt = require('bcryptjs');
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "Email already Exist" });
    }
    const getSalt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, getSalt);
    user = await new User({
        name,
        email,
        password: hash
    })
    await user.save()
    res.status(201).json({ message: "User saved successfully", user })
})
router.post('/login', (req, res) => {

})


module.exports = router