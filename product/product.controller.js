const Product = require("./product.model");
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
exports.store = async (req, res, next) => {
  try {
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
        .json({ status: false, message: "Oops ! Gujrati name is required !" });

    if (!req.body.english_name)
      return res
        .status(200)
        .json({ status: false, message: "Oops ! English name is required !" });
  
    const product = new Product();

    product.gujrati_name    = req.body.gujrati_name;
    product.english_name    = req.body.english_name;
    product.price           = req.body.price;
    product.description     = req.body.description;
    product.category        = req.body.category;
    product.iswishlist      = req.body.iswishlist;
    product.isdisable       = req.body.isdisable;
    product.ispopular       = req.body.ispopular;
    product.Image1          = req.files.Image1[0].path;
    product.Image2          = req.files.Image2[0].path;
    product.Image3          = req.files.Image3[0].path;

    await product.save((error, product) => {
      if (error) return res.status(200).json({ status: false, error });
      else
        return res.status(200).json({
          status: true,
          message: "product Add Successfully",
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
          message: "Oops ! Advertisement does not Exist",
        });
    }
    
    const own = {
        gujrati_name    : req.body.gujrati_name,
        english_name    : req.body.english_name,
        price           : req.body.price,
        description     : req.body.description,
        category        : req.body.category,
        iswishlist       : req.body.iswishlist,
        isdisable       : req.body.isdisable,
        ispopular       : req.body.ispopular,
        Image1          : req.files.Image1[0].path,
        Image2          : req.files.Image2[0].path,
        Image3          : req.files.Image3[0].path,
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
          message: "Advertisement Updated Successfully",
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
          message: "Oops ! Advertisement does not Exist",
        });
    }

    await own.deleteOne((err) => {
      if (err) return console.log(err);
      else
        return res.status(200).json({
          status: true,
          message: "Advertisement Deleted Successfully",
        });
    });
  }catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error });
  }
};

