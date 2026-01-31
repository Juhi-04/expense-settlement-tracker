const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false, // This hides the password by default in queries
    },
}, { timestamps: true });

// MENTOR TIP: Encrypt password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  console.log('Entered:', enteredPassword);
  console.log('Stored (Hashed):', this.password); // Ye check karega ki password undefined toh nahi hai
  return await bcrypt.compare(enteredPassword, this.password);
};

// Isse model double register nahi hoga
module.exports = mongoose.models.User || mongoose.model('User', userSchema);