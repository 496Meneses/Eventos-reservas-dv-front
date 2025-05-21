import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalEventosComponent } from './infraestructure/ui/components/principal-eventos/principal-eventos.component';
import { EventosRoutingModule } from './eventos-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { PrimengModule } from '../shared/primeng/primeng.module';
import { MessageService } from 'primeng/api';
import { CrearEventoComponent } from './infraestructure/ui/components/crear-evento/crear-evento.component';
import { DialogService } from 'primeng/dynamicdialog';



@NgModule({
  declarations: [
    PrincipalEventosComponent,
    CrearEventoComponent
  ],
  imports: [
    CommonModule,
    EventosRoutingModule,
    SharedModule,
    FullCalendarModule,
    PrimengModule
  ],
  providers: [
    MessageService,
    DialogService
  ]
})
export class EventosModule { }
