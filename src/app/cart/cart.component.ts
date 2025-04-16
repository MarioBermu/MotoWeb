import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../service/store.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {


  myCart$=this.storeService.myCart$;

  constructor(private storeService:StoreService) {}

  totalProducts(price:number,units:number){
    return price*units;
  }

  deleteProduct(id:string){
    this.storeService.deleteProduct(id);
  }

  totalCart(){
    const result = this.storeService.totalCart();
    return result
  }
}
