import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.css'],
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password!: string;
    correo: string;
    constructor(public loginService: LoginService, 
        private router: Router,
        private messageService: MessageService) { }

    async iniciarSesion() {
        this.loginService.getLogin(this.correo, this.password).toPromise().then((response) => {
            this.router.navigate(["/"])
        }).catch(() => { 
            this.messageService.add({
                severity: "error",
                detail: "Credenciales incorrectas"
            })
         })
    }
}
