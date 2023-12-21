import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist:any=[]
  constructor(private api:ApiService,private toaster: ToasterService){}

  ngOnInit(): void {
    if(sessionStorage.getItem("token")){
      this.getwishlist()
    }else{
      this.toaster.showWarning("Please Login!!!")
    }
    
  }
  getwishlist(){
    this.api.getWishlistAPI().subscribe({
      next:(res:any)=>{
        this.wishlist = res
        console.log(this.wishlist);
        this.api.getWishlistCount()
      },
      error:(err:any)=>{
        this.toaster.showError(err.error)
      }
    })
  }

  removeWishlistItem =  (productId:any)=>{
    this.api.deleteWishlistItemAPI(productId).subscribe({
      next:(res:any)=>{
        this.getwishlist()
      },
      error:(err:any)=>{
        console.log(err.error);
      }
    })
  }
  addtocart = (product:any)=>{
    if(sessionStorage.getItem("token")){
      //add quantity key with value 1 to product object
      Object.assign(product,{quantity:1})
      //console.log(product);
      this.api.addToCartAPI(product).subscribe({
        next:(res:any)=>{
          this.api.getCartCount()
          this.toaster.showSuccess(res)
          this.removeWishlistItem(product._id)
        },
        error:(err:any)=>{
          console.log(err.error);
          
        }
      })
      
     }else{
       this.toaster.showWarning("Please Login to add products to your Cart!!!")
     }
  }


}
