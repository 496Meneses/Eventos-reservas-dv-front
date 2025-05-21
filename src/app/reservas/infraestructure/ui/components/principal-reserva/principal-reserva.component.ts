import { Component } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { EventoDTO } from 'src/app/eventos/domain/EventoDTO';
import { EventoService } from 'src/app/eventos/infraestructure/ui/service/evento.service';
import { CrearReservaComponent } from '../crear-reserva/crear-reserva.component';
import { ReservaService } from '../../service/reserva.service';
import { LoginService } from 'src/app/auth/service/login.service';

@Component({
  selector: 'app-principal-reserva',
  templateUrl: './principal-reserva.component.html',
  styleUrls: ['./principal-reserva.component.scss']
})
export class PrincipalReservaComponent {
   calendarOptions: any = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: [],
    eventClick: this.onEventClick.bind(this),
  };

  idPersona: number = 1
  ngOnInit(): void {
    console.log(this.loginService.getId())
            this.idPersona = Number(this.loginService.getId())
            this.loginService.getDetalleUsuarioLogueadoAsObserver().subscribe(usuario => {
            if (usuario) {
              this.idPersona = usuario.id
                  
            }
        })
        this.cargar()

  }

  constructor(public mensajeService: MessageService, public dialogService: DialogService,
    public eventoService: EventoService,
    public reservaService: ReservaService,
    private loginService: LoginService
  ) {
  }

  cargar() {
    console.log(this.idPersona)
    this.reservaService.obtenerPorPersona(this.idPersona).subscribe(reservas => {
      const eventosReservados = reservas.map(reserva => ({
        id: reserva.evento.id,
        title: '(Reservado) ' + reserva.evento.title ,
        date: reserva.evento.date,
        extendedProps: {
          descripcion: reserva.evento.extendedProps.descripcion,
          idReserva: reserva.idReserva,
        },
        color: '#28a745' // verde o el color que prefieras
      }));
      // Si también tienes eventos normales:
      this.eventoService.listarDisponibles(this.idPersona).subscribe(eventos => {
        const eventosNormales = eventos.map(e => ({
          id: e.id,
          title: '(Disponible) ' + e.title ,
          date: e.date,
          extendedProps: {
            descripcion: e.extendedProps.descripcion
          },
          color: '#007bff' // azul o tu color base
        }));

        this.calendarOptions.events = [...eventosNormales, ...eventosReservados];
      });
    });
  }

  crearReserva(evento: any) {
    const ref = this.dialogService.open(CrearReservaComponent, {
      height: 'auto',
      width: 'auto',
      header: 'Reserva',
      data: {
        evento: evento,
        idPersona: this.idPersona,
        modoLectura: false,
        idReserva: evento.idReserva
      },
    },
    )
    ref.onClose.subscribe(r => {
      this.cargar()
    })
  }


  onEventClick(info: any) {
    const event = info.event;

    let eventoEncontrado: any= this.calendarOptions.events.find((e: any) => e.id == event.id)
    const evento: any = {
      id: Number(event.id),
      title: event.title,
      date: event.start, // O usa event.start?.toISOString() si necesitas string
      extendedProps: {
        descripcion: event.extendedProps['descripcion']
      },
      limite: eventoEncontrado.limite,
      idReserva: event.extendedProps['idReserva']
    };

    this.crearReserva(evento);
  }
}
