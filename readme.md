    1) CategoryService

Créer un service pour gérer les catégories (dans fake). En modifiant ce service et le controller category, faites en sorte qu’on puisse :

- récupérer toutes les catégories
- récupérer une catégorie en particulier grâce à son id
- ajouter une nouvelle catégorie

(Bonus pour l’ajout de la catégorie : Mettre en place une fonction dans le service qui vérifie si la catégorie n’existe pas déjà. L’utiliser dans le contrôleur pour savoir si on peut ajouter la catégorie. Si une catégorie de ce nom existe déjà, envoyer un code 40? trouvez le bon code pour une ressource qui existe déjà dans la base de donnée https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP#4xx_-_Erreur_du_client_HTTP )

    2) Challenge

Pour les tâches :

- finir la fonctionnalité du getByUser. Il vous faudra, dans le service, une fonction qui recherche toutes les tâches de l’utilisateur.
- finir la fonctionnalité updateStatus. Il vous faudra, dans le service, une fonction qui prend en paramètre l’id et le nouveau statut, recherche la tâche correspondante et, si la tâche a été trouvée, modifie son statut. Votre contrôleur devra renvoyer 404 si la tâche que vous essayez de modifier n’existe pas. Sinon, renvoie la tâche avec les nouvelles modifications.
- finir la fonctionnalité update. Le principe est le même que le updateStatus mais vous devez modifier TOUT l’objet
- finir la fonctionnalité delete. Faire une fonction dans le service qui reçoit l’id de la tâche à supprimer. Dans un premier temps, vérifier si la tâche existe, si pas, renvoyez false. Si elle existe, la supprimer du tableau (tips : filter ) et renvoyer true. Votre controleur, quand il utilisera la méthode du service, obtiendra un booléen pour savoir si oui ou non, la tâche a été supprimée.

Vous aurez besoin de

.filter()  
.some()
.find()

Pas obligatoire mais vous pourriez avoir besoin du spread operator ex : { ...nomObjet }
