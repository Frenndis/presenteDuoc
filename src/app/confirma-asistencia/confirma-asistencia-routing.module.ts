import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmaAsistenciaPage } from './confirma-asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmaAsistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmaAsistenciaPageRoutingModule {}
