import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EventoDTO } from 'src/app/eventos/domain/EventoDTO';
import { EventoService } from 'src/app/eventos/infraestructure/ui/service/evento.service';
import { ReservaService } from '../../service/reserva.service';
import { ReservaDTO } from 'src/app/shared/domain/dto/reservaDTO';

@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.component.html',
  styleUrls: ['./crear-reserva.component.scss']
})
export class CrearReservaComponent implements OnInit {


  evento: EventoDTO
  idPersona: number
  hacerReserva: boolean
  idReserva: number
  modoLectura: boolean
  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private messageService: MessageService,
    private eventoService: EventoService,
    private reservaService: ReservaService
    ) {}


  
    ngOnInit(): void {
      this.cargarConfigDialog()
    }
    cargarConfigDialog() {
      if (this.config.data?.evento) {
        this.evento = this.config.data?.evento
      }
      this.idPersona = this.config.data?.idPersona
      this.idReserva = this.config.data?.idReserva
      this.modoLectura = this.config.data?.modoLectura
    }

  
  
  eliminar() {
    this.reservaService.eliminar(this.idReserva).subscribe({
      next: (r) => {
              this.ref.close()
              if (r.error) {
  
              this.messageService.add({
                  severity: "error",
                  detail: r.respuesta
              })
              } else {
                  this.messageService.add({
                  severity: "success",
                  detail: r.respuesta
              })
              }
  
      }
    })
  }
  guardar() { 
      this.reservaService.crear({
        personaId: this.idPersona,
        eventoId: this.evento.id
      } as any).subscribe({
        next: (r) => {
          this.ref.close()
          if (r === null) {
              this.ref.close()
              this.messageService.add({
                  severity: "error",
                  detail: "Error al reservar el evento"
              })
          } else {
              this.messageService.add({
                  severity: "success",
                  detail: "Evento reservado correctamente"
              })
          }
        }
      })

  }
  
  formatearFecha(fechaStr: string): string {
    const [year, month, day] = fechaStr.split("-");
    return `${day}/${month}/${year}`;
  }
}
