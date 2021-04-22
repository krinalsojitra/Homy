const Address = require("./address.model");
const User = require("../user/user.model")

exports.index = async (req, res, next) => {
  try {
    const address = await Address.find().sort({ createdAt: -1 });
    if (!address)
      return res
        .status(200)
        .send({ status: false, error: "oops ! Something went wrong" });

    return res.status(200).json({ status: true, message: "success", address });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error });
  }
};
exports.useraddress = async (req, res, next) => {
  try {
    if (req.params.address_id) {
      const isExist = await User.exists({ _id: req.params.address_id });
      if (!isExist)
        return res.status(422).json({
          status: false,
          message: "Oops ! Advertisement does not Exist",
        })
        else
        {
          const user = await Address.find({  user : req.params.address_id}).sort({ createdAt: -1 });
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

    if (!req.body.street_add_1)
      return res
        .status(200)
        .json({ status: false, message: "Oops ! street_add_1 is required !" });

    if (!req.body.user)
      return res
        .status(200)
        .json({ status: false, message: "Oops ! user is required !" });
    const address = new Address();
    address.user          = req.body.user;
    address.pincode       = req.body.pincode;
    address.street_add_1  = req.body.street_add_1;
    address.street_add_2  = req.body.street_add_2;
    address.city          = req.body.city;
    address.country       = req.body.country;

    await address.save((error, address) => {
      if (error) return res.status(200).json({ status: false, error });
      else
        return res.status(200).json({
          status: true,
          message: "address Add Successfully",
          address,
        });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error });
  }
};


exports.update = async (req, res, next) => {

  try {
    if (req.params.address_id) {
      const isExist = await Address.exists({ _id: req.params.address_id });
      if (!isExist)
        return res.status(422).json({
          status: false,
          message: "Oops ! address does not Exist",
        });
    }

    const own = {
      user             :req.body.user,
      pincode          :req.body.pincode,
      street_add_1     :req.body.street_add_1,
      street_add_2     :req.body.street_add_2,
      city             :req.body.city,
      country          :req.body.country
    };

    await Address.updateOne(
      { _id: req.params.address_id },
      { $set: own }
    ).exec(async (errUpdate, own) => {
      if (errUpdate) return res.json(errUpdate);
      else {
        const own = await Address.findOne({ _id: req.params.address_id });
        return res.status(200).json({
          status: true,
          message: "address Updated Successfully",
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
    const own = await Address.findById(req.params.address_id);

    if (req.params.address_id) {
      if (!own)
        return res.status(422).json({
          status: false,
          message: "Oops ! address does not Exist",
        });
    }

    await own.deleteOne((err) => {
      if (err) return console.log(err);
      else
        return res.status(200).json({
          status: true,
          message: "address Deleted Successfully",
        });
    });
  }catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error });
  }
};