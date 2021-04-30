const Product = require("./product.model");
const Category = require("../category/category.model")
const User = require("../user/user.model")
const Wishlist = require("../whiteList/wishlist.model")
const fs = require("fs");

exports.index = async (req, res, next) => {
  try {
    const product = await Product.find().sort({ createdAt: -1 });
    if (!product)
      return res
        .status(200)
        .send({ status: false, error: "oops ! Something went wrong" });

    return res.status(200).json({ status: true, message: "success", product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error });
  }
};

exports.byuserId = async (req, res, next) => {
  const user = await User.findById(req.params.user_id);
  if (req.params.user_id) {
    if (!user)
      return res.status(422).json({
        status: false,
        message: "Oops ! user does not Exist",
      });
  }
  const product = await Product.find();
  if (!product)
    return res.status(422).json({
      status: false,
      message: "Oops ! product does not Exist",
    });

  const data = []
  for (var i = 0; i < product.length; i++) {
    const product_ = {
      _id: product[i]._id,
      english_name: product[i].english_name,
      gujrati_name: product[i].gujrati_name,
      isWish: false
    }

    data.push(product_)
  }

  const wish = await Wishlist.find();

  for (var i = 0; i < data.length; i++) {
    await wish.map((wish) => {

      if (wish.wishlistid_user.toString() == req.params.user_id.toString() && data[i]._id == wish.wishlistid_product.toString()) {

        return data[i].isWish = true;
      }

    });
  }

  return res.status(200).json({ status: false, message: "success", data })

};
exports.store = async (req, res, next) => {
  try {
    if (!req.body.category) {
      const isExist = await Category.exists({ _id: req.body.category });
      if (!isExist)
        return res.status(422).json({
          status: false,
          message: "Oops ! user does not Exist",
        });
    }
    if (!req.body)
      return res
        .status(200)
        .json({ status: false, message: "Oops ! Invalid Details" });
    if (!req.files)
      return res
        .status(200)
        .json({ status: false, message: "Oops ! Image is Required" });

    if (!req.body.gujrati_name)
      return res
        .status(200)
        .json({ status: false, message: "Oops ! gujrati_name is required !" });

    if (!req.body.english_name)
      return res
        .status(200)
        .json({ status: false, message: "Oops ! english_name is required !" });
    const product = new Product();

    product.gujrati_name = req.body.gujrati_name;
    product.english_name = req.body.english_name;
    product.price = req.body.price;
    product.description = req.body.description;
    product.iswishlist = req.body.iswishlist;
    product.isdisable = req.body.isdisable;
    product.ispopular = req.body.ispopular;
    product.product_id = req.body.product_id;
    product.Image1 = req.files.Image1[0].path;
    product.Image2 = req.files.Image2[0].path;
    product.Image3 = req.files.Image3[0].path;
    product.category = req.body.category;
    product.variant = req.body.variant;


    await product.save((error, product) => {
      if (error) return res.status(200).json({ status: false, error });
      else
        return res.status(200).json({
          status: true,
          message: "User Add Successfully",
          product,
        });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error });
  }
};

exports.update = async (req, res, next) => {
  try {
    if (req.params.product_id) {
      const isExist = await Product.exists({ _id: req.params.product_id });
      if (!isExist)
        return res.status(422).json({
          status: false,
          message: "Oops ! Product does not Exist",
        });
    }

    const own = {
      gujrati_name: req.body.gujrati_name,
      english_name: req.body.english_name,
      price: req.body.price,
      description: req.body.description,
      iswishlist: req.body.iswishlist,
      isdisable: req.body.isdisable,
      ispopular: req.body.ispopular,
      product_id: req.body.product_id,
      Image1: req.files.Image1[0].path,
      Image2: req.files.Image2[0].path,
      Image3: req.files.Image3[0].path,
      category: req.body.category
    };

    await Product.updateOne(
      { _id: req.params.product_id },
      { $set: own }
    ).exec(async (errUpdate, own) => {
      if (errUpdate) return res.json(errUpdate);
      else {
        const own = await Product.findOne({ _id: req.params.product_id });
        return res.status(200).json({
          status: true,
          message: "user Updated Successfully",
          own,
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error });
  }
};

exports.destroy = async (req, res, next) => {

  try {
    const own = await Product.findById(req.params.product_id);

    if (req.params.product_id) {
      if (!own)
        return res.status(422).json({
          status: false,
          message: "Oops ! product does not Exist",
        });
    }

    await own.deleteOne((err) => {
      if (err) return console.log(err);
      else
        return res.status(200).json({
          status: true,
          message: "product Deleted Successfully",
        });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error });
  }
};

