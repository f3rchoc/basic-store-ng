import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import {LayoutComponent} from './layout/layout.component';

import {AdminGuard} from './admin.guard';

import { from } from 'rxjs';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(module => module.HomeModule),
      },
      {
        path: 'products',
        loadChildren: () => import('./product/product.module').then(product => product.ProductModule),
      },
      {
        path: 'contact',
        loadChildren: () => import('./contact/contact.module').then(contact => contact.ContactModule),
      },
      {
        path: 'order',
        loadChildren: () => import('./order/order.module').then(contact => contact.OrderModule),
      },
      {
        path: 'demo',
        loadChildren: () => import('./demo/demo.module').then(demo => demo.DemoModule),
      },
    ]
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () => import('./admin/admin.module').then(admin => admin.AdminModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(auth => auth.AuthModule),
  },
  {
    path: '**',
    loadChildren: () => import('./page-not-found/page-not-found.module').then(page => page.PageNotFoundModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
