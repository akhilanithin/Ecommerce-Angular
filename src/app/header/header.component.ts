import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  username:string=""

  ngOnInit(): void {
    if(sessionStorage.getItem("existingUser")){
     this.username = JSON.parse(sessionStorage.getItem("existingUser") || '').username
    }else{
      this.username=""
    }
  }
}
