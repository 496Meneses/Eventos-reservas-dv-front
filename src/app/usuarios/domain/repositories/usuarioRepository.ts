import { Observable } from "rxjs"
import { Usuario } from "../models/usuario"

export abstract class UsuarioRepository {
    abstract listarUsuarios(): Observable<Usuario[]>;
    abstract crearUsuario(usuario: Usuario): Observable<Usuario>;
    abstract eliminarUsuario(id: number): Observable<boolean>;
    abstract detalleUsuarioPorCorreo(correo: string): Observable<Usuario>;
}