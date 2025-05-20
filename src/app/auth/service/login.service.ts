import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, map } from 'rxjs';
import { DetalleUsuarioUseCase } from 'src/app/usuarios/applications/detalle-usuario/detalle-usuario-use-case';
import { Usuario } from 'src/app/usuarios/domain/models/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  ADMINISTRADOR: number = 1
  usuarioLogueado$ = new Subject<Usuario>();
  constructor(private http: HttpClient, private router: Router, private detalleUsuarioUseCase: DetalleUsuarioUseCase) { }

  getLogin(correo: string, password: string) {
    let credenciales = {
      correo: correo,
      password: password
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<HttpResponse<any>>(environment.url.concat("login"), credenciales, {
      observe: 'response',
      headers: headers
    }).pipe(
      map( (response : HttpResponse<any>) => {
        const body = response.body
        const headers = response.headers;
        const bearerToken = headers.get('Authorization')
        const token = bearerToken?.replace("Bearer ", '');
        localStorage.setItem("correo", credenciales.correo)
        localStorage.setItem("token", token!);
        this.detalleUsuarioUseCase.execute(credenciales.correo).subscribe(r => {
          localStorage.setItem("rol", r.idRol.toString());
          this.usuarioLogueado$.next(r);
        })
        return body;
      })
    );
  }

  getToken() {
    return localStorage.getItem("token");
  }
  getCorreo() {
    return localStorage.getItem("correo");
  }
  getRol() {
    return localStorage.getItem("rol");
  }
  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['/auth'])
  }
  getDetalleUsuarioLogueadoAsObserver() : Observable<Usuario> {
    return this.usuarioLogueado$.asObservable()
  }
  getEsAdministrador(): boolean {
    if (Number(this.getRol()) != this.ADMINISTRADOR) {
      return false;
    }
    return true
  }
}
