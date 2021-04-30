const PaymetSummery = require("./paymet_summery.model")
const User = require("../user/user.model")
const Product = require("../product/product.model")
const Wishlist =require("../whiteList/wishlist.model")
const Address =require("../address/address.model")

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
        const wishlistofuser = await Wishlist
          .find({ wishlistid_user: req.params.user_id })
          .populate('wishlistid_user wishlistid_product', 'name gujrati_name' )
          .sort({ createdAt: -1 });
          const userAddress = await Address.find({ user: req.params.user_id }).sort({ createdAt: -1 });
          const data = []
          const list_ = {
            wish: wishlistofuser,
            add: userAddress,
          }
          data.push(list_)
          console.log(data)
          if (!wishlistofuser)
          return res
            .status(200)
            .send({ status: false, error: "oops ! Something went wrong" });
        return res.status(200).json({ status: true, message: "success", data });
      }

    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error });
  }
};


// exports.update = async (req, res, next) => {

//   try {
//     if (req.params.PaymetModel_id) {
//       const isExist = await PaymetModel.exists({ _id: req.params.PaymetModel_id });
//       if (!isExist)
//         return res.status(422).json({
//           status: false,
//           message: "Oops ! user does not Exist",
//         });
//     }

//     const own = {
//       PaymetModelid_product: req.body.PaymetModelid_product,
//       PaymetModelid_user: req.body.PaymetModelid_user
//     };

//     await PaymetModel.updateOne(
//       { _id: req.params.PaymetModel_id },
//       { $set: own }
//     ).exec(async (errUpdate, own) => {
//       if (errUpdate) return res.json(errUpdate);
//       else {
//         const own = await PaymetModel.findOne({ _id: req.params.PaymetModel_id });
//         return res.status(200).json({
//           status: true,
//           message: "PaymetModel Updated Successfully",
//           own,
//         });
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ status: false, error });
//   }
// };
// exports.destroy = async (req, res, next) => {

//   try {
//     const own = await PaymetModel.findById(req.params.PaymetModel_id);

//     if (req.params.PaymetModel_id) {
//       if (!own)
//         return res.status(422).json({
//           status: false,
//           message: "Oops ! user does not Exist",
//         });
//     }
//     await own.deleteOne((err) => {
//       if (err) return console.log(err);
//       else
//         return res.status(200).json({
//           status: true,
//           message: "PaymetModel Deleted Successfully",
//         });
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ status: false, error });
//   }
// };

