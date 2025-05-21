import { Component } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';


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
esFechaFutura(fechaISO: string): boolean {
  const fechaEvento = new Date(fechaISO);
  const fechaActual = new Date();
  fechaEvento.setHours(0, 0, 0, 0);
  fechaActual.setHours(0, 0, 0, 0);

  return fechaEvento >= fechaActual;
}

  cargar() {

    this.reservaService.obtenerPorPersona(this.idPersona).subscribe(reservas => {
          console.log(reservas)
      const eventosReservados = reservas.map(reserva => ({
        id: reserva.evento.id,
        title: this.esFechaFutura(reserva.evento.date) ? '(Reservado) ' + reserva.evento.title :  '(Finalizado) ' + reserva.evento.title,
        date: reserva.evento.date,
        extendedProps: {
          descripcion: reserva.evento.extendedProps.descripcion,
          idReserva: reserva.idReserva,
          modoLectura:  this.esFechaFutura(reserva.evento.date) ? false: true,
        },

        color:  this.esFechaFutura(reserva.evento.date) ? '#28a745': '#ffffd', 
      }));

      this.eventoService.listarDisponibles(this.idPersona).subscribe(eventos => {
        const eventosNormales = eventos.map(e => ({
          id: e.id,
          title: '(Disponible) ' + e.title ,
          date: e.date,
          extendedProps: {
            descripcion: e.extendedProps.descripcion
          },
          color: '#007bff'
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
        modoLectura: evento.modoLectura,
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
      idReserva: event.extendedProps['idReserva'],
      modoLectura: event.extendedProps['modoLectura']
    };
    if (!evento.modoLectura) {
      this.crearReserva(evento);
    }

  }
}
