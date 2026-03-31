import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question, Quiz, Subject } from '../models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private base = 'http://localhost:3100/api';

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.base}/subjects`);
  }

  getQuizzesBySubject(subjectId: string): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.base}/quizzes`, { params: { subjectId } });
  }

  getQuestions(quizId: string): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.base}/questions`, { params: { quizId } });
  }
}
