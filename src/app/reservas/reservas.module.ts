import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearReservaComponent } from './infraestructure/ui/components/crear-reserva/crear-reserva.component';
import { PrincipalReservaComponent } from './infraestructure/ui/components/principal-reserva/principal-reserva.component';
import { ReservasRoutingModule } from './reservas-routing.module';
import { PrimengModule } from '../shared/primeng/primeng.module';
import { SharedModule } from '../shared/shared.module';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { FullCalendarModule } from '@fullcalendar/angular';



@NgModule({
  declarations: [
    CrearReservaComponent,
    PrincipalReservaComponent
  ],
  imports: [
    CommonModule,
    ReservasRoutingModule,
    PrimengModule,
    SharedModule,
    FullCalendarModule
  ],
  providers: [
    MessageService,
    DialogService
  ]
})
export class ReservasModule { }
