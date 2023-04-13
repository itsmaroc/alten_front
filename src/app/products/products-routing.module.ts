import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './ProductList/products.component';
import {ProductsAdminComponent} from './productAdmin/products-admin.component';

const productsRoutes: Routes = [  
  { path: '', component: ProductsComponent },
  { path: 'product_admin', component: ProductsAdminComponent }
];

@NgModule({
  imports: [RouterModule.forChild(productsRoutes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
