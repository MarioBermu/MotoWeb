import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StoreService {

  baseUrl = 'http://localhost:3000/api/';
  //baseUrl='https://api.escuelajs.co/api/v1/';


  //lista carrito
private myList:Product[]=[];
  //carrito observable
private myCart= new BehaviorSubject<Product[]>([]);
myCart$=this.myCart.asObservable();


  constructor(private httpClient:HttpClient) { }

    getAllProducts(): Observable<Product[]> {
    const response =this.httpClient.get<Product[]>(`${this.baseUrl}cromos`);
    return response;
    }
    addProduct(product:Product){

      if(this.myList.length===0){
        product.cantidad=1;
        this.myList.push(product)
        this.myCart.next(this.myList);
      }
      else{
        const productMod=this.myList.find((element)=>{
          return element.id===product.id
        })
        if(productMod){
         product.cantidad= productMod.cantidad;
         this.myCart.next(this.myList);
        }
        else{
          product.cantidad=1;
          this.myList.push(product);
          this.myCart.next(this.myList);
        }
      }
    }

    deleteProduct(id:string){
      this.myList=this.myList.filter((product)=>{
        return product.id != id;
      })
      this.myCart.next(this.myList);
    }

    totalCart(){
      const total=this.myList.reduce(function(acc,product){return acc+ (product.cantidad*product.price);},0)
      return total;
    }
}




