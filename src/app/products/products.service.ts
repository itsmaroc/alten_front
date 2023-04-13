import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './product.class';
import { environment } from 'envirennement/envirennement';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

    private static productslist: Product[] = null;
    private products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        if( ! ProductsService.productslist )
        {
            this.http.get<any>(this.apiUrl + '/products/').subscribe(data => {
                ProductsService.productslist = data;
                
                this.products$.next(ProductsService.productslist);
            });
        }
        else
        {
            this.products$.next(ProductsService.productslist);
        }

        return this.products$;
    }

    create(prod: Product): Observable<Product[]> {

        this.http.post<any>(this.apiUrl + '/products/', prod).subscribe(data => {
            ProductsService.productslist = data;
            
            this.products$.next(ProductsService.productslist);
        });
        
        return this.products$;
    }

    update(prod: Product): Observable<Product[]>{

        this.http.put<any>(this.apiUrl + '/products/', prod).subscribe(data => {
            ProductsService.productslist = data;
            
            this.products$.next(ProductsService.productslist);
        });

        return this.products$;
    }


    delete(ids: number[]): Observable<Product[]>{

        this.http.post<any>(this.apiUrl + '/products/delete', ids).subscribe(data => {
            ProductsService.productslist = data;
            
            this.products$.next(ProductsService.productslist);
        });
        return this.products$;
    }
}