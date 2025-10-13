const express = require("express");
const router = express.Router();
const productController = require("../../controllers/product");

//url create - POST | alamat (/api/produk)
router.post("/", productController.create);

//url read all - GET | alamat (/api/produk) walaupun sama alamatnya tidak masalah karena beda method
router.get("/", productController.apiall); //done
//url read one - detail - GET | alamat (/api/produk/:id)
router.get("/:id", productController.detailproduk);
//url update - PUT | alamat (/api/produk/:id)
router.put("/:id", productController.update);
//url delete - DELETE | alamat (/api/produk/:id)
router.delete("/:id", productController.remove);

module.exports = router;