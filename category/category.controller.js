const Category = require("./category.model");

exports.index = async (req, res, next) => {
  try {
    const category = await Category.find().sort({ createdAt: -1 });
    if (!category)
      return res
        .status(200)
        .send({ status: false, error: "oops ! Something went wrong" });

    return res.status(200).json({ status: true, message: "success", category });
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

    if (!req.body.name)
      return res
        .status(200)
        .json({ status: false, message: "Oops ! street_add_1 is required !" });

    const category = new Category();
    category.name  = req.body.name;
    
    await category.save((error, category) => {
      if (error) return res.status(200).json({ status: false, error });
      else
        return res.status(200).json({
          status: true,
          message: "category Add Successfully",
          category,
        });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error });
  }
};


exports.update = async (req, res, next) => {

  try {
    if (req.params.category_id) {
      const isExist = await Category.exists({ _id: req.params.category_id });
      if (!isExist)
        return res.status(422).json({
          status: false,
          message: "Oops ! category does not Exist",
        });
    }

    const own = {
        name:req.body.name
     };

    await Category.updateOne(
      { _id: req.params.category_id },
      { $set: own }
    ).exec(async (errUpdate, own) => {
      if (errUpdate) return res.json(errUpdate);
      else {
        const own = await Category.findOne({ _id: req.params.category_id });
        return res.status(200).json({
          status: true,
          message: "category Updated Successfully",
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
    const own = await Category.findById(req.params.category_id);

    if (req.params.category_id) {
      if (!own)
        return res.status(422).json({
          status: false,
          message: "Oops ! category does not Exist",
        });
    }

    await own.deleteOne((err) => {
      if (err) return console.log(err);
      else
        return res.status(200).json({
          status: true,
          message: "category Deleted Successfully",
        });
    });
  }catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error });
  }
};