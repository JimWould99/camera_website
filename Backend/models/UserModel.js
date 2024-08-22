const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (email, name, password) {
  if (!email || !name || !password) {
    throw Error("Fill in all inputs");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password must be stronger");
  }

  if (!validator.isEmail(email)) {
    throw Error("invalid email");
  }

  /*if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }*/

  const checkEmail = await this.findOne({ email });

  if (checkEmail) {
    throw Error("Email taken");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, name, password: hash });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Fill in all inputs");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("incorrect username or password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
