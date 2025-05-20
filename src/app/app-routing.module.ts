import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { PrincipalComponent } from './home/principal/principal.component';
import { AuthGuardGuard } from './shared/auth-guard.guard';
import { RolesGuard } from './shared/roles.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent, canActivate: [AuthGuardGuard],
                children: [
                    { path: '', component: PrincipalComponent },
                    { path: 'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule), canActivate: [RolesGuard] },
                ]
            },
            { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
