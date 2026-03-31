import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Quiz } from '../models';

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="link" (click)="goHome()">← Retour</button>
    <h1>Quiz disponibles</h1>
    <div class="grid">
      <div *ngFor="let q of quizzes" class="card">
        <h3>{{ q.title }}</h3>
        <p class="muted">{{ q.description }}</p>
        <p class="meta">⏱️ {{ q.durationSec || 0 }}s • {{ q.questionCount }} questions</p>
        <button class="primary" (click)="start(q)">Commencer</button>
      </div>
    </div>
    <p *ngIf="loading">Chargement...</p>
    <p *ngIf="!loading && quizzes.length === 0">Aucun quiz pour cette matière.</p>
  `,
  styles: [`
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px; }
    .card { padding: 16px; border: 1px solid #e3e3e3; border-radius: 8px; background: #fff; display: flex; flex-direction: column; gap: 8px; }
    .primary { align-self: start; padding: 8px 12px; background: #1976d2; color: white; border-radius: 6px; border: 0; cursor: pointer; }
    .link { background: transparent; border: 0; color: #1976d2; cursor: pointer; margin-bottom: 8px; }
    .muted { color: #666; margin: 0; }
    .meta { color: #444; font-size: 0.9rem; }
  `]
})
export class QuizListComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  quizzes: Quiz[] = [];
  loading = false;
  subjectId = '';

  ngOnInit(): void {
    this.subjectId = this.route.snapshot.paramMap.get('id') || '';
    this.loading = true;
    this.api.getQuizzesBySubject(this.subjectId).subscribe({
      next: (data) => { this.quizzes = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  start(q: Quiz) {
    this.router.navigate(['/quiz', q.id]);
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
