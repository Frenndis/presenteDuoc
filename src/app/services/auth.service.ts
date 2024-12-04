import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthGuard } from '../auth.guard';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://k1cg7j8b-5000.brs.devtunnels.ms/login'; // URL de la API Flask
  private currentUser: any = null;  // Propiedad para almacenar al usuario autenticado

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión y guardar al usuario actual
  login(user: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { user, password };
    
    return new Observable(observer => {
      this.http.post<any>(this.apiUrl, body, { headers }).subscribe(
        (response) => {
          this.currentUser = response;
            // Guardar la respuesta del usuario autenticado
          observer.next(response);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  // Método para obtener al usuario actualmente autenticado
  getCurrentUser() {
    return this.currentUser;
  }

  // Método para cerrar sesión y borrar al usuario actual
  logout() {
    this.currentUser = null;
  }
}
