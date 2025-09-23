import { Component ,OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet ,RouterModule } from '@angular/router';
import { ProductService } from './pages/services/product.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';





@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent   {
//   public searchTerm: string = '';
//   title = 'ecommerceapp';
    
//   display:boolean=true;
//   toggle(): void{
//    this.display=!this.display;
//   }
//   categoryList:any[]=[]
//    productbyid:any[]=[]
//   cartproducts:any[]=[]
//   fevoritproducts:any[]=[]
//   constructor(private productSrv:ProductService,private router:Router , public activeShop:ProductService){
//     this.productSrv.cartaddsubject.subscribe((res:any)=>{
//       // this.loadcart()
//       this.getcartproducts()
//     })
//     this.productSrv.favoritsubject.subscribe((res:any)=>{
//       this.getfevoritproducts()
//     })
//   }
  
//   ngOnInit(): void {
//     this.getAllcategory()
//     // this.loadcart()
//     this.getfevoritproducts()
//     this.getcartproducts()
//     // this.activeLink()

// const bar = document.querySelector(".bx-menu");
// const smallscrean = document.querySelector(".small-screan");
// if (bar) {
//     bar.addEventListener("click", () => {
//         smallscrean?.classList.toggle("active");
//     });
// }
    
    
//   }
  
//     getAllcategory(){
//       this.productSrv.getAllcategory().subscribe((res:any)=>{
//         this.categoryList=res.data
//        })
//     }
    
//     // loadcart(){
//     //   this.productSrv.customarid(1).subscribe((res:any)=>{
//     //     this.cartproducts=res.data
//     //   })
//     // }


 
//     getcategoryid(id:number){
//       this.router.navigate(['/categories',id])
//     }
    
//   search(event:any){
//     this.searchTerm=(event.target as HTMLInputElement).value
//     this.productSrv.search.next(this.searchTerm)
//   }

//   getfevoritproducts() {
//     this.fevoritproducts = this.productSrv.wishListItem.slice();
//   }
//   getcartproducts() {
//     this.cartproducts = this.productSrv.cartitems.slice();
//   }

//   // activeLink(){
//   //   const links = document.querySelectorAll(".link")
//   //   links.forEach((ele)=>{
//   //     ele.addEventListener("click",()=>{
//   //       links.forEach((ele)=>{
//   //         ele.classList.remove("active")
//   //       })
//   //       ele.classList.add("active")
//   //     })
//   //   })
//   // }

}
