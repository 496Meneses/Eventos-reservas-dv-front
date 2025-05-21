import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { LoginService } from '../auth/service/login.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    ADMINISTRADOR: number = 1
    model: any[] = [];
    rol: number
    constructor(public layoutService: LayoutService, private loginService: LoginService) { }

    ngOnInit() {
        this.loginService.getDetalleUsuarioLogueadoAsObserver().subscribe(usuario => {
            this.definirMenu(usuario.idRol!.toString());
        })
        if (this.loginService.getRol()) {
            this.definirMenu(this.loginService.getRol()!)
        }
    }
    definirMenu(rol: string) {
        if (rol === this.ADMINISTRADOR.toString()) {
            this.model = [
                {
                    icon: '',
                    items: [
                        {
                            label: 'Home',
                            icon: 'pi pi-fw pi-home',
                            routerLink: ['/']
                        }
                    ]
                },
                {
                    label: 'Paginas',
                    icon: 'pi pi-fw pi-briefcase',
                    items: [
                        {
                            label: 'Eventos',
                            icon: 'pi pi-fw pi-forward',
                            routerLink: ['/eventos']
                        },
                        {
                            label: 'Usuarios',
                            icon: 'pi pi-fw pi-angle-up',
                            routerLink: ['/usuarios']
                        },
                    ]
                },
            ];
        } else {
            this.model = [
                {
                    icon: '',
                    items: [
                        {
                            label: 'Home',
                            icon: 'pi pi-fw pi-home',
                            routerLink: ['/']
                        }
                    ]
                },
                {
                    label: 'Paginas',
                    icon: 'pi pi-fw pi-briefcase',
                    items: [
                        {
                            label: 'Reservas',
                            icon: 'pi pi-fw pi-file-o',
                            routerLink: ['/reservas']
                        }
                    ]
                },
            ];
        }
    }
}
