import { ChangeDetectorRef, Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-checkout',
  imports: [CommonModule ,FormsModule,ReactiveFormsModule],
  standalone: true,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

 public myform:any;
  // router: any;
  ngAfterViewInit(): void {
    this.getcartproducts()
    this.calcaulttotal()
  }

  total:number=0
  cartproducts:any[]=[]
  constructor(private productSrv:ProductService, private cdr: ChangeDetectorRef,private router:Router){}



  ngOnInit(): void {
    // this.loadcart()
    this.getcartproducts()
    this.myform = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      postcode: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      
    })
  }
  onSubmit(){
    this.myform.value
    console.log(this.myform.value);
    const Allinputs = document.querySelectorAll("form input")
    alert("Form submitted successfully!")
    Allinputs.forEach((input)=>{ 
      (input as HTMLInputElement).value = "";
     })
     this.productSrv.clearCart();
     this.productSrv.clearCart();
     const iteme = document.querySelectorAll(".iteme")
     iteme.forEach((item)=>{
      (item as HTMLElement).remove();
     })

  this.productSrv.cartaddsubject.next(true) 
  this.calcaulttotal();
  this.cartproducts.length = 0;
  setTimeout(() => {
    return this.router.navigate(['/products']);
  },4000)
  
  }
  getcartproducts() {
    this.cartproducts = this.productSrv.cartitems.slice(); 
    this.updatequantity()
    // this.cartproducts.forEach(element => {
    //   this.total +=  element.productPrice
    // });
  }

  removeFromcart(product:any) {
    const index = this.cartproducts.indexOf(product);
    if (index !== -1) {
      this.cartproducts.splice(index, 1);
      this.productSrv.RemoveFromCart(product);
      this.productSrv.cartaddsubject.next(true)
    }
    this.cdr.detectChanges(); 
    this.calcaulttotal()
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


  updatequantity(){   
    console.log("yes im here");
    const quantity = document.querySelectorAll('.amount');
    const subtotal = document.querySelectorAll('.subtotal-number');
    const priceEl = document.querySelectorAll('.Price-number');
    quantity.forEach((element,index)=>{
      element.addEventListener("click",()=>{
        // this.quan = Number((element as HTMLInputElement).value);
       const value = (element as HTMLInputElement).value;
       if(subtotal){
         (subtotal[index] as HTMLElement).innerText = "$" + (Number(value) * Number((priceEl[index] as HTMLElement).innerHTML.replace("$", ""))).toString();
        //  this.saveCart()
         this.calcaulttotal()
        }
      })
    })
  }
  //   quan:number=1
  // saveCart(): void {
  //   localStorage.setItem('cartproducts', JSON.stringify(this.cartproducts));
  // }

  calcaulttotal(){
    const itemdataEl=document.querySelectorAll(".iteme");
    let totalnum=0;
    itemdataEl.forEach(item=>{
        let priceElement = item.querySelector(".total")?.innerHTML;
        let amount = item.querySelector(".amount") ;
        let pricenum = priceElement ? priceElement.replace("$", "") : "0";
        // let amountnum = amount ? (amount as HTMLInputElement).value : "0";
        totalnum += priceElement ? Number(priceElement.replace("$", "")) : 0;
    })
        this.total = totalnum;
  }

}
