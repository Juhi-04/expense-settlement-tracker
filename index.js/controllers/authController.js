const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing

// REGISTER CONTROLLER

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // 2. Password ko hash (secure) karna
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Hashed password ke saath user create karna
    user = new User({ 
      name, 
      email, 
      password: hashedPassword 
    });

    await user.save();

    // Generate Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({ 
      token, 
      user: { id: user._id, name, email } 
    });

  } catch (err) {
    console.error(err.message); // Error console pe dikhega
    res.status(500).send('Server Error');
  }
};