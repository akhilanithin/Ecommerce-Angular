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

  getallProducst = async () =>{
    (await this.api.getAllProjectsAPI()).subscribe({
      next:(res:any)=>{
        this.allProducts = res
        // console.log(this.allProducts);
      },
      error:(err:any)=>{
        console.log(err.message);
      }
    })
  }
}
