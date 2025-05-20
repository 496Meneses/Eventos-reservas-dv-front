import { UseCase } from "src/app/shared/base/use-case";
import { Usuario } from "../../domain/models/usuario";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { UsuarioRepository } from "../../domain/repositories/usuarioRepository";
@Injectable()
export class EliminarUsuarioUseCase implements UseCase<number, boolean> {

    constructor(private repo: UsuarioRepository) { }
    execute(param: number): Observable<boolean> {
        return this.repo.eliminarUsuario(param);
    }
    
}