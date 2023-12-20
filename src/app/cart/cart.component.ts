import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart:any=[]
  cartTotalPrice:number = 0
  constructor(private api:ApiService,private router:Router,private toaster: ToasterService){}

  ngOnInit(): void {
    if(sessionStorage.getItem("token")){
      this.getcart()
    }else{
      this.toaster.showWarning("Please Login!!!")
    }
  }
  getcart(){
    this.api.getCartAPI().subscribe({
      next:(res:any)=>{
        this.cart = res
        console.log(this.cart);
        this.api.getCartCount()
        this.getCartTotalPrice()
      },
      error:(err:any)=>{
        this.toaster.showError(err.error)
      }
    })
  }

  getCartTotalPrice(){
    if(this.cart.length>0){
      let total =0
      this.cart.forEach((item:any)=>{
        total+=item.totalPrice
        this.cartTotalPrice = Math.ceil(total)
      })
    }else{
      this.cartTotalPrice = 0
    }
  }

  incrementQuantity(id:any){
    this.api.incrementCartItemAPI(id).subscribe({
      next:(res:any)=>{
        this.getcart()
        this.getCartTotalPrice()
        this.api.getCartCount()
      },
      error:(err:any)=>{
        console.log(err.error);
      }
    })
  }
  
  decrementQuantity(id:any){
    this.api.decrementCartItemAPI(id).subscribe({
      next:(res:any)=>{
        this.getcart()
        this.getCartTotalPrice()
        this.api.getCartCount()
      },
      error:(err:any)=>{
        console.log(err.error);
      }
    })
  }

  removeItem(id:any){
    this.api.removeCartItemAPI(id).subscribe({
      next:(res:any)=>{
        this.getcart()
        this.getCartTotalPrice()
        this.api.getCartCount()
      },
      error:(err:any)=>{
        console.log(err.error);
      }
    })
  }

  emptyCart(){
    this.api.emptyCartAPI().subscribe({
      next:(res:any)=>{
        this.getcart()
        this.getCartTotalPrice()
        this.api.getCartCount()
      },
      error:(err:any)=>{
        console.log(err.error);
      }
    })
  }

  checkout(){
    this.api.cartTotalAmount.next(this.cartTotalPrice)
    this.router.navigateByUrl('/user/checkout')
  }
  

}
