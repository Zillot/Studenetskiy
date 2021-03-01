import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/views/home/home.component';

const routes: Routes = [{
  path: "",
  children: [{
    path: "home/:lang",
    component: HomeComponent,
  }, {
    path: "home",
    component: HomeComponent,
  }, {
    path: "",
    redirectTo: '/shop',
    pathMatch: 'full'
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
