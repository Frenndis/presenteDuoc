import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; // Asegúrate de importar ActivatedRoute

@Component({
  selector: 'app-home-profesor',
  templateUrl: './home-profesor.page.html',
  styleUrls: ['./home-profesor.page.scss'],
})
export class HomeProfesorPage implements OnInit {

  correo: string = ''; // Variable para almacenar el correo

  constructor(private router: Router, private route: ActivatedRoute) {}

  navegaListadoPresentes(){ 
    this.router.navigate(['/listado-presentes']);
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.correo = params['correo']; // Captura el parámetro 'correo'
    });
  }

}
