import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home-estudiante',
    loadChildren: () => import('./home-estudiante/home-estudiante.module').then(m => m.HomeEstudiantePageModule),
    canActivate: [AuthGuard], // Se agrega el guard para la ruta del estudiante
    data: { role: 2 } // Se especifica el rol permitido
  },
  {
    path: 'escanear-qr',
    loadChildren: () => import('./escanear-qr/escanear-qr.module').then(m => m.EscanearQrPageModule),
    canActivate: [AuthGuard], // Se agrega el guard para la ruta de escanear QR (solo estudiantes)
    data: { role: 2 } // Se especifica el rol permitido
  },
  {
    path: 'confirma-asistencia',
    loadChildren: () => import('./confirma-asistencia/confirma-asistencia.module').then(m => m.ConfirmaAsistenciaPageModule),
    canActivate: [AuthGuard], // Se agrega el guard para la ruta de confirmar asistencia (solo estudiantes)
    data: { role: 2 } // Se especifica el rol permitido
  },
  {
    path: 'home-profesor',
    loadChildren: () => import('./home-profesor/home-profesor.module').then(m => m.HomeProfesorPageModule),
    canActivate: [AuthGuard], // Se agrega el guard para la ruta del profesor
    data: { role: 1 } // Se especifica el rol permitido
  },
  {
    path: 'listado-presentes',
    loadChildren: () => import('./listado-presentes/listado-presentes.module').then(m => m.ListadoPresentesPageModule),
    canActivate: [AuthGuard], // Se agrega el guard para la ruta de listado presentes (solo profesores)
    data: { role: 1 } // Se especifica el rol permitido
  },
  {
    path: 'not-found',
    loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
