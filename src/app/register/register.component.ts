import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm = this.fb.group({
    username:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })
  constructor(private fb:FormBuilder,private api:ApiService,private router:Router){}

  register(){
    if(this.registerForm.valid){
      const username = this.registerForm.value.username
      const email = this.registerForm.value.email
      const password = this.registerForm.value.password
  
      console.log(`${username}, ${email}, ${password}`);
      const reqBody = {
        username,email,password
      }
      this.api.registerAPI(reqBody).subscribe({
        next:(res:any)=>{
          console.log(res);
          //naviagte login
          this.router.navigateByUrl('user/login')
        },
        error:(err:any)=>{
          console.log(err);
          alert(err.error)          
        }
      })
    }else{
      alert("Invalid Form")
    }
    
    
  }
}
