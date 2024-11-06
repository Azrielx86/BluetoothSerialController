import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevControlPage } from './dev-control.page';

const routes: Routes = [
  {
    path: '',
    component: DevControlPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevControlPageRoutingModule {}
