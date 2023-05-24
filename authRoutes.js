const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('./User');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    user = await User.create({
      name,
      email,
      password: hash,
    });
    res.status(201).json({ message: "User registration saved successfully", user });
  } catch (error) {
    res.status(500).json({ message: "An error occurred during registration", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Email not found" });
    }

    const passwordMatched = await bcrypt.compare(password, user.password);

    if (!passwordMatched) {
      return res.status(404).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      "HASANK",
      { expiresIn: '2h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "An error occurred during login", error });
  }
};

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
