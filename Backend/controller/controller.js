const { usermodel } = require("../models/user");

const getallusers = async (req, res) => {
  try {
    let data = await usermodel.find();

    res.status(200).send({ status: true, message: "All Users", data: data });
  } catch (error) {}
};
const getOneusers = async (req, res) => {
  try {
    let data = await usermodel.findOne({_id:req.params.id});
  if(!data) return res.send({status:false,message:'no use found'})
    res.status(200).send({ status: true, message: "Oneusers", data: data });
  } catch (error) {}
};
const createUser = async (req, res) => {
  console.log(req.body)
  let { name, bio} = req.body;
  if (!name || !bio )
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

module.exports = { createUser, updateUser, deleteUser, getallusers,getOneusers };
