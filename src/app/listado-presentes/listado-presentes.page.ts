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

  constructor(private attendanceService: AttendanceService, private route: ActivatedRoute, private socket: Socket) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['cursoId']) {
        this.cursoId = params['cursoId'];
      }
      this.loadStudents();
    });

    this.socket.on('asistencia_actualizada', (data: any) => {
      const alumno = this.estudiantes.find(est => est.id === data.alumno_id);
      if (alumno) {
        alumno.status = data.status;
      }
    });
  }

  loadStudents() {
    this.attendanceService.getStudents(this.profesorId, this.cursoId).subscribe((data: any) => {
      this.estudiantes = data;
    });
  }
}
