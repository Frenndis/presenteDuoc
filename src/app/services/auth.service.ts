import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/login'; // URL de la API Flask

  constructor(private http: HttpClient) {}

  login(user: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { user, password };
    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}
