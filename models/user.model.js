const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    Email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["User", "Admin"], // enum permet de donner une liste de châines autorisées, si on encode autre chos e-> erreur
      default:
        "User" /** default permet de mettre une liste de chaînes autorisées, si on encode autre chose -> erreur */,
    },
  },
  {
    collection: "User",
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
