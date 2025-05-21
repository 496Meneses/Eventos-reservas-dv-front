import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventoDTO } from 'src/app/eventos/domain/EventoDTO';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

    constructor (private http: HttpClient) {}
    listar(): Observable<EventoDTO[]> {
        return this.http.get<EventoDTO[]>(environment.backend.concat("/evento/listar"))
    }
    crear(usuario: EventoDTO): Observable<any> {
        return this.http.post<EventoDTO>(environment.backend.concat("/evento/crear"), usuario)
    }
    eliminar(id: number): Observable<any> {
        return this.http.post<boolean>(environment.backend.concat("/evento/eliminar/").concat(id.toString()), null)
    }
    listarDisponibles(idPersona: number): Observable<EventoDTO[]> {
        return this.http.get<EventoDTO[]>(environment.backend.concat("/evento/listarDisponibles/").concat(idPersona.toString()))
    }

}
