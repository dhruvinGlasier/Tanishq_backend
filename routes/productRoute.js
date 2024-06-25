const express = require("express");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");
const Product = require("../models/product.model");
const router = express.Router();
const multer  = require("multer");

const storage = multer.diskStorage({
  destination:(req,file,cb) =>{
      cb(null,"public/images")
  },
  filename:(req,file,cb) =>{ 
      cb(null, Date.now() + "-" + file.originalname)
  }
})

const upload = multer({
  storage:storage,
  limits: { fileSize: 1024 * 1024 * 5 }
})

router.post("/", verifyTokenAndAdmin, upload.single('file'), async (req, res) => {
  try {
  // const { title , description , price , category } = req.body
  const title = req.body.title
  const description = req.body.description
  const price = req.body.price
  const category = req.body.category
  console.log("------",req.file,title,description,price,category);
  const image = req.file.filename
  const newProduct = new Product({
    title:title,
    description:description,
    price:price,
    category:category,
    image:`http://localhost:4500/images/${image}`
  });
  console.log("----this is new",newProduct);
    const savedProduct = await newProduct.save();
    console.log("savedProduct----------", savedProduct);
    res.status(200).json({ savedProduct, success: true, error: false });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(`${deletedProduct} has been deleted`);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ _id: -1 }).limit(5);
    } else if (qCategory) {
      products = await Product.find({
        category: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch {
    res.status(500).json(error);
  }
});

module.exports = router;
