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

}
