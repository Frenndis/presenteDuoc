import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; // Asegúrate de importar ActivatedRoute

@Component({
  selector: 'app-home-estudiante',
  templateUrl: './home-estudiante.page.html',
  styleUrls: ['./home-estudiante.page.scss'],
})
export class HomeEstudiantePage implements OnInit {

  correo: string = ''; // Variable para almacenar el correo

  constructor(private router: Router, private route: ActivatedRoute) {} // Inyecta ActivatedRoute en el constructor

  // Función para navegar a la página de escanear QR
  navegaEscanearQr() {
    this.router.navigate(['/escanear-qr']);
  }

  ngOnInit() {
    // Recibir el parámetro 'correo' desde la URL
    this.route.queryParams.subscribe(params => {
      this.correo = params['correo']; // Captura el parámetro 'correo'
    });
  }
}
