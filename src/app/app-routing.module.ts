import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './all-products/all-products.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ViewProductComponent } from './view-product/view-product.component';

const routes: Routes = [
  //all product
  {
    path:'', component:AllProductsComponent
  },
  //login
  {
    path:'user/login', component:LoginComponent
  },
  //register
  {
    path:'user/register', component:RegisterComponent
  },
  //wishlist
  {
    path:'wishlist',component:WishlistComponent
  },
  //cart
  {
    path:'cart',component:CartComponent
  },
  //checkout
  {
    path:'user/checkout',component:CheckoutComponent
  },
  //view product
  {
    path:'product/view/:id', component:ViewProductComponent
  },
  {
    path:'**',redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
