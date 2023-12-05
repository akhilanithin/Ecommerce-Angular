import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  SERVER_URL = "http://localhost:3000"
  wishlistItemCount = new BehaviorSubject(0)
  cartItemCount = new BehaviorSubject(0)
  searchKey = new BehaviorSubject("")

  constructor(private http:HttpClient) {
    if(sessionStorage.getItem("token")){
      this.getWishlistCount()
      this.getCartCount()
    }
   }

  getAllProjectsAPI =  ()=>{
    return this.http.get(`${this.SERVER_URL}/products/all`)
  }

  viewProductAPI =  (id:any)=>{
    return this.http.get(`${this.SERVER_URL}/products/view/${id}`)
  }

  registerAPI = (user:any)=>{
    return this.http.post(`${this.SERVER_URL}/user/register`,user)
  }

  loginAPI = (user:any)=>{
    return this.http.post(`${this.SERVER_URL}/user/login`,user)
  }

  appendTokenHeader = ()=>{
    let headers = new HttpHeaders()
    const token = JSON.parse(sessionStorage.getItem("token")||'')
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }

  addToWishlistAPI = (reqBody:any)=>{
    return this.http.post(`${this.SERVER_URL}/user/wishlist/add`,reqBody,this.appendTokenHeader())
  }

  getWishlistAPI = ()=>{
    return this.http.get(`${this.SERVER_URL}/user/wishlist`,this.appendTokenHeader())
  }

  getWishlistCount = ()=>{
    this.getWishlistAPI().subscribe((res:any)=>{
      this.wishlistItemCount.next(res.length)
    })
  }

  deleteWishlistItemAPI =(productId:any)=>{
    return this.http.delete(`${this.SERVER_URL}/user/wishlist/remove/${productId}`,this.appendTokenHeader())
  }

  addToCartAPI = (reqBody:any)=>{
    return this.http.post(`${this.SERVER_URL}/user/cart/add`,reqBody,this.appendTokenHeader())
  }

  getCartAPI = ()=>{
    return this.http.get(`${this.SERVER_URL}/user/cart`,this.appendTokenHeader())
  }
  getCartCount = ()=>{
    this.getCartAPI().subscribe((res:any)=>{
      this.cartItemCount.next(res.length)
    })
  }

  incrementCartItemAPI =(id:any)=>{
    return this.http.get(`${this.SERVER_URL}/user/cart/increment/${id}`,this.appendTokenHeader())
  }

  decrementCartItemAPI =(id:any)=>{
    return this.http.get(`${this.SERVER_URL}/user/cart/decrement/${id}`,this.appendTokenHeader())
  }

}
