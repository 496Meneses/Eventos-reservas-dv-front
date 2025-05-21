import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../auth/service/login.service';
import { Usuario } from '../usuarios/domain/models/usuario';
import { DetalleUsuarioUseCase } from '../usuarios/applications/detalle-usuario/detalle-usuario-use-case';

@Injectable({
  providedIn: 'root'
})
export class RolAdminGuard implements CanActivate {

  constructor(private loginService: LoginService,
    private detalleUsuarioUseCase:DetalleUsuarioUseCase) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.loginService.getRol() == "1") { //ADMINISTRADOR
        return true;
      }
      return false;
  }

  async obtenerRolDelUsuarioLogueado(correo: string) {
    return await this.detalleUsuarioUseCase.execute(correo).toPromise()
  }
  
}
