import { UseCase } from "src/app/shared/base/use-case";
import { Usuario } from "../../domain/models/usuario";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { UsuarioRepository } from "../../domain/repositories/usuarioRepository";
@Injectable()
export class CrearUsuarioUseCase implements UseCase<Usuario, Usuario> {

    constructor(private repo: UsuarioRepository) { }
    execute(param: Usuario): Observable<Usuario> {
        return this.repo.crearUsuario(param);
    }
    
}