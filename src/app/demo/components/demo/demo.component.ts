import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  title = 'basic-store-ng';
  power =  10;

  items = ['wilmer', 'fernando'];

  constructor() { }

  ngOnInit(): void {
  }

  addItem(): void {
    this.items.push('nuevo');
  }

  deleteItem(index: number): void {
    this.items.splice(index, 1);
  }

}
