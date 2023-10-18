const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;


const createProduct = asyncHandler(async (req, res) => {
  //destructure product
  const { name, sku, category, quantity, price, description } = req.body;

  //validation
  if (!name || !category || !quantity || !price || !description) {
    res.status(400);
    throw new Error("Please fil in all the required fields");
  }


  //handle image upload
  let fileData = {};
  if (req.file) {
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Inventory App",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image can not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  //create Product
  const product = await Product.create({
    user: req.user.id,
    name,
    sku,
    category,
    quantity,
    price,
    description,
    image: fileData,
  });
  res.status(201).json(product);
});

//get all products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.user.id }).sort("-createdAt");
  res.status(200).json(products);
});

//get a product
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  //match product to  a user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not Authorized");
  }
  res.status(200).json(product);
});

//deleteProducts
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await product.deleteOne();
  res.status(200).json({ message: "Product deleted" });
});

//updateProducts

const updateProduct = asyncHandler(async (req, res) => {
  const { name, category, quantity, price, description } = req.body;
  const { id } = req.params;

  // const product = await Product.findById(id);
  const product = await Product.findById(id);


  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // if (!product) {
  //   res.status(404);
  //   throw new Error("Product not found");
  // }

  /// matach product to user

  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  //handle image upload
  let fileData = {};
  if (req.file) {
    //save to cloudanary
    let uploadFile;
    try {
      uploadFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Inventory App",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image couldn't br upload");
    };
  
    // fileData = {
    //   fileName: req.file.originalname,
    //   filePath: uploadedFile.secure_url,
    //   fileType: req.file.mimetype,
    //   fileSize: fileSizeFormatter(req.file.size, 2),
    // };
    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }
   // Update Product
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: id },
      {
        name,
        category,
        quantity,
        price,
        description,
        image: Object.keys(fileData).length === 0 ? product?.image : fileData,
      },
      {
        new: true,
        runValidator: true
      }
    );

  res.status(200).json(updatedProduct)
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
