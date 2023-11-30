import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  allProducts:any = []
  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.getallProducst()
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
      // alert("proceed to wishlist")
      this.api.addToWishlistAPI(product).subscribe({
        next:(res:any)=>{
          console.log(res);
          alert(`${res.title} added to your wishlist`)
        },
        error:(err:any)=>{
          alert(err.error)
        }
      })
     }else{
       alert("Please Login to add products to your wishlist!!!")
     }
  }

  addtocart = (product:any)=>{
    if(sessionStorage.getItem("token")){
      alert("proceed to cart")
     }else{
       alert("Please Login to add products to your Cart!!!")
     }
  }

}
