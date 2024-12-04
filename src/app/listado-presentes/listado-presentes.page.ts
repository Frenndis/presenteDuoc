import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../services/attendance.service';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-listado-presentes',
  templateUrl: './listado-presentes.page.html',
  styleUrls: ['./listado-presentes.page.scss'],
})
export class ListadoPresentesPage implements OnInit {
  estudiantes: any[] = [];
  profesorId: number = 1;
  cursoId: number = 1;
  cursoCodigo: string = '';
  seccion: string = '';

  constructor(private attendanceService: AttendanceService, private route: ActivatedRoute, public socket: Socket) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['cursoId']) {
        this.cursoId = params['cursoId'];
      }
      if (params['cursoCodigo']) {
        this.cursoCodigo = params['cursoCodigo'];
      }
      if (params['seccion']) {
        this.seccion = params['seccion'];
      }

      this.loadStudents();

      // Escuchar evento de actualización de asistencia desde el servidor
      this.socket.on('asistencia_actualizada', (data: any) => {
        console.log('Evento de asistencia actualizada recibido:', data);
        if (data.curso_codigo === this.cursoCodigo && data.seccion === this.seccion) {
          const alumno = this.estudiantes.find((est) => est.id === data.alumno_id);
          if (alumno) {
            alumno.status = data.status;
            console.log(`Estado del alumno con id ${alumno.id} actualizado a ${alumno.status}`);
          }
        }
      });
    });
  }

  loadStudents() {
    this.attendanceService.getStudents(this.profesorId, this.cursoId).subscribe(
      (data: any) => {
        this.estudiantes = data;
      },
      (error) => {
        console.error('Error al cargar estudiantes:', error);
      }
    );
  }
}
