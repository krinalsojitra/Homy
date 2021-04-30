const Wishlist = require("./wishlist.model")
const User = require("../user/user.model")
const Product = require("../product/product.model")

exports.index = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.find().sort({ createdAt: -1 });
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
exports.payment_summary = async (req, res, next) => {
  try {
    if (req.params.user_id) {
      const isExist = await User.exists({ _id: req.params.user_id });
      if (!isExist)
        return res.status(422).json({
          status: false,
          message: "Oops ! user does not Exist",
        })
      else {
        const user = await Wishlist
          .find({ wishlistid_user: req.params.user_id })
          .populate('wishlistid_user wishlistid_product', 'name gujrati_name' )
          .sort({ createdAt: -1 });
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
exports.wishlist = async (req, res, next) => {
  try {
    if (req.params.user_id) {
      const isExist = await User.exists({ _id: req.params.user_id });
      if (!isExist)
        return res.status(422).json({
          status: false,
          message: "Oops ! user does not Exist",
        })
      else {
        const user = await Wishlist.find({ wishlistid_user: req.params.user_id }).sort({ createdAt: -1 });
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

    const wishlist = new Wishlist();
    wishlist.wishlistid_user = req.body.wishlistid_user;
    wishlist.wishlistid_product = req.body.wishlistid_product;

    const Allsavedwish = await Wishlist.find({ wishlistid_user: req.body.wishlistid_user, wishlistid_product: req.body.wishlistid_product })

    console.log(Allsavedwish.length)

    if (Allsavedwish.length == 0) {
      await wishlist.save((error, wishlist) => {
        if (error) return res.status(200).json({ status: false, error });
        else
          return res.status(200).json({
            status: true,
            message: "wishlist Add Successfully",
            wishlist,
          });
      });
    }
    else {
      return res.status(422).json({
        status: false,
        message: "Oops ! Already Exist",
      });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error });
  }
};
exports.update = async (req, res, next) => {

  try {
    if (req.params.wishlist_id) {
      const isExist = await Wishlist.exists({ _id: req.params.wishlist_id });
      if (!isExist)
        return res.status(422).json({
          status: false,
          message: "Oops ! user does not Exist",
        });
    }

    const own = {
      wishlistid_product: req.body.wishlistid_product,
      wishlistid_user: req.body.wishlistid_user
    };

    await Wishlist.updateOne(
      { _id: req.params.wishlist_id },
      { $set: own }
    ).exec(async (errUpdate, own) => {
      if (errUpdate) return res.json(errUpdate);
      else {
        const own = await Wishlist.findOne({ _id: req.params.wishlist_id });
        return res.status(200).json({
          status: true,
          message: "wishlist Updated Successfully",
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
    const own = await Wishlist.findById(req.params.wishlist_id);

    if (req.params.wishlist_id) {
      if (!own)
        return res.status(422).json({
          status: false,
          message: "Oops ! user does not Exist",
        });
    }
    await own.deleteOne((err) => {
      if (err) return console.log(err);
      else
        return res.status(200).json({
          status: true,
          message: "wishlist Deleted Successfully",
        });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error });
  }
};

