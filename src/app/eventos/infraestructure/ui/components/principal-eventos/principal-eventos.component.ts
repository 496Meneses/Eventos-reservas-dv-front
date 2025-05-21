import { Component, OnInit } from '@angular/core';
import { EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CrearEventoComponent } from '../crear-evento/crear-evento.component';
import { EventoDTO } from 'src/app/eventos/domain/EventoDTO';
import { EventoService } from '../../service/evento.service';
@Component({
  selector: 'app-principal-eventos',
  templateUrl: './principal-eventos.component.html',
  styleUrls: ['./principal-eventos.component.scss']
})
export class PrincipalEventosComponent implements OnInit {

  calendarOptions: any = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: [],
    eventClick: this.onEventClick.bind(this),
  };
  ngOnInit(): void {
    this.cargar()
  }

  constructor(public mensajeService: MessageService, public dialogService: DialogService,
    public eventoService: EventoService
  ) {
  }

  cargar() {
    this.eventoService.listar().subscribe({
      next: (r) => {
        this.calendarOptions.events = r
      }
    })
  }

  crearEvento() {
    const ref = this.dialogService.open(CrearEventoComponent, {
      height: 'auto',
      width: '60vw',
      header: 'Crear Evento',
      data: {
        modoLectura: false
      }
    },
    )
    ref.onClose.subscribe(r => {
      this.cargar()
    })
  }

  editarEvento(evento: EventoDTO) {
    const ref = this.dialogService.open(CrearEventoComponent, {
      height: 'auto',
      width: '60vw',
      header: 'Editar Evento',
      data: {
        evento: evento,
        modoLectura: false
      }
    },
    )
    ref.onClose.subscribe(r => {
      this.cargar()
    })
  }


  onEventClick(info: any) {
    const event = info.event;

    let eventoEncontrado: any= this.calendarOptions.events.find((e: any) => e.id == event.id)
    const evento: EventoDTO = {
      id: Number(event.id),
      title: event.title,
      date: event.start, // O usa event.start?.toISOString() si necesitas string
      extendedProps: {
        descripcion: event.extendedProps['descripcion']
      },
      limite: eventoEncontrado.limite
    };
    this.editarEvento(evento);
  }

}
