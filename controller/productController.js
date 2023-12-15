import fs from "fs";
import productModel from "../model/productModel.js";
import slugify from "slugify";

// CRETAING THE PRODUCT
export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;

    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is rqeuired" });
      case !description:
        return res.status(500).send({ error: "Description is rqeuired" });
      case !price:
        return res.status(500).send({ error: "Price is rqeuired" });
      case !category:
        return res.status(500).send({ error: "Category is rqeuired" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is rqeuired" });
      case !photo && photo.size > 100000:
        return res
          .status(500)
          .send({ error: "Phone is rqeuired and should be less than 1mb" });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Creating Product",
      error,
    });
  }
};

// GETTING THE PRODUCT
export const getProductsController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      totalCount: products.length,
      message: "list fetched Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting products",
      error,
    });
  }
};

// GET THE SINGLE PRODUCT
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(201).send({
      success: true,
      message: "item fetched Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting Single Product",
      error,
    });
  }
};

// get photo
export const getProductPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting photo",
      error,
    });
  }
};

// Delete product
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting Product",
      error,
    });
  }
};

// Update THE PRODUCT
export const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;

    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is rqeuired" });
      case !description:
        return res.status(500).send({ error: "Description is rqeuired" });
      case !price:
        return res.status(500).send({ error: "Price is rqeuired" });
      case !category:
        return res.status(500).send({ error: "Category is rqeuired" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is rqeuired" });
      case !photo && photo.size > 100000:
        return res
          .status(500)
          .send({ error: "Phone is rqeuired and should be less than 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Updating Product",
      error,
    });
  }
};

// product filter controller
export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while filtering product",
      error,
    });
  }
};

// PRODUCT COUNT
export const productCountFilter = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in product count",
      error,
    });
  }
};

// PRODUCT LIST BASE ON  PAGE

export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const product = await productModel
      .find({})
      .select("-photot")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};
