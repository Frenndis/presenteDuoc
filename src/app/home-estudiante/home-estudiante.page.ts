import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AttendanceService } from '../services/attendance.service';
import { AuthService } from '../services/auth.service'; // Agrega el servicio de autenticación
import { AlertController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-home-estudiante',
  templateUrl: './home-estudiante.page.html',
  styleUrls: ['./home-estudiante.page.scss'],
})
export class HomeEstudiantePage implements OnInit {
  nombre: string = '';
  alumnoId: number = 0;  // El ID del alumno debe ser configurado desde el servicio de autenticación
  cursos: any[] = [];

  constructor(
    private router: Router,
    private attendanceService: AttendanceService,
    private authService: AuthService,  // Inyectamos el AuthService
    private alertController: AlertController // Inyectamos AlertController para los pop-ups
  ) {}

  ngOnInit() {
    // Obtener la información del alumno desde el servicio de autenticación
    const currentUser = this.authService.getCurrentUser(); 

    if (currentUser && currentUser.tipoPerfil === 2) {
      this.alumnoId = currentUser.id;
      this.nombre = currentUser.nombre;
    } else {
      console.error('Usuario no autenticado o tipo de perfil incorrecto');
      this.router.navigate(['/login']);  // Redirige al login si no está autenticado correctamente
    }

    // Cargar los cursos del alumno
    this.loadCursos();
  }

  loadCursos() {
    if (this.alumnoId !== 0) {
      this.attendanceService.getCursosAlumno(this.alumnoId).subscribe((data: any) => {
        this.cursos = data;
      });
    }
  }

  async showEscanearQrAlert(curso: any) {
    const alert = await this.alertController.create({
      header: 'Escanear QR',
      message: 'Debes abrir tu cámara para escanear el código QR y quedar presente en el curso.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Escanear QR',
          handler: () => {
            this.escanearQr(curso);
          },
        },
      ],
    });

    await alert.present();
  }

//Aqui se debe abrir la camara y luego dejar presente al estudiante
async escanearQr(curso: any) {
  console.log('Registrando asistencia para el alumno:', {
    alumnoId: this.alumnoId,
    codigo: curso.codigo,
    seccion: curso.seccion,
  });

  try {
    // Usar la cámara para capturar la imagen
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64, // Puedes usar URI si prefieres
      promptLabelPhoto: 'Selecciona una foto',
      promptLabelPicture: 'Abrir Cámara',
    });

    // Lógica para registrar asistencia después de escanear el QR
    // Se asume que has implementado lógica para procesar el QR escaneado
    this.attendanceService.markAsPresent(this.alumnoId, curso.codigo, curso.seccion).subscribe(
      () => {
        alert('Asistencia registrada');
      },
      (error) => {
        console.error('Error al registrar asistencia:', error);
        alert('Error al registrar asistencia');
      }
    );

  } catch (error) {
    console.error('Error al abrir la cámara o capturar la imagen:', error);
  }
}
}
