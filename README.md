# Quiz (MVP Brevet)

Application Angular minimale pour un quiz ludique (niveau brevet) + environnement Mockoon pour simuler le backend.

## Démarrage rapide

1) Backend mock (Mockoon)
- Installer Mockoon: https://mockoon.com/
- Importer le fichier `mockoon-env.json` (File → Import → From file)
- Démarrer l'environnement "Quiz API (Brevet)" sur le port 3100
- Vérifier: http://localhost:3100/api/subjects renvoie la liste

2) Frontend Angular
- Installer les dépendances: `npm install`
- Lancer le serveur de dev: `npm start` (ou `ng serve`)
- Ouvrir: http://localhost:4200/

## Fonctionnalités MVP
- Écran matières: liste des matières depuis GET /api/subjects
- Écran quiz par matière: GET /api/quizzes?subjectId=...
- Écran jeu: GET /api/questions?quizId=..., navigation entre questions, sélection réponse
- Écran résultats: calcul du score côté front et récapitulatif

## API consommée (Mockoon)
- GET /api/subjects → liste des matières
- GET /api/quizzes?subjectId=maths|hgeo → quiz filtrés
- GET /api/questions?quizId=m1|h1 → questions du quiz

## Structure de code
- src/app/services/api.service.ts → appels HTTP
- src/app/components/* → composants standalone
- src/app/app.routes.ts → routing

## Personnalisation
- Ajoutez des matières/quiz/questions en éditant `mockoon-env.json`.
- Le base URL de l'API est défini dans `ApiService`.
