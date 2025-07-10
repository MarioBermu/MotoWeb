import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from '@angular/common';
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routes";
import { CartComponent } from "./cart/cart.component";
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';  // <-- añádelo

import { RouteBuilderComponent } from './route-builder/route-builder.component';

import { MapaComponent } from './mapa/mapa.component';
import { PerfilComponent } from "./perfil/perfil.component";



@NgModule({
  declarations: [

  ],
  imports: [
    PerfilComponent,
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [],
})
export class AppModule {}
