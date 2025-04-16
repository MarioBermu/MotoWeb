import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from '@angular/common';
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routes";
import { CartComponent } from "./cart/cart.component";
import { FormsModule } from '@angular/forms';


import { MapaComponent } from './mapa/mapa.component';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CartComponent,
  ],
  providers: [],
  bootstrap: [],
})
export class AppModule {}
