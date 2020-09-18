import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductsService } from './../../../core/services/products/products.service';

import { MyValidators } from './../../../utils/validators';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  form: FormGroup;
  id: string;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(
      (params: Params) => {
        if (undefined !== params.id) {
          this.id = params.id;
          this.productsService.getProduct(this.id).subscribe(
            product => {
              this.form.patchValue(product);
            }
          );
        }
      }
    );

  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      image: [''],
      description: ['', [Validators.required]],
    });
  }

  saveProduct(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      this.productsService.createProduct(product).subscribe(
        newProduct => {
          console.log(newProduct);
          this.router.navigate(['./admin/products']);
        }
      );
    }
    console.log(this.form.value);
  }

  updateProduct(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      this.productsService.updateProduct(this.id, product).subscribe(
        updateProduct => {
          console.log(updateProduct);
          this.router.navigate(['./admin/products']);
        }
      );
    }
    console.log(this.form.value);
  }

  get priceField(): AbstractControl {
    return this.form.get('price');
  }

}
