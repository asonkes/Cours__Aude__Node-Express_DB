const { Schema, model } = require("mongoose");

// On va créer un schéma qui va décrire à quoi ressemble une catégorie
// Schema( { description objet}, {options collection })
const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true, // Cela spécifie que le nom est obligatoire
      unique: true, // Cela spécifie que le nom est unique
      trim: true, // enlève les espaces
    },
    icon: {
      type: String,
      required: true,
      /** unique: false ==> là par défault 'false' donc doit pas être mis */
      trim: true,
    },
  },
  {
    collection: "Category", // On met le nom que l'on a mis dans la DB
    timestamps: true,
    // Pour rajouter 2 champs automatiquement
    // createdAt : date (pour savoir quand la catégorie a été créé)
    // updatedAT : date (pour savoir qd la catégorie a été modifiée pour la dernière fois)
  }
);

// On va créer un model à partir de ce schéma
// Le 1er paramètre et le nom du model, le 2eme, le schéma de ce model
const Category = model("Category", categorySchema);

// On exporte le model créé
module.exports = Category;
