import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../../filter/filter.pipe';

@Component({
  selector: 'app-shop2',
  imports: [RouterLink,CommonModule,FilterPipe],
  templateUrl: './shop2.component.html',
  styleUrl: './shop2.component.css'
})
export class Shop2Component {
  searchKey:string='';
  productList:any[]=[]
  filtercategory: any[] = []; 

  constructor(private productSrv:ProductService , private router:Router){}

  ngOnInit(): void {
    this.getproducts()
  }

  loading: boolean = true; // Add a loading state
  getproducts(){
    this.loading = true;
    this.productSrv.getAllproducts().subscribe((res:any)=>{
    this.productList=res.data
    // this.filtercategory=this.productList.slice(0,15);
    this.loading = false;
    })
   }


     //  ===================add to favorit=====================
     togglewhilist(product:any){
      if(this.IsWishlist(product)){
         this.productSrv.removeitemfromwsihlist(product)
      }else{
        this.productSrv.additemtowsihlist(product)
      }
      this.productSrv.favoritsubject.next(true)
     }
  
     IsWishlist(product:any) : boolean{
      return this.productSrv.IsWishlist(product)
     }
  //  ===================add to favorit=====================
  //  ===================add to cart=====================
  toggleAddToCart(product:any){
    if(this.IsAddedToCart(product)){ 
       this.productSrv.RemoveFromCart(product)
    }else{
      this.productSrv.AddToCart(product)
    }
    this.productSrv.cartaddsubject.next(true)
   }

   IsAddedToCart(product:any) : boolean{
    return this.productSrv.IsAddedToCart(product)
   }
   //  ===================add to cart=====================
      //  ===================related selected=====================
   
      filter(category:string){
        this.filtercategory=this.productList.filter((item:any)=>{
          if(item.categoryName === category || category === ''){
            return item
          }
        })
       }
    //  ===================related selected=====================
       openBroductDetail(id:number){
        this.router.navigate(['/product-detail',id])
       }
}
