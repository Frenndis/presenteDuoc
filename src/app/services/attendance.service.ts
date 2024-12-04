import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private apiUrl = 'http://localhost:5000'; // Base URL de la API Flask

  constructor(private http: HttpClient) {}

  getCursos(profesorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/profesores/${profesorId}/cursos`);
  }

  getStudents(profesorId: number, cursoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/profesores/${profesorId}/cursos/${cursoId}/alumnos`);
  }

  markAsPresent(alumno_id: number, codigo: string, seccion: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registrar_asistencia`, { alumno_id, codigo, seccion });
  }
}
