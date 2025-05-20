import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerInterceptorService {

  cargando$ = new Subject<boolean>();

  constructor() { }

  mostrar(): void {
    this.cargando$.next(true);
  }

  noMostrar() {
    this.cargando$.next(false);
  }
}
