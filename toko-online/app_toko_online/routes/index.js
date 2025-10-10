var express = require("express");
var router = express.Router();
var mainController = require("../controllers/main");
var productController = require("../controllers/product");

// Home
router.get("/all", productController.index);

router.get('/', (req, res) => {
  const q = req.query.q || ''; // contoh ambil dari query string ?q=...
  
  res.render('index', {
    title: 'Toko Online Sederhana',
    products: products,
    query: q   // ✅ kirim ke ejs
  });
});


// Search
router.get("/search", mainController.search);

module.exports = router;