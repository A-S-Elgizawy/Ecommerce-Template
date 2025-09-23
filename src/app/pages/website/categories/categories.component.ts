import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  productListbyid:any[]=[]
  productid:number=0
  constructor(private activatedroute:ActivatedRoute,private productSrv:ProductService){
    this.activatedroute.params.subscribe((res:any)=>{
      this.productid=res.id
      this.getAllproductbyid()
    })
  }

  getAllproductbyid(){
    this.productSrv.getproductsbyid(this.productid).subscribe((res:any)=>{
     this.productListbyid=res.data
    })
  }



}
