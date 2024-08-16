import userModel from "../Models/userModel.js";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userController = {};

userController.userRegister = async (req, res) => {
  try {
    const { name, email, phone, dob, password } = req.body;
    const findEmail = await userModel.findOne({ email });
    if (findEmail) {
      return res.status(409).json({ message: "User already exists" });
    } else {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      if (!name || !password || !email) {
        return res
          .status(401)
          .send("Name or Email or Password fields cannot be empty");
      }
      if (!passwordRegex.test(password)) {
        return res
          .status(402)
          .send(
            "Password should be at least 6 characters long and should contain at least one number, one lowercase, and one uppercase letter"
          );
      }
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);
    }
    const newUser = new userModel({
      name,
      email,
      phone,
      dob,
      password: hashPass,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
userController.userLogin = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    const success = true;
    res.status(200).json({ success, token, user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
userController.userCart = async (req, res) => {
        try{
            const user = await userModel.findEmail({email: req.body.email});
            if(!user){
                return res.status(404).json({message: "User not found"});
            }
            const {productId, quantity} = req.body;
            const product = await productModel.findOne({productID: productId});
            if(!product){
                return res.status(404).json({message: "Product not found"});
            }
        }
        catch(error){
            res.status(500).json({message: "Internal server error"});
        }

};