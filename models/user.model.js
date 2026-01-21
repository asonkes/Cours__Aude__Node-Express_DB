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
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      select: false,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      required: true,
      enum: ["User", "Admin"], // enum permet de donner une liste de châines autorisées, si on encode autre chos e-> erreur
      default:
        "User" /** default permet de mettre une liste de chaînes autorisées, si on encode autre chose -> erreur */,
      select: false,
    },
  },
  {
    collection: "User",
    timestamps: true,
  },
);

const User = model("User", userSchema);

module.exports = User;
