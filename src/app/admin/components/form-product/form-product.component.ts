import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductsService } from '@core/services/products/products.service';

import { MyValidators } from './../../../utils/validators';

import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  form: FormGroup;
  id: string;
  image$: Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storage: AngularFireStorage,
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
      description: ['', [Validators.required, Validators.minLength(10)]],
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

  uploadFile(event) {
    const file = event.target.files[0];
    const name = 'image.png';
    const fileRef = this.storage.ref(name);
    const task = this.storage.upload(name, file);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          this.image$ = fileRef.getDownloadURL();
          this.image$.subscribe(url => {
            this.form.get('image').setValue(url);
          });
        })
      )
      .subscribe();
  }

}
