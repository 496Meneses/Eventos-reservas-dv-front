import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuardGuard } from '../shared/auth-guard.guard';
import { BandejaUsuariosComponent } from './infraestructure/ui/components/bandeja-usuarios/bandeja-usuarios.component';
//, canActivate: [AuthGuardGuard]
@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: BandejaUsuariosComponent }
    ])],
    exports: [RouterModule]
})
export class UsuariosRoutingModule { }
