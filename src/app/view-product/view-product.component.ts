import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  product:any={}
  constructor(private activateRouteInstance: ActivatedRoute,private api:ApiService){}
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
      alert("proceed to wishlist")
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
