

import { RouterModule,Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { NgModule } from '@angular/core';

import { MapaComponent } from './mapa/mapa.component';
import { PageNosotrosComponent } from './page-nosotros/page-nosotros.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PreguntaComponent } from './home/test/pregunta/pregunta.component';
import { WelcomeComponent } from './home/test/welcome/welcome.component';
import { ForoComponent } from './home/foro/foro.component';
import { HoraDelFinComponent } from './home/hora-del-fin/hora-del-fin.component';
import { BarraDeNavegacionComponent } from './barra-de-navegacion/barra-de-navegacion.component';
import { PreguntasComponent } from './preguntas/preguntas.component'
import { RouteBuilderComponent } from './route-builder/route-builder.component';

export const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },


  {path: 'route-builder', component: RouteBuilderComponent},
  { path: 'mapa', component: MapaComponent },
  { path: 'pageNosotros', component: PageNosotrosComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'pregunta', component: PreguntaComponent},
  { path: 'welcome', component: WelcomeComponent},
  { path: 'preguntas', component: PreguntasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})

export class AppRoutingModule { }



