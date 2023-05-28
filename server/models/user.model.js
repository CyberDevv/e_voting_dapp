import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [2, 'Name must be at least 2 characters long'],
   },
   email: {
      type: String,
      required: [true, 'Email is required'],
      validate: {
         validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
         message: 'Please enter a valid email',
      },
   },
   hashPassword: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters long'],
   },
   role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
   },
   accountAddress: {
      type: String,
   },
   createdOn: {
      type: Date,
      default: Date.now,
   },
});

userSchema.methods.comparePassword = (password, hashPassword) => {
   return bcrypt.compareSync(password, hashPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;



// const userSchema = new mongoose.Schema({
//    address: { type: String, required: true },
//    authenticated: { type: Boolean, default: false },
//    nonce: { type: String },
//    authToken: { type: String },
// });
