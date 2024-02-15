import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Analyse } from './analyse';

@Injectable({
  providedIn: 'root'
})
export class AnalyseService {
  private apiUrl = 'http://localhost:8080/api/analyses';

  constructor(private http: HttpClient) { }

  getAnalyses(): Observable<Analyse[]> {
    return this.http.get<Analyse[]>(this.apiUrl);
  }

  getAnalyse(id: number): Observable<Analyse> {
    return this.http.get<Analyse>(`${this.apiUrl}/${id}`);
  }

  addAnalyse(analyse: {} | undefined): Observable<Analyse> {
    return this.http.post<Analyse>(this.apiUrl, analyse);
  }

  updateAnalyse(analyse: Analyse): Observable<Analyse> {
    return this.http.put<Analyse>(`${this.apiUrl}/${analyse.analyseId}`, analyse);
  }

  deleteAnalyse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

export class AnalyseServiceService {
}
