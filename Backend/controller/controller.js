const { usermodel } = require("../models/user");

const getallusers = async (req, res) => {
  try {
    let data = await usermodel.find();

    res.status(200).send({ status: true, message: "All Users", data: data });
  } catch (error) {}
};
const createUser = async (req, res) => {
  let { name, bio, dpUrl } = req.body;
  if (!name || !bio || !dpUrl)
    return res.status(400).send({ status: false, message: "Empty Fields" });
  let data = await usermodel.create({ ...req.body });
  res.status(200).send({ status: true, message: "User Created", data: data });
};
const updateUser = async (req, res) => {
  let user = await usermodel.findByIdAndUpdate(
    req.params.id,
    { $set: { ...req.body } },
    { new: true }
  );
  res.status(200).send({ status: true, message: "User Updated", data: user });
};
const deleteUser = async (req, res) => {
  let user = await usermodel.findByIdAndDelete(req.params.id);
  res.status(200).send({ status: true, message: "User Deleted", data: user });
};

module.exports = { createUser, updateUser, deleteUser, getallusers };
