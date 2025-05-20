import { Observable } from "rxjs";
import { Usuario } from "../models/usuario";
import { UsuarioRepository } from "./usuarioRepository";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";

@Injectable()
export class UsuarioWebRepository implements UsuarioRepository {

    constructor (private http: HttpClient) {}
    listarUsuarios(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(environment.backend.concat("/usuario/listar"))
    }
    crearUsuario(usuario: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(environment.backend.concat("/usuario/crear"), usuario)
    }
    eliminarUsuario(id: number): Observable<boolean> {
        return this.http.post<boolean>(environment.backend.concat("/usuario/eliminar/").concat(id.toString()), null)
    }
    detalleUsuarioPorCorreo(correo: string): Observable<Usuario> {
        return this.http.get<Usuario>(environment.backend.concat("/usuario/detalle/").concat(correo))
    }
    
}