import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmaAsistenciaPageRoutingModule } from './confirma-asistencia-routing.module';

import { ConfirmaAsistenciaPage } from './confirma-asistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmaAsistenciaPageRoutingModule
  ],
  declarations: [ConfirmaAsistenciaPage]
})
export class ConfirmaAsistenciaPageModule {}
