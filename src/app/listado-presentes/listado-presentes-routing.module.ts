import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoPresentesPage } from './listado-presentes.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoPresentesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoPresentesPageRoutingModule {}
