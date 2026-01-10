/******************************************************/
/*** Ici c'est le service des catégories (categories) */
/******************************************************/
const { categories } = require('./fakeDb');

const fakeCategoryService = {

    /** On va récupérer toutes les catégories */
    find: () => {
        return categories;
    },

    /** On la catégorie dont l'id correspond à l'id dans l'url */
    findById: (id) => {
        /** On va trouver la catégorie qui correspond à l'id de l'url */
        return categories.find(category => category.id === id);
    },

    /** On va ajouter une catégorie */
    /** On raisonne ==> il faut ajouter un élément ==> JS = PUSH() */
    /** 'category' en paramètre ==> car on va devoir ajouter les données d'une nouvelle catégorie */
    create: (category) => {
        /** Donc ici, on doit trouve id(maximum) dans notre fausse DB */
        const idMax = Math.max( ...categories.map(category => category.id)); // Voir exemple plus bas !!!
        /** Et lui rajouter 1 à cet idMax */
        const newId = idMax + 1;

        /** Avant de 'push' */
        /** Il faut rajouter un 'id' à ma catégorie */
        category.id = newId;
        /** Et puis on push ma catégorie */
        categories.push(category);

        /** Et on return la nouvelle catégorie avec son id */
        return category;
    },

    /************************************************************************/
    /** Fonction qui permet de savoir si le nom de la catégorie existe déjà */
    /************************************************************************/
    nameAlreadyExists: (name)  => {
        /** js ==> some */
        /** Permet de savoir si au moins un de mes élément contient 'cet élément' ==> name */
        /** Retourne un booléen avec 'true' ou 'false' */
        return categories.some(category => category.name === name);
    },

    update: () => {

    }, 

    delete: () => {

    }
}

module.exports = fakeCategoryService;

/**********************************/
/** Explication create avec map : */
/**********************************/

// categories.map(category => category.id) // categories = tableau d'objets
/**
[
  { id: 1, name: "A" },
  { id: 4, name: "B" },
  { id: 7, name: "C" }
]
  ==> map va transformer chaque élément du tableau
  ==> pour chaque 'category' retourne 'category.id'
  ==> résultat : [1, 4, 7]

  !!! et le 'SPREAD OPERATOR' transforme [1, 4, 7] en (1, 4, 7)
  ==> donc le math.max de : (1,4,7) ==> réponse '7'
 */