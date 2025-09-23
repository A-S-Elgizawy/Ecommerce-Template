import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fevorit',
  imports: [CommonModule],
  templateUrl: './fevorit.component.html',
  styleUrl: './fevorit.component.css'
})
export class FevoritComponent implements OnInit{

  fevoritproducts:any[] = [];
     constructor(private productSrv:ProductService){}

  ngOnInit(): void {
    this.getfevoritproducts()
  }

  // getfevoritproducts() {
  //   this.fevoritproducts = [...this.productSrv.wishListItem];
  //   console.log("fevoritproducts=", this.fevoritproducts);
  // }

  // getfevoritproducts() {
  //   this.fevoritproducts = this.productSrv.wishListItem.map(item => ({ ...item }));
  //   console.log("fevoritproducts=", this.fevoritproducts);
  // }

  getfevoritproducts() {
    this.fevoritproducts = this.productSrv.wishListItem.slice();
    this.emptycart()
  }

  removeFromFevorit(product:any) {
    const index = this.fevoritproducts.indexOf(product);
    if (index !== -1) {
      this.fevoritproducts.splice(index, 1);
      this.productSrv.removeitemfromwsihlist(product);
      this.productSrv.favoritsubject.next(true)
      this.emptycart()
    }
}

//  =================== add to cart =====================
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
   //  =================== add to cart =====================
   emptycart(){
    const emptycart = document.querySelector(".empty");
    if(this.fevoritproducts.length > 0) {
      console.log("cart products",this.fevoritproducts.length);
      
      if (emptycart) {
        emptycart.classList.add("active");
      }
    }else{
      if (emptycart) {
        emptycart.classList.remove("active");
      }
    }
  }
}
