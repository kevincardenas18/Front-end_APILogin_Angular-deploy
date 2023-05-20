import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FilterPipe } from './pipes/filter.pipe';
import { MovimientoPlanillaComponent } from './movimiento-planilla/movimiento-planilla.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthGuard } from './auth.guard';
import { CentroCostosComponent } from './centro-costos/centro-costos.component';
import { TrabajadoresSelectComponent } from './trabajadores/trabajadores-select/trabajadores-select.component';
import { EmisorService } from './shared/emisor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FilterPipe,
    MovimientoPlanillaComponent,
    CentroCostosComponent,
    TrabajadoresSelectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [
    AuthGuard,
    EmisorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }