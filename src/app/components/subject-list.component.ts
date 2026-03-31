import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Subject } from '../models';

@Component({
  selector: 'app-subject-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Choisissez une matière</h1>
    <div class="grid">
      <button *ngFor="let s of subjects" class="card" (click)="openSubject(s)">
        <span class="icon" aria-hidden="true">📚</span>
        <span>{{ s.name }}</span>
      </button>
    </div>
    <p *ngIf="loading">Chargement...</p>
    <p *ngIf="!loading && subjects.length === 0">Aucune matière disponible.</p>
  `,
  styles: [`
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; }
    .card { padding: 16px; background: #fff; border: 1px solid #e3e3e3; border-radius: 8px; text-align: left; cursor: pointer; display: flex; align-items: center; gap: 12px; }
    .card:focus { outline: 2px solid #1976d2; }
    h1 { margin-bottom: 16px; }
  `]
})
export class SubjectListComponent implements OnInit {
  private api = inject(ApiService);
  private router = inject(Router);
  subjects: Subject[] = [];
  loading = false;

  ngOnInit(): void {
    this.loading = true;
    this.api.getSubjects().subscribe({
      next: (data) => { this.subjects = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  openSubject(s: Subject) {
    this.router.navigate(['/subject', s.id]);
  }
}
