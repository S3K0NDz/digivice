import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DigimonDetailComponent } from './digimon-detail/digimon-detail.component';
import { DigimonListComponent } from './digimon-list/digimon-list.component';
import { HomeComponent } from './home/home.component';
import { GlosarioComponent } from './glosario/glosario.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'glosario', component: GlosarioComponent },
  { path: 'digimon-list', component: DigimonListComponent },
  { path: 'digimon-details/:id', component: DigimonDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
