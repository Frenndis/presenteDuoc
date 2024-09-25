import { Component } from '@angular/core';
import {Router, NavigationExtras} from '@angular/router' ;
import { FormControl,FormGroup,Validators } from '@angular/forms';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  correo: string = ''; // Variable para almacenar el correo

  constructor(private router: Router) {}

  navegaHomeEstudiante(){ 
    this.router.navigate(['/home-estudiante'], { queryParams: { correo: this.correo } });;
  }
  navegaHomeProfesor(){ 
    this.router.navigate(['/home-profesor'], { queryParams: { correo: this.correo } });;
  }
  // Definimos el formulario

}
