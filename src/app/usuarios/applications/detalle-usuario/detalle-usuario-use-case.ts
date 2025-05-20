import { UseCase } from "src/app/shared/base/use-case";
import { Usuario } from "../../domain/models/usuario";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { UsuarioRepository } from "../../domain/repositories/usuarioRepository";
@Injectable()
export class DetalleUsuarioUseCase implements UseCase<string, Usuario> {

    constructor(private repo: UsuarioRepository) { }
    execute(param: string): Observable<Usuario> {
        return this.repo.detalleUsuarioPorCorreo(param);
    }
    
}