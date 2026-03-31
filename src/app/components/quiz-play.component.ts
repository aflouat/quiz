import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Question } from '../models';

@Component({
  selector: 'app-quiz-play',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="link" (click)="exit()">← Quitter</button>
    <h1>Question {{ index() + 1 }} / {{ questions.length }}</h1>

    <div *ngIf="questions.length; else loadingTpl" class="question">
      <p class="qtext">{{ current()?.text }}</p>

      <ul class="choices">
        <li *ngFor="let c of current()?.choices; let i = index">
          <label>
            <input type="radio" name="choice" [value]="i" [checked]="selectedIndex() === i" (change)="select(i)" />
            {{ c }}
          </label>
        </li>
      </ul>

      <div class="actions">
        <button (click)="prev()" [disabled]="index() === 0">Précédent</button>
        <button (click)="next()" [disabled]="index() === questions.length - 1">Suivant</button>
        <button class="primary" (click)="finish()" [disabled]="questions.length === 0">Terminer</button>
      </div>
    </div>

    <ng-template #loadingTpl>
      <p>Chargement des questions...</p>
    </ng-template>
  `,
  styles: [`
    .qtext { font-weight: 600; margin-bottom: 8px; }
    .choices { list-style: none; padding: 0; display: grid; gap: 8px; }
    .choices li { padding: 8px; border: 1px solid #e3e3e3; border-radius: 6px; background: #fff; }
    .actions { display: flex; gap: 8px; margin-top: 12px; }
    .primary { background: #1976d2; color: #fff; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; }
    .link { background: transparent; border: 0; color: #1976d2; cursor: pointer; margin-bottom: 8px; }
  `]
})
export class QuizPlayComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  questions: Question[] = [];
  index = signal(0);
  answers: Record<string, number | null> = {};

  ngOnInit(): void {
    const quizId = this.route.snapshot.paramMap.get('id') || '';
    this.api.getQuestions(quizId).subscribe({
      next: (data) => { this.questions = data; },
      error: () => {}
    });
  }

  current() {
    return this.questions[this.index()] ?? null;
  }

  selectedIndex() {
    const q = this.current();
    return q ? this.answers[q.id] ?? null : null;
  }

  select(i: number) {
    const q = this.current();
    if (q) this.answers[q.id] = i;
  }

  next() {
    if (this.index() < this.questions.length - 1) this.index.set(this.index() + 1);
  }

  prev() {
    if (this.index() > 0) this.index.set(this.index() - 1);
  }

  finish() {
    const summary = this.questions.map(q => ({
      questionId: q.id,
      text: q.text,
      choices: q.choices,
      selectedIndex: this.answers[q.id] ?? null,
      correctIndex: q.correctIndex
    }));
    const score = summary.reduce((acc, s) => acc + ((s.selectedIndex === s.correctIndex) ? 1 : 0), 0);
    this.router.navigate(['/results'], { state: { summary, score, total: this.questions.length } });
  }

  exit() {
    this.router.navigate(['/']);
  }
}
