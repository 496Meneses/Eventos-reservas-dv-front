import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BandejaUsuariosComponent } from './infraestructure/ui/components/bandeja-usuarios/bandeja-usuarios.component';
import { CrearUsuarioComponent } from './infraestructure/ui/components/crear-usuario/crear-usuario.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { PrimengModule } from '../shared/primeng/primeng.module';
import { ConfirmationService, MessageService, SharedModule } from 'primeng/api';
import { ListarUsuarioUseCase } from './applications/listar-usuarios/listar-usuario-use-case';
import { CrearUsuarioUseCase } from './applications/crear-usuario/crear-usuario-use-case';
import { DetalleUsuarioUseCase } from './applications/detalle-usuario/detalle-usuario-use-case';
import { EliminarUsuarioUseCase } from './applications/eliminar-usuario/eliminar-usuario-use-case';
import { UsuarioRepository } from './domain/repositories/usuarioRepository';
import { UsuarioWebRepository } from './domain/repositories/usuarioWebRepository';
import { DialogService } from 'primeng/dynamicdialog';
import { LoginService } from '../auth/service/login.service';

@NgModule({
  declarations: [
    BandejaUsuariosComponent,
    CrearUsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    PrimengModule,
    SharedModule
  ],
  providers: [
    ListarUsuarioUseCase,
    CrearUsuarioUseCase,
    DetalleUsuarioUseCase,
    EliminarUsuarioUseCase,
    MessageService,
    DialogService,
    LoginService,
    ConfirmationService,
    {
      provide: UsuarioRepository,
      useClass: UsuarioWebRepository
    }
  ]
})
export class UsuariosModule { }
