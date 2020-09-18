import { Component, OnInit, Input } from '@angular/core';
import { Product } from './../../../product.model';
import { ProductsService } from './../../../core/services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  clickProduct(id: number): void {
    console.log('product:' + id);
  }

  constructor(
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe(products => {
      console.log(products);
      this.products = products;
    });
  }

}
