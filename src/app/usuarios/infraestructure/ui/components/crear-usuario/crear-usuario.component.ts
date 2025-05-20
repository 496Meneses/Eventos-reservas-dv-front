import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginService } from 'src/app/auth/service/login.service';

import { ObtenerCatalogoRolesUseCase } from 'src/app/shared/application/obtener-catalogo-roles/obtener-catalogos-roles-use-case';
import { Catalogo } from 'src/app/shared/domain/dto/catalogo';
import { CrearUsuarioUseCase } from 'src/app/usuarios/applications/crear-usuario/crear-usuario-use-case';
import { DetalleUsuarioUseCase } from 'src/app/usuarios/applications/detalle-usuario/detalle-usuario-use-case';
import { Usuario } from 'src/app/usuarios/domain/models/usuario';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent {

  formulario: FormGroup
  catRoles: Catalogo[]
  catCaracteristicas: Catalogo[]
  usuario: Usuario
  
  modoLectura: boolean = false

  constructor(private fb : FormBuilder,
    private obtenerRolesUseCase: ObtenerCatalogoRolesUseCase,
    private obtenerDetalleUsuario: DetalleUsuarioUseCase,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private messageService: MessageService,
    private crearUsuarioUseCase: CrearUsuarioUseCase,
    private loginService: LoginService
    ) {}

  ngOnInit(): void {
    this.crearFormulario()
    this.cargarConfigDialog()
    this.cargarCatalogos()
  }
  validarCorreo() {
    this.obtenerDetalleUsuario.execute(this.correo.value).subscribe( r => {
      if (r && (r.correo != this.usuario?.correo)) {
        this.messageService.add({
          severity: 'error',
          detail: 'Correo ya registrado'
        })
        this.correo.markAsTouched()
        this.correo.reset()
      }
    })
  }

  cargarConfigDialog() {
    if (this.config.data?.usuario) {
      this.usuario = this.config.data?.usuario
      this.setDatosFormulario()
    }
    if (this.config.data?.modoLectura) {
      this.formulario.disable()
    }
  }
  cargarCatalogos() {
    this.obtenerRolesUseCase.execute().subscribe((r) => {
      this.catRoles = r
    })
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      correo: ["",Validators.required],
      password: ["",Validators.required],
      rol: ["",Validators.required]
    })
  }

  guardar() {
    if (this.formulario.valid) {
        let crear = {
          id: this.usuario?.id,
          correo : this.correo.value,
          password: this.password.value,
          idRol: this.rol.value,
        } as Usuario
        this.crearUsuarioUseCase.execute(crear).subscribe(r => {
            this.ref.close(r)
        })
    } else {
      this.formulario.markAllAsTouched()
    }
  }
  
  setDatosFormulario() {
    this.correo.setValue(this.usuario.correo)
    this.rol.setValue(this.usuario.idRol)
  }

  get correo() : FormControl {
    return this.formulario.get("correo") as FormControl
  }
  get rol() : FormControl {
    return this.formulario.get("rol") as FormControl
  }

  get password() : FormControl {
    return this.formulario.get("password") as FormControl
  }
}
