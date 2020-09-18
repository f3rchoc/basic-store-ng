import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from './../../../core/services/products/products.service';
import { Product } from './../../../product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: Product;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      console.log(id);
      this.productsService.getProduct(id).subscribe(product => {
        this.product = product;
        console.log(this.product);
      });
    });
  }

  createProduct(): void {
    const newProduct: Product = {
      id: '300',
      image: 'assets/images/mug.png',
      title: 'New new !!!',
      price: 8000560,
      description: 'hello!!!!'
    };

    this.productsService.createProduct(newProduct).subscribe(product => {
      this.product = product;
    });

  }

  updateProduct(): void {
    const updateProduct: Partial<Product> = {
      id: '300',
      title: 'New new 2222222 !!!',
      price: 8000076
    };

    this.productsService.updateProduct(updateProduct.id, updateProduct).subscribe(product => {
      this.product = product;
    });

  }

  deleteProduct(): void {
    this.productsService.deleteProduct('300').subscribe(rta => {
      console.log(rta);
    });

  }

}
