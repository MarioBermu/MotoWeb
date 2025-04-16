import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../interfaces/product.interface';
import { StoreService } from '../service/store.service';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  products:Product[] = [];

  constructor(private storeService:StoreService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.storeService.getAllProducts().subscribe((data)=>
    {
      return this.products = data;
    })
  }

  addToCart(product:Product){
    return this.storeService.addProduct(product);
  }

}
