import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  user: string = '';          // Reemplaza 'correo' por 'user'
  password: string = '';      // Variable para la contraseña

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    this.authService.login(this.user, this.password).subscribe(
      (response: any) => {
        if (response.tipoPerfil === 1) {
          this.router.navigate(['/home-profesor'], { queryParams: { nombre: response.nombre } });
        } else if (response.tipoPerfil === 2) {
          this.router.navigate(['/home-estudiante'], { queryParams: { nombre: response.nombre } });
        }
      },
      (error: any) => {
        alert('Correo o contraseña incorrectos');
      }
    );
  }
}
