import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AttendanceService } from '../services/attendance.service';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-home-profesor',
  templateUrl: './home-profesor.page.html',
  styleUrls: ['./home-profesor.page.scss'],
})
export class HomeProfesorPage implements OnInit {
  nombre: string = ''; // Nombre del profesor
  profesorId: number = 1; // Este valor debería ser dinámico dependiendo del inicio de sesión
  cursos: any[] = []; // Declaración de la propiedad cursos

  constructor(private route: ActivatedRoute, private router: Router, private attendanceService: AttendanceService) {}

  ngOnInit() {
    // Obtener el nombre del profesor y el ID desde los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      if (params['nombre']) {
        this.nombre = params['nombre'];
      }
      if (params['id']) {
        this.profesorId = params['id'];
      }
    });
  
    // Cargar los cursos asociados al profesor
    this.loadCursos();
  }
  

  loadCursos() {
    this.attendanceService.getCursos(this.profesorId).subscribe(
      (data: any) => {
        console.log('Cursos recibidos:', data); // Agrega este log para verificar los cursos recibidos.
        this.cursos = data;
      },
      (error) => {
        console.error('Error al cargar los cursos:', error);
      }
    );
  }
  

  seleccionarCurso(cursoId: number) {
    // Redirige a la página de listado de estudiantes con el curso seleccionado
    this.router.navigate(['/listado-presentes'], { queryParams: { cursoId: cursoId } });
  }
}
