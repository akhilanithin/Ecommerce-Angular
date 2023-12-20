import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  product:any={}
  constructor(private activateRouteInstance: ActivatedRoute,private api:ApiService,private toaster: ToasterService){}
  ngOnInit(): void {
    this.activateRouteInstance.params.subscribe((data:any)=>{
      const {id} = data
      // console.log(id);
      //api call to get a particular product details
      this.getProductDetails(id)
    })
  }

  getProductDetails =  (id:any)=>{
    this.api.viewProductAPI(id).subscribe({
      next:(res:any)=>{
        this.product = res
        console.log(this.product);
      },
      error:(err:any)=>{
        console.log(err.message);
      }
    })
  }

  addtowishlist = (product:any)=>{
    if(sessionStorage.getItem("token")){
      this.api.addToWishlistAPI(product).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.api.getWishlistCount()
          this.toaster.showSuccess(`${res.title} added to your wishlist`)
        },
        error:(err:any)=>{
          this.toaster.showError(err.error)
        }
      })
     }else{
       this.toaster.showWarning("Please Login to add products to your wishlist!!!")
     }
  }

  addtocart = (product:any)=>{
    if(sessionStorage.getItem("token")){
      //add quantity key with value 1 to product object
      Object.assign(product,{quantity:1})
      //console.log(product);
      this.api.addToCartAPI(product).subscribe({
        next:(res:any)=>{
          this.api.getCartCount()
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
