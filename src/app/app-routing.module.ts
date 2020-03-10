import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RetroballComponent } from './retroball/retroball.component';

const routes: Routes = [
  { path: '', component: RetroballComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
