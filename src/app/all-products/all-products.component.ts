import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  allProducts:any = []
  searchString:string=""
  constructor(private api:ApiService,private toaster: ToasterService){}

  ngOnInit(): void {
    this.getallProducst()
    this.api.searchKey.subscribe((data:any)=>{
      this.searchString = data
    })
  }

  getallProducst =  () =>{
    ( this.api.getAllProjectsAPI()).subscribe({
      next:(res:any)=>{
        this.allProducts = res
        // console.log(this.allProducts);
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
          this.toaster.showSuccess(res)
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
