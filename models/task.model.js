const { Schema, model, Types } = require("mongoose");
const category = require("./category.model");
const user = require("./user.model");

const taskSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    isDone: {
      type: Boolean,
      required: true,
      default: false,
    },
    before: {
      type: String,
      /** required : false ==> donc on le met pas */
    },
    categoryid: {
      type: Types.ObjectId, // Pour préciser que c'est un type ObjectId, on doit importer Types,
      // Qui contient toutes les types un peu spéciaux
      ref: category, // Pour créer une référence vers le model
      required: true,
    },
    fromUserId: {
      type: Types.ObjectId,
      ref: user,
      required: true,
    },
    toUserId: {
      type: Types.ObjectId,
      ref: user,
      required: true,
    },
  },
  {
    collection: "Task",
    timestamps: true,
  }
);

const task = model("Task", taskSchema);

module.exports = task;
