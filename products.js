const express = require("express");
const router = express.Router();
const { products } = require("../data");

router.get("/", (req, res) => {
  res.json(products);
});

router.get("/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});

router.post("/", (req, res) => {
  const { id, name, price, stock } = req.body;
  if (products.some((p) => p.id === id)) {
    return res.status(400).json({ message: "Product already exists" });
  }

  if (price <= 0 || typeof price !== "number") {
    return res.status(400).json({ message: "Invalid price" });
  }
  if (stock < 0 || typeof stock !== "number") {
    return res.status(400).json({ message: "stock חייב להיות מספר חיובי" });
  }
  const newProduct = { id, name, price, stock };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

router.put("/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: "המוצר לר קיים !" });
  }

  const { name, price, stock } = req.body;

  if (price <= 0 || typeof price !== "number") {
    return res.status(400).json({ message: "price חייב להיות מספר גדול מ-0" });
  }
  if (stock < 0 || typeof stock !== "number") {
    return res.status(400).json({ message: "stock חייב להיות מספר חיובי" });
  }

  product.name = name || product.name;
  product.price = price || product.price;
  product.stock = stock || product.stock;

  res.json(product);
});

router.delete("/:id", (req, res) => {
  const index = products.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "מוצר לא נמצא" });
  }
  products.splice(index, 1);
  res.json({ message: "המוצר נמחק בהצלחה" });
});

module.exports = router;
