import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuardGuard } from '../shared/auth-guard.guard';
import { PrincipalEventosComponent } from './infraestructure/ui/components/principal-eventos/principal-eventos.component';

//, canActivate: [AuthGuardGuard]
@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: PrincipalEventosComponent }
    ])],
    exports: [RouterModule]
})
export class EventosRoutingModule { }
