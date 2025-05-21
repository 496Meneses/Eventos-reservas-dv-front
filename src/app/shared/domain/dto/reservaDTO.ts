import { EventoDTO } from "src/app/eventos/domain/EventoDTO";

export interface ReservaDTO {
  idReserva?: number;
  idPersona: number;
  evento: EventoDTO;
  idEventoCrear: number;
}
