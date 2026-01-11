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
        /** On doit d'abord vérifier que l'id n'est pas = 0 */
        let idMax;
        if(categories.length != 0) {
            /** Donc ici, on doit trouve id(maximum) dans notre fausse DB */
            idMax = Math.max( ...categories.map(category => category.id)); // Voir exemple plus bas !!!
        } else {
            /** Si taille du taille du tableau = 0 */
            /** Cela permet d'éviter que si 0 tâche, id = null */
            idMax = 0;
        }

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
        /** Pas find ==> car attend juste une réponse : OUI OU NON !!!, pas de tableau etc */
        /** Retourne un booléen avec 'true' ou 'false' */
        return categories.some(category => category.name === name);
    },

    update: (id, category) => {
        /** On va trouver la catégorie dont l'id correspond à l'id que l'on aura reçu en paramètre */
        const categoryToUpdate = category.find(category => category.id === id);

        /** On fait les modifications à la main */
        /** On modifie très rarement l'id */
        categoryToUpdate.name = category.name;
        categoryToUpdate.icon = category.icon;

        return categoryToUpdate;
    }, 

    delete: (id) => {
        /** Chercher l'index de l'élément à supprimer */
        const index = categories.findIndex(category => category.id === id);

        /** 
         * Pour la suppression, on renvoie pas l'élément qui vient d'être supprimé
         * Donc si le findIndex(nous renvoie '-1' ==> c'est que l'élément '6', n'existe pas)
        */
       if(index === -1) {
        return false; // Cela indique que la suppression n'a pas eu lieu
       }

       categories.splice(index, 1);
       return true;
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