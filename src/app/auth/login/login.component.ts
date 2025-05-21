import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CrearUsuarioComponent } from 'src/app/usuarios/infraestructure/ui/components/crear-usuario/crear-usuario.component';

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
        private messageService: MessageService,
        public dialogService: DialogService,
    ) { }

      crearUsuario() {
        const ref = this.dialogService.open(CrearUsuarioComponent, {
          height: 'auto',
          width: '60vw',
          header: 'Registrarse',
          data: {
            modoLectura: false,
            idRol: 2
          }
        },
        )
        ref.onClose.subscribe(r => {

            if (r) {
            this.messageService.add({
                severity: "success",
                detail: "Usuario registrado correctamente"
            })
            } else {
                            this.messageService.add({
                severity: "error",
                detail: "Usuario no registrado"
            })
            }

        })
      }

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
    registrarse() {

        this.crearUsuario()
    }
}
