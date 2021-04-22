const User = require("./user.model");
const Whishlist = require("../whiteList/wishlist.model");

const fs = require("fs");

exports.index = async (req, res, next) => {
  try {
    const user = await User.find().sort({ createdAt: -1 });
    if (!user)
      return res
        .status(200)
        .send({ status: false, error: "oops ! Something went wrong" });

    return res.status(200).json({ status: true, message: "success", user });
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
    if (!req.file)
      return res
        .status(200)
        .json({ status: false, message: "Oops ! Image is Required" });

    if (!req.body.name)
      return res
        .status(200)
        .json({ status: false, message: "Oops ! name is required !" });

    if (!req.body.email)
      return res
        .status(200)
        .json({ status: false, message: "Oops ! email is required !" });
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.phone_number = req.body.phone_number;
    user.fcm_token =req.body.fcm_token;
    user.islogout =req.body.islogout;
    user.isnew =req.body.isnew;
    user.Image = req.file.path;

    await user.save((error, user) => {
      if (error) return res.status(200).json({ status: false, error });
      else
        return res.status(200).json({
          status: true,
          message: "User Add Successfully",
          user,
        });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error });
  }
};


exports.update = async (req, res, next) => {

  try {
    if (req.params.user_id) {
      const isExist = await User.exists({ _id: req.params.user_id });
      if (!isExist)
        return res.status(422).json({
          status: false,
          message: "Oops ! Advertisement does not Exist",
        });
    }

    const own = {
      name: req.body.name,
      email: req.body.email,
      islogout: req.body.islogout,
      isnew: req.body.isnew,
      phone_number: req.body.phone_number,
      fcm_token: req.body.fcm_token,
      Image :req.file.path
    };

    await User.updateOne(
      { _id: req.params.user_id },
      { $set: own }
    ).exec(async (errUpdate, own) => {
      if (errUpdate) return res.json(errUpdate);
      else {
        const own = await User.findOne({ _id: req.params.user_id });
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
    const own = await User.findById(req.params.user_id);

    if (req.params.user_id) {
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