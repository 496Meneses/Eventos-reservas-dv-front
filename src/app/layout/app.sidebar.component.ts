import { Component, ElementRef } from '@angular/core';
import { LayoutService } from "./service/app.layout.service";
import { LoginService } from '../auth/service/login.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './app.sidebar.component.html'
})
export class AppSidebarComponent {
    constructor(public layoutService: LayoutService, public el: ElementRef, public loginService: LoginService) { }
}

