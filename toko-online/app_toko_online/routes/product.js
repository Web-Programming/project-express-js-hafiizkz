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

// review produk berdasarkan ID
    router.get('/:productId/review/:reviewId', function(req, res, next){
        const productId = req.params.productId;
        const reviewId = req.params.reviewId;
        // kirim kedua parameter ke view untuk ditampilkan 
        res.render('review-detail', {
            title: `Ulasan ${reviewId} untuk Produk ${productId}`,
            productId: productId,
            reviewId: reviewId
        })
    })

module.exports = router;
