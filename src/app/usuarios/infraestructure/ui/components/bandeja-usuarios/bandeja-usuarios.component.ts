import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { EliminarUsuarioUseCase } from 'src/app/usuarios/applications/eliminar-usuario/eliminar-usuario-use-case';
import { ListarUsuarioUseCase } from 'src/app/usuarios/applications/listar-usuarios/listar-usuario-use-case';
import { Usuario } from 'src/app/usuarios/domain/models/usuario';
import { CrearUsuarioComponent } from '../crear-usuario/crear-usuario.component';

@Component({
  selector: 'app-bandeja-usuarios',
  templateUrl: './bandeja-usuarios.component.html',
  styleUrls: ['./bandeja-usuarios.component.scss']
})
export class BandejaUsuariosComponent implements OnInit {

  cargando: boolean = true
  usuarios: Usuario[] = []
  constructor(public dialogService: DialogService,
    private eliminarUsuarioUseCase: EliminarUsuarioUseCase,
    private listarUsuariosUseCase: ListarUsuarioUseCase,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {
  }
  ngOnInit(): void {
    this.listarUsuarios()
  }
  crearUsuario() {
    const ref = this.dialogService.open(CrearUsuarioComponent, {
      height: 'auto',
      width: '60vw',
      header: 'Crear Usuario',
      data: {
        modoLectura: false
      }
    },
    )
    ref.onClose.subscribe(r => {
      this.listarUsuarios()
    })
  }
  verUsuario(usuario: Usuario) {
    const ref = this.dialogService.open(CrearUsuarioComponent, {
      height: 'auto',
      width: '60vw',
      header: 'Ver Usuario',
      data: {
        modoLectura: true,
        usuario: usuario
      }
    },
    )
    ref.onClose.subscribe(r => {
      this.listarUsuarios()
    })
  }
  eliminarUsuario(id: number) {
    this.confirmationService.confirm({
      key: 'confirmarEliminar',
      defaultFocus: 'none',
      accept: () => {
        this.eliminarUsuarioUseCase.execute(id).subscribe(respuesta => {
          this.messageService.add({ severity: "success", detail: "Usuario eliminado" })
          this.listarUsuarios()
        })
      }
    })

  }
  editarUsuario(usuario: Usuario) {
    const ref = this.dialogService.open(CrearUsuarioComponent, {
      height: 'auto',
      width: '60vw',
      header: 'Editar Usuario',
      data: {
        usuario: usuario,
        modoLectura: false
      }
    },
    )
    ref.onClose.subscribe(r => {
      this.listarUsuarios()
    })
  }
  listarUsuarios() {
    this.cargando = true;
    this.listarUsuariosUseCase.execute().subscribe(r => {
      this.usuarios = r;
      this.cargando = false;
    })
  }
}
