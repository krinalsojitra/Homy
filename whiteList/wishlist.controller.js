const Wishlist = require("./wishlist.model");
const fs = require("fs");
const User = require("../user/user.model");
const Product = require("../product/product.model");

exports.index = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.find().populate('user product','name gujrati_name').sort({ createdAt: -1 });
    if (!wishlist)
      return res
        .status(200)
        .send({ status: false, error: "oops ! Something went wrong" });

    return res.status(200).json({ status: true, message: "success", wishlist });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error });
  }
};

exports.wishlist = async (req, res, next) => {
  try {
    if (req.params.user_id) {
      const isExist = await User.exists({ _id: req.params.user_id });
      if (!isExist)
        return res.status(422).json({
          status: false,
          message: "Oops ! Advertisement does not Exist",
        })
        else
        {
          const user = await Wishlist.find({  user : req.params.user_id}).sort({ createdAt: -1 });
    if (!user)
      return res
        .status(200)
        .send({ status: false, error: "oops ! Something went wrong" });

    return res.status(200).json({ status: true, message: "success", user });
 
        }

    }

     } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error });
  }
};
exports.store = async (req, res, next) => {
  try {

    const isuserExist = await User.exists({ _id: req.body.user });
    if (!isuserExist) {
      return res.status(200).json({
        status: false,
        message: "Oops ! User does not exist",
      });
    }
    const isproductExist = await Product.exists({ _id: req.body.product });
    if (!isproductExist) {
      return res.status(200).json({
        status: false,
        message: "Oops ! product does not exist",
      });
    }
    if (!req.body)
      return res
        .status(200)
        .json({ status: false, message: "Oops ! Invalid Details" });
    // if (!req.body.name)
    //   return res
    //     .status(200)
    //     .json({ status: false, message: "Oops ! name is required !" });

    // if (!req.body.email)
    //   return res
    //     .status(200)
    //     .json({ status: false, message: "Oops ! email is required !" });
    const wishlist = new Wishlist();
    wishlist.user = req.body.user;
    wishlist.product = req.body.product;
    wishlist.price = req.body.price;
    wishlist.description = req.body.description;
    wishlist.category =req.body.category;
    wishlist.isdisable =req.body.isdisable;
    wishlist.ispopular =req.body.ispopular;

    await wishlist.save((error, wishlist) => {
      if (error) return res.status(200).json({ status: false, error });
      else
        return res.status(200).json({
          status: true,
          message: "wishlist Add Successfully",
          wishlist,
        });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error });
  }
};