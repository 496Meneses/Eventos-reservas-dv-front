import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrincipalReservaComponent } from './infraestructure/ui/components/principal-reserva/principal-reserva.component';

//, canActivate: [AuthGuardGuard]
@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: PrincipalReservaComponent }
    ])],
    exports: [RouterModule]
})
export class ReservasRoutingModule { }
