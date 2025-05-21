import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuardGuard } from '../shared/auth-guard.guard';
import { PrincipalEventosComponent } from './infraestructure/ui/components/principal-eventos/principal-eventos.component';

//, 
@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: PrincipalEventosComponent, canActivate: [AuthGuardGuard] }
    ])],
    exports: [RouterModule]
})
export class EventosRoutingModule { }
