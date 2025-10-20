const Order = require('../models/order');
const Product = require('../models/Product'); // diasumsikan kamu punya model Product

// 🟢 CREATE Order
const createOrder = async (req, res) => {
  try {
    const { user, orderItems } = req.body;

    if (!user || !orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'User dan orderItems wajib diisi' });
    }

    // Hitung totalAmount berdasarkan orderItems
    let totalAmount = 0;
    for (const item of orderItems) {
      totalAmount += item.priceAtOrder * item.quantity;
    }

    const newOrder = new Order({
      user,
      orderItems,
      totalAmount
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({
      status: true,
      message: 'Pesanan berhasil dibuat',
      data: savedOrder
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Gagal membuat pesanan', error: err.message });
  }
};

// 🟡 GET All Orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'username email') // hanya ambil field penting user
      .populate('orderItems.product', 'name price'); // ambil info produk juga

    res.status(200).json({
      status: true,
      message: 'Berhasil mengambil semua pesanan',
      data: orders
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Gagal memuat pesanan', error: err.message });
  }
};

// 🟡 GET Order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'username email')
      .populate('orderItems.product', 'name price');

    if (!order) {
      return res.status(404).json({ status: false, message: 'Pesanan tidak ditemukan' });
    }

    res.status(200).json({
      status: true,
      message: 'Berhasil mengambil detail pesanan',
      data: order
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Gagal memuat detail pesanan', error: err.message });
  }
};

// ✏️ UPDATE status pesanan
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ status: false, message: 'Pesanan tidak ditemukan' });
    }

    res.status(200).json({
      status: true,
      message: 'Status pesanan berhasil diperbarui',
      data: order
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Gagal memperbarui status pesanan', error: err.message });
  }
};

// 🗑️ DELETE Order (opsional)
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ status: false, message: 'Pesanan tidak ditemukan' });
    }
    res.status(200).json({ status: true, message: 'Pesanan berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Gagal menghapus pesanan', error: err.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
};
