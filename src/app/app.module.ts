import { NgModule } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { SharedModule } from './shared/shared.module';
import { PrimengModule } from './shared/primeng/primeng.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptores } from './shared/interceptores/http.interceptor';
import { LoginService } from './auth/service/login.service';
import {TooltipModule} from 'primeng/tooltip';
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        SharedModule,
        PrimengModule,
        ProgressSpinnerModule,
        TooltipModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        {
            provide: HTTP_INTERCEPTORS, useClass: HttpInterceptores, multi: true
        },
        LoginService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
