const User = require("../models/user");

const all = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      status: true,
      message: "Data user berhasil diambil",
      data: users
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Gagal memuat user",
      error: err.message
    });
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      isAdmin: req.body.isAdmin,
    });

    const user = await newUser.save();

    res.status(201).json({
      status: true,
      message: 'User berhasil disimpan',
      data: user
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: 'Gagal membuat user',
      error: err.message
    });
  }
};

const detailUser = async (req, res) => {
  try {
    const userid = req.params.id;
    const user = await User.findById(userid);

    if (!user) {
      return res.status(404).json({
        status: false,
        message: 'User tidak ditemukan'
      });
    }

    res.status(200).json({
      status: true,
      message: 'Berhasil mengambil detail user',
      data: user
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: 'Gagal mengambil detail user',
      error: err.message
    });
  }
};


const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: 'User tidak ditemukan'
      });
    }

    res.status(200).json({
      status: true,
      message: 'User berhasil diupdate',
      data: user
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: 'Gagal mengupdate user',
      error: err.message
    });
  }
};

const destroy = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User tidak ditemukan"
      });
    }

    res.status(200).json({
      status: true,
      message: "User berhasil dihapus"
    });
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).json({
        status: false,
        message: "Format ID tidak valid"
      });
    } else {
      res.status(500).json({
        status: false,
        message: "Internal Server Error",
        error: err.message
      });
    }
  }
};

module.exports = {
  all,
  createUser,
  detailUser,
  updateUser,
  destroy
};
