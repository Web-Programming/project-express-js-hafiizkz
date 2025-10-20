const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nama Produk Harus di Isi'],
        trim: true, // untuk menghilangkan spasi di awal dan akhir
    },
    price: {
        type: Number,
        required: [true, "Harga produk harus di isi"],
        min: [1000, "Harga produk harus minimal 1000"]
    },
    description: {
        type: String,
        required: false // opsional
    },
    stock: {
        type: Number,
        default: 0 // Nilai bawaan 0
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

// ✅ Gunakan 1 baris ini saja, aman dari OverwriteModelError
module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema);
