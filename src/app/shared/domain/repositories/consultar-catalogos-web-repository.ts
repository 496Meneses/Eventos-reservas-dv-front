import { Observable } from 'rxjs';
import { Catalogo } from '../dto/catalogo';
import { ConsultarCatalogosRepository } from './consultar-catalogos-repository';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable()
export class ConsultarCatalogosWebRepository implements ConsultarCatalogosRepository {

    constructor(private http: HttpClient) {}
    obtenerCatalogoRoles(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>(environment.backend.concat("/catalogos/roles"))
    }
}