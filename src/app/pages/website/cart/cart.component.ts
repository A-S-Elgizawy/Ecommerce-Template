import { AfterViewInit, Component, OnInit,ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-cart',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent  implements OnInit, AfterViewInit {
  // [x: string]: any;
  ngAfterViewInit(): void {
    this.getcartproducts()
    this.calcaulttotal()
    
  }

  total:number=0
  cartproducts:any[]=[]
  constructor(private productSrv:ProductService, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    // this.cartproducts = this.productSrv.getCartItems();
    this.updatequantity()
    // this.loadcart()
    this.getcartproducts()
// this.calcaulttotal()
  }

  getcartproducts() {
    this.cartproducts = this.productSrv.cartitems.slice(); 
    this.updatequantity()
     this.emptycart()
    // this.cartproducts.forEach(element => {
    //   this.total +=  element.productPrice
    // });
  }
  
  emptycart(){
    const emptycart = document.querySelector(".empty");
    if(this.cartproducts.length > 0) {
      console.log("cart products",this.cartproducts.length);
      
      if (emptycart) {
        emptycart.classList.add("active");
      }
    }else{
      if (emptycart) {
        emptycart.classList.remove("active");
      }
    }
  }
  // getcartproducts() {
  //   const savedCart = localStorage.getItem('cartproducts');
  //   if (savedCart) {
  //     this.cartproducts = JSON.parse(savedCart);
  //   } else {
  //     this.cartproducts = this.productSrv.cartitems.slice();
  //   }
  //   // this.updatequantity();
  // }

  removeFromcart(product:any) {
    const index = this.cartproducts.indexOf(product);
    if (index !== -1) {
      this.cartproducts.splice(index, 1);
      this.productSrv.RemoveFromCart(product);
      this.productSrv.cartaddsubject.next(true)
    }
    this.cdr.detectChanges(); 
    this.calcaulttotal()
    this.emptycart()
}


  // loadcart(){
  //   this.productSrv.customarid(1).subscribe((res:any)=>{
  //     this.cartproducts=res.data
  //     this.cartproducts.forEach(element => {
  //       this.subtotal = this.subtotal+element.productPrice
  //     });
  //   })
  // }

  // removeproductid(id:number){
  //   this.productSrv.deleteproductid(id).subscribe((res:any)=>{
  //     if(res.result){
  //       this.loadcart()
  //       this.productSrv.cartaddsubject.next(true)
  //     }
  //   })
  // }

  makesale(){
  //   this.saleobj.totalInvoiceAmount=this.subtotal
  //   this.productSrv.cartaddsubject.next(true)
  //   this.productSrv.makesale(this.saleobj).subscribe((res:any)=>{    this is for make sale 
  //     if(res.result){
  //       this.loadcart()
  //       this.productSrv.cartaddsubject.next(true)
  //     }
  //   }) 
  }

 quantityValue: number | null = null;
  // updatequantity(){   
  //   const quantity = document.querySelectorAll('.amount');
  //   const subtotal = document.querySelectorAll('.subtotal-number');
  //   const priceEl = document.querySelectorAll('.Price-number');
  //   quantity.forEach((element,index)=>{
  //     element.addEventListener("click", (event) => {
  //       this.quantityValue= Number((event.target as HTMLInputElement).value);
  //       window.localStorage.setItem("value", (event.target as HTMLInputElement).value)
  //      const value = (element as HTMLInputElement).value;
  //      if(subtotal){
  //        (subtotal[index] as HTMLElement).innerText = "$" + (Number(value) * Number((priceEl[index] as HTMLElement).innerHTML.replace("$", ""))).toString();
  //       //  this.cartproducts[index].quantity = Number(value);
  //       //  this.saveCart()
  //        this.calcaulttotal()
  //       }      
  //     })
  //   })
  // }
  //   quan:number=1
  // saveCart(): void {
  //   localStorage.setItem('cartproducts', JSON.stringify(this.cartproducts));
  // }
  currentquantity:number=0
  updatequantity(){
    const subtotal = document.querySelectorAll('.subtotal-number');
    const priceEl = document.querySelectorAll('.Price-number');
    const spinner = document.querySelectorAll(".spinner")
    let numberElements = document.querySelectorAll(".quantity-selector")
    spinner.forEach((element,index)=>{
      spinner[index].addEventListener("click",(event)=>{
        if (numberElements[index]) {
          this.currentquantity = Number((numberElements[index] as HTMLInputElement).innerHTML);
          if(((event.target) as HTMLElement).classList.contains("plus") ){
            this.currentquantity++
          }else if(((event.target) as HTMLElement).classList.contains("minus") && (numberElements[index] as HTMLInputElement).innerHTML > "1"){
            this.currentquantity--
          }
          console.log(this.currentquantity);
          
          (numberElements[index] as HTMLInputElement).innerHTML = this.currentquantity.toString();        
          const quan = (numberElements[index] as HTMLInputElement).innerHTML;
          if(subtotal){
            (subtotal[index] as HTMLElement).innerText = "$" + (Number(quan) * Number((priceEl[index] as HTMLElement).innerHTML.replace("$", ""))).toString();
            // this.cartproducts[index].quantity = Number(quan);
            // this.productSrv.cartaddsubject.next(true)
            this.calcaulttotal()
          }
        }  
        
      })
    })
  }
  // updateAmount(index: number, value: number): void {
  //   this.cartproducts[index].quantity = value;
  //   this.productSrv.setCartItems(this.cartproducts);
  // }

  calcaulttotal(){
    const itemdataEl=document.querySelectorAll(".item-data");
    let totalnum=0;
    itemdataEl.forEach(item=>{
        let priceElement = item.querySelector(".Price-number")?.innerHTML;
        let amount = item.querySelector(".quantity-selector") ;
        let pricenum = priceElement ? priceElement.replace("$", "") : "0";
        let amountnum = amount ? (amount as HTMLInputElement).innerHTML : "0";
        totalnum += Number(pricenum) * Number(amountnum);
    })
        this.total = totalnum;
  }
  updatecart() {
    // Clear the cart array
    this.cartproducts = [];
  
    // Clear the cart in the ProductService
    this.productSrv.cartitems = [];
  
    // Remove the cart from localStorage (if applicable)
    localStorage.removeItem('cartproducts');
  
    // Notify other components about the cart update
    this.productSrv.cartaddsubject.next(true);
  
    // Recalculate the total
    this.total = 0;
    this.emptycart()
  }


    // Increase the quantity of a product
    increaseQuantity(product: any): void {
      product.quantity++;
      this.productSrv.updateQuantity(product.id, product.quantity); // Update quantity in the service
      this.calcaulttotal();
    }
  
    // Decrease the quantity of a product
    decreaseQuantity(product: any): void {
      if (product.quantity > 1) {
        product.quantity--;
        this.productSrv.updateQuantity(product.id, product.quantity); // Update quantity in the service
        this.calcaulttotal();
      }
    }
}
// https://img.freepik.com/premium-photo/interior-wall-with-flower-vase-dark-brown-wall-wooden-shelf_41470-3689.jpg?w=360