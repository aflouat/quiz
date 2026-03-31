# Instructions du Projet : Quiz Brevet Ludique (Angular 21)

## Architecture & Frameworks
- **Framework:** Angular 21 (Full Signals, Zoneless)
- **Style:** Tailwind CSS 4.0+ (Utiliser les nouvelles directives CSS)
- **State Management:** Angular Signals (pas de RxJS pour l'état simple)
- **API:** Mockoon (Endpoint: `http://localhost:3000`)
- **Animations:** Angular Animations & Canvas-confetti

## Standards de Code (Angular 21)
- **Composants:** Utiliser la syntaxe `@Component` avec `standalone: true`.
- **Flow Control:** Utiliser exclusivement la nouvelle syntaxe `@if`, `@for`, `@switch`.
- **Récupération de données:** Utiliser la fonction `resource()` ou `rxResource()` (nouveauté Angular 19+) pour le fetch des données JSON.
- **Inputs/Outputs:** Utiliser `input()`, `output()` et `model()` à la place des anciens décorateurs.
- **Injection:** Privilégier la fonction `inject()` plutôt que l'injection par constructeur.

## Structure des Données (JSON Mockoon)
L'API doit retourner une interface `QuizData` :
```typescript
interface Question {
  id: string;
  type: 'text' | 'image' | 'audio';
  question: string;
  imageUrl?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}
