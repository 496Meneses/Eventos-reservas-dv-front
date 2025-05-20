import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultarCatalogosRepository } from './domain/repositories/consultar-catalogos-repository';
import { ConsultarCatalogosWebRepository } from './domain/repositories/consultar-catalogos-web-repository';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { BreadcrumbService } from './services/app.breadcrumb.service';
import { PrimengModule } from './primeng/primeng.module';
import { SpinnerInterceptorService } from './services/spinner-interceptor.service';
import { ObtenerCatalogoRolesUseCase } from './application/obtener-catalogo-roles/obtener-catalogos-roles-use-case';
import { DetalleUsuarioUseCase } from '../usuarios/applications/detalle-usuario/detalle-usuario-use-case';
import { UsuarioRepository } from '../usuarios/domain/repositories/usuarioRepository';
import { UsuarioWebRepository } from '../usuarios/domain/repositories/usuarioWebRepository';



@NgModule({
  declarations: [
    BreadCrumbComponent
  ],
  imports: [
    CommonModule,
    PrimengModule
  ],
  providers: [
    SpinnerInterceptorService,
    ObtenerCatalogoRolesUseCase,
    DetalleUsuarioUseCase,
    {
      provide: UsuarioRepository,
      useClass: UsuarioWebRepository
    },
    {
      provide: ConsultarCatalogosRepository,
      useClass : ConsultarCatalogosWebRepository
    },
    BreadcrumbService
  ],
  exports: [
    BreadCrumbComponent
  ]
})
export class SharedModule { }
