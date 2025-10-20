const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/order');
const auth = require('../middleware/authMiddleware');

// Buat pesanan baru
router.post('/', auth.adminOnly, orderController.createOrder);

// Ambil semua pesanan
router.get('/', orderController.getAllOrders);

// Ambil detail pesanan berdasarkan ID
router.get('/:id', orderController.getOrderById);

// Update status pesanan
router.put('/:id', orderController.updateOrderStatus);

// (Opsional) Hapus pesanan
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
