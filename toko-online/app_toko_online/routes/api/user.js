const express = require("express");
const router = express.Router();

// Import controller dengan path yang benar
const userController = require("../../controllers/user");

// Create user
router.post('/', userController.createUser);

// Get all users
router.get('/', userController.all);

// Get user by ID
router.get('/:id', userController.detailUser);

// Update user by ID
router.put('/:id', userController.updateUser);

// Delete user by ID
router.delete('/:id', userController.destroy);

module.exports = router;
