import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProductFormComponent } from './components/product-form/product-form.component';

import { MaterialModule } from './../material/material.module';

import { ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './components/nav/nav.component';

import { InventarioComponent } from './components/inventario/inventario.component';

import { HomeComponent } from './components/home/home.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { FormProductComponent } from './components/form-product/form-product.component';


@NgModule({
  declarations: [ProductFormComponent, NavComponent, InventarioComponent, HomeComponent, ProductsListComponent, FormProductComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
