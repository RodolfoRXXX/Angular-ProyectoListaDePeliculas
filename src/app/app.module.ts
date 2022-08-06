import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { ListadoComponent } from './componentes/listado/listado.component';

import { HttpClientModule } from '@angular/common/http';
import { DetalleComponent } from './componentes/detalle/detalle.component';
import { CreacionComponent } from './componentes/creacion/creacion.component';

@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    ListadoComponent,
    DetalleComponent,
    CreacionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
