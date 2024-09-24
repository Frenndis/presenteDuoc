import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoPresentesPageRoutingModule } from './listado-presentes-routing.module';

import { ListadoPresentesPage } from './listado-presentes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoPresentesPageRoutingModule
  ],
  declarations: [ListadoPresentesPage]
})
export class ListadoPresentesPageModule {}
