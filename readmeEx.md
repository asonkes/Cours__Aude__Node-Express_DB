Pour les tâches :

Créer un nouveau service dans le dossier mongo avec toutes les mêmes méthodes que dans le fakeTaskService.

1. Permettre l’ajout d’une nouvelle tâche (insert)

- Créer et compléter la méthode create du service pour créer et sauvegarder la tâche
- Modifier votre taskController pour appeler la création du nouveau service et plus de l’ancien
  (⚠️ Il faudra sans doute modifier la structure de votre body dans Insomnia puisque vous devez maintenant respecter le model)

Rajouter au moins 2 nouvelles tâches.

2. Permettre la récupération de toutes les tâches (getAll)  
   (Vous afficherez les tâches telles qu’elles sont en db, ensemble, à la correction, on verra comment récupérer le nom et l’icone de la catégorie et le prénom de l’utilisateur)

3. Permettre la récupération d’une tâche en particulier via son (getById)
   (Vous afficherez la tâche telle qu’elle est en db, ensemble, à la correction, on verra comment récupérer le nom et l’icone de la catégorie et le prénom de l’utilisateur)

4. Challenge : Permettre la récupération des tâches données et reçues d’un utilisateur via son id.

- Vous devrez refaire les méthodes dans le service mais en appelant la db
- Vous devrez modifier dans la route le paramètre pour que ce ne soit plus le nom du user mais son id.
- Vous devrez modifier votre contrôleur pour récupérer le bon paramètre et appeler les nouvelles méthodes faites dans le service.

5. Bonus easy pour vous faire chercher dans la doc

Essayez de mettre en place la suppression d’une tâche via son id. La méthode à appeler se trouve dans la liste suivante : Doc des interactions possibles sur un Model
