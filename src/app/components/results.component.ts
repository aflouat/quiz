import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AnswerSummary } from '../models';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Résultats</h1>
    <p class="score">Score: <strong>{{ score }}</strong> / {{ total }}</p>

    <ol class="recap">
      <li *ngFor="let s of summary">
        <p class="q">{{ s.text }}</p>
        <ul>
          <li *ngFor="let c of s.choices; let i = index" [class.correct]="i === s.correctIndex" [class.selected]="i === s.selectedIndex">
            {{ i + 1 }}. {{ c }}
          </li>
        </ul>
      </li>
    </ol>

    <div class="actions">
      <button (click)="replay()">Rejouer</button>
      <button class="primary" (click)="home()">Accueil</button>
    </div>
  `,
  styles: [`
    .score { font-size: 1.2rem; }
    .recap { display: grid; gap: 10px; }
    .q { font-weight: 600; margin: 0; }
    li.correct { color: green; }
    li.selected:not(.correct) { color: #b71c1c; }
    .actions { display: flex; gap: 8px; }
    .primary { background: #1976d2; color: #fff; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; }
  `]
})
export class ResultsComponent {
  summary: AnswerSummary[] = [];
  score = 0;
  total = 0;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { summary: AnswerSummary[]; score: number; total: number } | undefined;
    if (state) {
      this.summary = state.summary;
      this.score = state.score;
      this.total = state.total;
    }
  }

  replay() {
    // If we have at least one question, we can go back to its quiz
    this.router.navigate(['/']);
  }

  home() {
    this.router.navigate(['/']);
  }
}
