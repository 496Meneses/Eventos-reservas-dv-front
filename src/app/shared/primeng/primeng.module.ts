import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SkeletonModule } from 'primeng/skeleton';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { FullCalendarModule } from '@fullcalendar/angular';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PanelModule,
    TableModule,
    ButtonModule,
    DialogModule,
    DynamicDialogModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule,
    CalendarModule,
    ProgressBarModule,
    ToastModule,
    CardModule,
    AccordionModule,
    BreadcrumbModule,
    DropdownModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    DividerModule,
    SkeletonModule,
    StepsModule,
    InputNumberModule,
    FullCalendarModule
  ],
  exports: [
    ProgressSpinnerModule,
    ConfirmDialogModule,
    PanelModule,
    TableModule,
    ButtonModule,
    DialogModule,
    DynamicDialogModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule,
    CalendarModule,
    ProgressBarModule,
    ToastModule,
    CardModule,
    AccordionModule,
    BreadcrumbModule,
    DropdownModule,
    ReactiveFormsModule,
    FormsModule,
    DividerModule,
    SkeletonModule,
    StepsModule,
    InputNumberModule
  ]
})
export class PrimengModule { }
