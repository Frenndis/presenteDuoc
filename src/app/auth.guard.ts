import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    
    // Obtener el usuario actual desde el servicio de autenticación
    const currentUser = this.authService.getCurrentUser();

    if (currentUser) {
      // Obtener el rol esperado desde las rutas
      const expectedRole = route.data['role'] as number; // 1 para profesor, 2 para estudiante

      if (currentUser.tipoPerfil === expectedRole) {
        // Si el perfil coincide con el rol esperado, permite el acceso
        return true;
      } else {
        // Si el perfil no coincide, redirige al login
        this.router.navigate(['/home']);
        return false;
      }
    }

    // Si no hay un usuario autenticado, redirige al login
    this.router.navigate(['/home']);
    return false;
  }
}
