import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MovimientoPlanillaComponent } from './movimiento-planilla/movimiento-planilla.component';  
import { AuthGuard } from './auth.guard';  
import { TrabajadoresSelectComponent } from './trabajadores/trabajadores-select/trabajadores-select.component';

const routes: Routes = [{ path: '', component: LoginComponent },
{ path: 'home', component: HomeComponent },
{ path: 'movimientoPlanilla', component: MovimientoPlanillaComponent, canActivate: [AuthGuard] },
{ path: 'trabajadores', component: TrabajadoresSelectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
