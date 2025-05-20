import { Injectable } from '@angular/core';
import { SpinnerInterceptorService } from '../services/spinner-interceptor.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoginService } from 'src/app/auth/service/login.service';

@Injectable()
export class HttpInterceptores implements HttpInterceptor {

  constructor(private readonly spinnerInterceptorService: SpinnerInterceptorService,
    private loginService: LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // //this.spinnerInterceptorService.mostrar();
    // if (this.loginService.getToken()) {
    //   const authReq = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${this.loginService.getToken()}`
    //     }
    //   });
    //   return next.handle(authReq).pipe(
    //     finalize( () => {
    //       //this.spinnerInterceptorService.noMostrar();
    //     })
    //   );
    // }
    return next.handle(request).pipe(
      finalize( () => {
        //this.spinnerInterceptorService.noMostrar();
      })
    );
  }
}
