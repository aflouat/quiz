import { Routes } from '@angular/router';
import { SubjectListComponent } from './components/subject-list.component';
import { QuizListComponent } from './components/quiz-list.component';
import { QuizPlayComponent } from './components/quiz-play.component';
import { ResultsComponent } from './components/results.component';

export const routes: Routes = [
  { path: '', component: SubjectListComponent },
  { path: 'subject/:id', component: QuizListComponent },
  { path: 'quiz/:id', component: QuizPlayComponent },
  { path: 'results', component: ResultsComponent },
  { path: '**', redirectTo: '' }
];
