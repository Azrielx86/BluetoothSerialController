import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {DevicesPage} from "./pages/devices/devices.page";
import {DevControlPage} from "./pages/dev-control/dev-control.page";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'devices'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'devices',
    loadChildren: () => import('./pages/devices/devices.module').then( m => m.DevicesPageModule)
  },
  {
    path: 'dev-control',
    loadChildren: () => import('./pages/dev-control/dev-control.module').then( m => m.DevControlPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
