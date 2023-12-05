import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  username:string=""
  wislistCount:Number =0
  cartCount:Number=0
  constructor(private api:ApiService){}
  ngOnInit(): void {
    if(sessionStorage.getItem("existingUser")){
     this.username = JSON.parse(sessionStorage.getItem("existingUser") || '').username
     this.getWishlistCount()
     this.getCartCount()
    }else{
      this.username=""
      this.wislistCount =0
    }
  }
  getWishlistCount(){
    this.api.wishlistItemCount.subscribe((res:any)=>{
      this.wislistCount = res
      console.log(this.wislistCount);
      
    })
  }
  getCartCount(){
    this.api.cartItemCount.subscribe((res:any)=>{
      this.cartCount = res
      console.log(this.cartCount);
    })
  }
  getSearchKey(search:any){
    console.log(search.value);
    this.api.searchKey.next(search.value)
  }
}
