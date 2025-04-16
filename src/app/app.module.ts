import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routes";
import { CartComponent } from "./cart/cart.component";
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [

  ],
  imports: [
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
