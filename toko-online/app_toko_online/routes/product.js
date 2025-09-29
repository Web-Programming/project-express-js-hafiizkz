const express = require('express');
const router = express.Router();
const products = require("../../data/products.json");

// detail produk by ID
router.get("/:id", function(req, res, next){
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).render("error", { 
            message: "Produk tidak ditemukan", 
            error: {} 
        });
    }

    res.render('product-detail', {
        title: product.name,
        product
    });
});

module.exports = router;
