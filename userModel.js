const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'a username is required']
    },
    email: {
        type: String,
        required: [true, 'a username is required'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'enter a valide email']
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'password is required'],
        validate: function(el){
            return el === this.password
        },
        message: 'passwords should match!'
    }
})

userSchema.pre('save', async function(next){

    //runs if password is modified
    if(!this.isModified('password')) return next();

    //encrypt the password with a cost of 12
    this.password =await bcrypt.hash(this.password, 12);

    //delete confirm password
    this.passwordConfirm = undefined;
    next();


});
userSchema.methods.correctPassword = async function(candidatePassword, userpassword){
    return await bcrypt.compare(candidatePassword, userpassword)
}

const User = mongoose.model('User', userSchema);
module.exports = User;