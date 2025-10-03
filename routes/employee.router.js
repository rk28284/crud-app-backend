const express = require("express");
const employeeModel = require("../model/employee.model");
const employeeRouter = express.Router();


employeeRouter.post("/employee/add", async (req, res) => {
  let payload = req.body;
  try {
    const reqData = new employeeModel(payload);
    await reqData.save();
    res.status(200).send({ msg: "Employee data added" });
  } catch (error) {
    res.status(400).send({ msg: "Something Went Wrong", error: error });
  }
});

employeeRouter.get("/employee", async (req, res) => {
  try {
    const reqData = await employeeModel.find();
  res.status(200).send(reqData)
  } catch (error) {
    res.status(400).send({ msg: "something went wrong" });
  }
});


employeeRouter.get("/employee/:id", async (req, res) => {
  let ID = req.params.id;
  try {
    const reqData = await employeeModel.findById({ _id: ID });
    res.status(200).send({ msg: `Employee data with ID-${ID}`, reqData });
  } catch (error) {
    res.status(400).send({ msg: "Something went Wrong" });
  }
});

employeeRouter.delete("/employee/delete/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    const reqData = await employeeModel.findByIdAndDelete({ _id: ID });

    res.status(200).send({ msg: `Employee with id-${ID} deleted` });
  } catch (error) {
    res.status(400).send({ msg: "Something went wrong" });
  }
});


employeeRouter.patch("/employee/update/:id", async (req, res) => {
  const ID = req.params.id;
  const reqdata = req.body;
  const options = { new: true };
  try {
    const reqData = await employeeModel.findByIdAndUpdate(ID, reqdata, options);
    res
      .status(200)
      .send({ msg: "Employee has been updated", "updated data": reqdata });
  } catch (error) {
    res.status(400).send({ msg: "Something went wrong" });
    console.log(error);
  }
});

module.exports = employeeRouter;

