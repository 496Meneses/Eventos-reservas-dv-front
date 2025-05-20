import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase, UseCaseWithNoParams } from '../../base/use-case';
import { Catalogo } from '../../domain/dto/catalogo';
import { ConsultarCatalogosRepository } from '../../domain/repositories/consultar-catalogos-repository';
@Injectable()
export class ObtenerCatalogoRolesUseCase implements UseCaseWithNoParams<Catalogo[]> {
    constructor(private consultarCatalogosRepository:ConsultarCatalogosRepository) {}    
    execute(): Observable<Catalogo[]> {
        return this.consultarCatalogosRepository.obtenerCatalogoRoles();
    }
}