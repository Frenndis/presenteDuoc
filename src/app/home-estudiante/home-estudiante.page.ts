import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-estudiante',
  templateUrl: './home-estudiante.page.html',
  styleUrls: ['./home-estudiante.page.scss'],
})
export class HomeEstudiantePage implements OnInit {
  nombre: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['nombre']) {
        this.nombre = params['nombre'];
      }
    });
  }

  navegaEscanearQr() {
    // Aquí puedes definir la lógica para la navegación hacia la pantalla de escaneo de QR
    this.router.navigate(['/escanear-qr']);
  }
}
