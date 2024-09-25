import { Component, OnInit } from '@angular/core';
import {Router, NavigationExtras} from '@angular/router' ;
import { FormControl,FormGroup,Validators } from '@angular/forms';


@Component({
  selector: 'app-escanear-qr',
  templateUrl: './escanear-qr.page.html',
  styleUrls: ['./escanear-qr.page.scss'],
})
export class EscanearQrPage implements OnInit {

  constructor(private router: Router) {}

  navegaConfirmaAsistencia(){ 
    this.router.navigate(['/confirma-asistencia']);
  }

  ngOnInit() {
  }

}
