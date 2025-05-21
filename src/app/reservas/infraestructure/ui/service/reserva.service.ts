import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservaDTO } from 'src/app/shared/domain/dto/reservaDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private http: HttpClient) {}


    crear(reserva: any): Observable<any> {
    const params = new HttpParams()
      .set('eventoId', reserva.eventoId.toString())
      .set('personaId', reserva.personaId.toString());

    return this.http.post<any>(environment.backend.concat("/reserva"), null, { params });
  }

  listar(): Observable<ReservaDTO[]> {
    return this.http.get<ReservaDTO[]>(environment.backend.concat("/reserva"));
  }

  obtenerPorPersona(idPersona: number): Observable<ReservaDTO[]> {
    return this.http.get<ReservaDTO[]>(environment.backend.concat("/reserva/persona/").concat(idPersona.toString()));
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete<boolean>(environment.backend.concat("/reserva/").concat(id.toString()));
  }
}
