import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginService } from 'src/app/auth/service/login.service';
import { EventoDTO } from 'src/app/eventos/domain/EventoDTO';
import { Catalogo } from 'src/app/shared/domain/dto/catalogo';
import { DetalleUsuarioUseCase } from 'src/app/usuarios/applications/detalle-usuario/detalle-usuario-use-case';
import { Usuario } from 'src/app/usuarios/domain/models/usuario';
import { EventoService } from '../../service/evento.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.scss']
})
export class CrearEventoComponent implements OnInit {

  formulario: FormGroup
  catRoles: Catalogo[]
  catCaracteristicas: Catalogo[]
  evento: EventoDTO
  minFecha: string;
  modoLectura: boolean = false

  constructor(private fb: FormBuilder,
    private obtenerDetalleUsuario: DetalleUsuarioUseCase,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private messageService: MessageService,
    private loginService: LoginService,
    private eventoService: EventoService
  ) { }

  ngOnInit(): void {
    this.crearFormulario()
    this.cargarConfigDialog()
    const hoy = new Date();
    this.minFecha = hoy.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  }
  cargarConfigDialog() {
    if (this.config.data?.evento) {
      this.evento = this.config.data?.evento
      this.setDatosFormulario()
    }
    if (this.config.data?.modoLectura) {
      this.formulario.disable()
      this.modoLectura = this.config.data?.modoLectura
    }
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      titulo: ["", Validators.required],
      fecha: ["", Validators.required],
      descripcion: ["", Validators.required],
      limite: ["", Validators.required]
    })
  }


  eliminar() {
    this.eventoService.eliminar(this.evento.id).subscribe({
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

      },
      error:(r) => {
      this.messageService.add({
        severity: "error",
        detail: "No se puede eliminar el evento, tiene reservas asignadas"
      })
      this.ref.close()
    }
  })
}
guardar() {
  if (this.formulario.valid) {
    const fechaFormateada = this.formatearFecha(this.fecha.value);

    const crear: EventoDTO = {
      id: this.evento?.id,
      title: this.titulo.value,
      date: fechaFormateada,
      extendedProps: {
        descripcion: this.descripcion.value
      },
      limite: this.limite.value
    };
    this.eventoService.crear(crear).subscribe({
      next: (r) => {
        this.ref.close()
        if (r.error) {
          this.ref.close()
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
  } else {
    this.formulario.markAllAsTouched();
  }
}

formatearFecha(fechaStr: string): string {
  const [year, month, day] = fechaStr.split("-");
  return `${day}/${month}/${year}`;
}


setDatosFormulario() {
  this.titulo.setValue(this.evento.title)
  const fechaFormateada = this.evento.date instanceof Date
    ? this.evento.date.toISOString().split('T')[0]
    : this.evento.date;
  this.limite.setValue(this.evento.limite)
  this.fecha.setValue(fechaFormateada);
  this.descripcion.setValue(this.evento.extendedProps.descripcion)
}

  get titulo() : FormControl {
  return this.formulario.get("titulo") as FormControl
}
  get fecha() : FormControl {
  return this.formulario.get("fecha") as FormControl
}

  get descripcion() : FormControl {
  return this.formulario.get("descripcion") as FormControl
}

  get limite() : FormControl {
  return this.formulario.get("limite") as FormControl
}
}
