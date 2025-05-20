import { UseCase, UseCaseWithNoParams } from "src/app/shared/base/use-case";
import { Usuario } from "../../domain/models/usuario";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { UsuarioRepository } from "../../domain/repositories/usuarioRepository";
@Injectable()
export class ListarUsuarioUseCase implements UseCaseWithNoParams<Usuario[]> {

    constructor(private repo: UsuarioRepository) { }
    execute(): Observable<Usuario[]> {
        return this.repo.listarUsuarios();
    }
    
}