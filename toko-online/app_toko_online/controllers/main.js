// app_toko_online/controllers/main.js
var products = require('../../data/products.json');

const index = (req, res) => {
  res.render('index', {
    title: 'Toko Online Sederhana',
    products: products,
    query: null // supaya input pencarian tetap ada
  });
};

const search = (req, res) => {
  const q = req.query.q ? req.query.q.toLowerCase() : "";

  let filteredProducts;
  if (!q) {
    filteredProducts = products; // jika query kosong tampilkan semua
  } else {
    filteredProducts = products.filter(p =>
      p.name.toLowerCase().includes(q)
    );
  }

  res.render('index', {
    title: 'Hasil Pencarian',
    products: filteredProducts,
    query: q
  });
};

// export biar bisa dipanggil di routes/index.js
module.exports = {
  index,
  search
};
