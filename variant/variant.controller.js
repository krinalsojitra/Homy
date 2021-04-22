const Variant = require("./variant.model");
const Product = require("../product/product.model")

exports.index = async (req, res, next) => {
  try {
    const variant = await Variant.find().sort({ createdAt: -1 });
    if (!variant)
      return res
        .status(200)
        .send({ status: false, error: "oops ! Something went wrong" });

    return res.status(200).json({ status: true, message: "success", variant });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error });
  }
};
exports.productvariant = async (req, res, next) => {
  try {
    if (req.params.variant_id) {
      const isExist = await Product.exists({ _id: req.params.variant_id });
      if (!isExist)
        return res.status(422).json({
          status: false,
          message: "Oops ! Advertisement does not Exist",
        })
        else
        {
          const user = await Variant.find({  product : req.params.variant_id}).sort({ createdAt: -1 });
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
    if (!req.body)
      return res
        .status(200)
        .json({ status: false, message: "Oops ! Invalid Details" });

    if (!req.body.type)
      return res
        .status(200)
        .json({ status: false, message: "Oops ! name is required !" });

    if (!req.body.price)
      return res
        .status(200)
        .json({ status: false, message: "Oops ! email is required !" });
    const variant = new Variant();
    variant.price = req.body.price;
    variant.type = req.body.type;
    variant.product =req.body.product;

    await variant.save((error, variant) => {
      if (error) return res.status(200).json({ status: false, error });
      else
        return res.status(200).json({
          status: true,
          message: "variant Add Successfully",
          variant,
        });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error });
  }
};


exports.update = async (req, res, next) => {

  try {
    if (req.params.variant_id) {
      const isExist = await Variant.exists({ _id: req.params.variant_id });
      if (!isExist)
        return res.status(422).json({
          status: false,
          message: "Oops ! Variant does not Exist",
        });
    }

    const own = {
      type: req.body.type,
      price: req.body.price,
      product:req.body.product,
    };

    await Variant.updateOne(
      { _id: req.params.variant_id },
      { $set: own }
    ).exec(async (errUpdate, own) => {
      if (errUpdate) return res.json(errUpdate);
      else {
        const own = await Variant.findOne({ _id: req.params.variant_id });
        return res.status(200).json({
          status: true,
          message: "Variant Updated Successfully",
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
    const own = await Variant.findById(req.params.variant_id);

    if (req.params.variant_id) {
      if (!own)
        return res.status(422).json({
          status: false,
          message: "Oops ! Variant does not Exist",
        });
    }

    await own.deleteOne((err) => {
      if (err) return console.log(err);
      else
        return res.status(200).json({
          status: true,
          message: "Variant Deleted Successfully",
        });
    });
  }catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error });
  }
};