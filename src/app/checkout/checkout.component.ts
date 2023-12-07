import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  checkoutStatus:boolean = false
  cartTotal:number = 0
  checkOutForm = this.fb.group({
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    flat:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]],
    place:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    pincode:['',[Validators.required,Validators.pattern('[0-9]*')]],
  })
  public payPalConfig ? : IPayPalConfig;
  showSuccess:boolean = false
  showCancel:boolean = false
  showError:boolean = false

  constructor(private fb:FormBuilder,private api:ApiService,private router:Router){

  }

  ngOnInit(): void {
    this.api.cartTotalAmount.subscribe((amount:any)=>{
      this.cartTotal = amount
    })

  }
  cancel(){
    this.checkOutForm.reset()
  }

  proceedToBuy(){
    if(this.checkOutForm.valid){
      this.checkoutStatus = true
      this.initConfig()
    }else{
      alert("Invalid Form")
    }
  }

  private initConfig(): void {
    const total = JSON.stringify(this.cartTotal)
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'sb',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: total,
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: total
                        }
                    }
                }
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details:any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            this.showSuccess = true;
            this.api.emptyCartAPI().subscribe((res:any)=>{
              this.checkoutStatus = false
              this.checkOutForm.reset()
              alert("Your Order has placed successfully!!!")
              this.router.navigateByUrl("/cart")
            })
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            this.showCancel = true;
            this.checkoutStatus = false
           alert("Transaction has been cancelled!!!")
        },
        onError: err => {
            console.log('OnError', err);
            this.showError = true;
            this.checkoutStatus = false
            alert("Transaction has been failed!!!")
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
        }
    };
}

}
