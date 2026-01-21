Récupérer les utilisateurs

1.c) Rajouter une query pour pouvoir chercher un utilisateur via son prénom

Ex : L’utilisateur a envoyé “au”  
Indice :

Ressource.find( { firstname : { $regex : new RegExp(“au”) } )

1.d) Rajouter le fait de pouvoir chercher à la fois dans prénom ou dans le nom

Indice :  
Ressource.find( condition1).or(condition2)

1.e) Rajouter la sécurité : Seul un utilisateur connecté peut faire une recherche sur les autres utilisateurs

Bonus non obligatoire

2 ) Suppression d’une catégorie
Faire (ou modifier si vous l’avez déjà fait) la suppression d’une catégorie pour faire en sorte qu’on ne puisse pas supprimer une catégorie qui est actuellement associée à une tâche.

Pour se faire :

Créer dans le service une fonction isUsed(id) qui renvoie un bouléen pour savoir si la catégorie est actuellement présente sur une tâche  
Indice : sur les tâches, trouver UNE tâche dont le categoryId est égal à celui de la catégorie qu’on essaie de supprimer
