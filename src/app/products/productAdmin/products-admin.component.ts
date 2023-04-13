import { Component, OnInit } from '@angular/core';
import { Product, ProductPayload } from '../product.class';
import {PRODUCT_TABLE_CONF} from '../products-admin-table.conf';
import { ProductsService } from '../products.service';

import { BehaviorSubject } from 'rxjs';

import { BaseTableLoader } from 'app/shared/ui/table/base-table-loader.class';

import { CrudItemOptions } from 'app/shared/utils/crud-item-options/crud-item-options.model';
import { log } from 'console';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.scss']
})
export class ProductsAdminComponent extends BaseTableLoader implements OnInit {

  public payload$: BehaviorSubject<ProductPayload> = new BehaviorSubject<ProductPayload>({products:[],total:0});
  public conf: CrudItemOptions[] = PRODUCT_TABLE_CONF;
  public entity = Product;

  constructor(
    private readonly productsService: ProductsService
  ) {
    super();
  }



  ngOnInit(): void {

    // Display data table
    this.loadProduct();
  }

  loadProduct() {
    this.productsService.getProducts().subscribe(products => {
        this.payload$.next({products: products, total: products.length});
      });
  
  }

  public onDeleteProduct(ids: number[]): void {
    this.productsService.delete(ids).subscribe( result => {
      if(result) this.loadProduct();
      else {
        console.error("Un problème est survennu, le produit n'as pas était créer !");
      } 
    });
  }

  public onSave(product: Product): void {
    
    console.log(product);
    if(product.id) {
      this.productsService.update(product).subscribe(result => {
        console.log(result);
        if(result) this.loadProduct();
        else {
          console.error("Un problème est survennu, le produit n'as pas était Modifier !");
        }
      });
    } else {
      this.productsService.create(product).subscribe(result => {
        if(result) this.loadProduct();
        else {
          console.error("Un problème est survennu, le produit n'as pas était créer !");
        }
      });
    }
  }

  private create(product: Product): void {
    this.productsService.create(product).subscribe(result => {
      if(result) this.loadProduct();
      else {
        console.error("Un problème est survennu, le produit n'as pas était créer !");
      }
    });
  }

  private update(product: Product): void {
    this.productsService.update(product).subscribe(result => {
      console.log(result);
      if(result) this.loadProduct();
      else {
        console.error("Un problème est survennu, le produit n'as pas était Modifier !");
      }
    });
  }

  private delete(id: number): void {
    let ids = [id];
    this.productsService.delete(ids).subscribe(result => {
      console.log(result);
      if(result) this.loadProduct();
      else {
        console.error("Un problème est survennu, le produits n'ont pas était Supprimer !");
      }
    });
  }
}
