const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username harus diisi'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email harus diisi'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Harap isi alamat email yang valid',
        ]
    },
    password: {
        type: String,
        required: [true, 'Password harus diisi'],
        minlength: [6, 'Kata sandi minimal 6 karakter'],
        select: false // password tidak ikut saat GET query
    },
    address: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    createdAt: { // <== perbaikan
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
