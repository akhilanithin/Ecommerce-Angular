import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  checkoutStatus:boolean = false
  checkOutForm = this.fb.group({
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    flat:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]],
    place:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    pincode:['',[Validators.required,Validators.pattern('[0-9]*')]],
  })
  constructor(private fb:FormBuilder){

  }

  cancel(){
    this.checkOutForm.reset()
  }

  proceedToBuy(){
    if(this.checkOutForm.valid){
      this.checkoutStatus = true
    }else{
      alert("Invalid Form")
    }
  }
}
