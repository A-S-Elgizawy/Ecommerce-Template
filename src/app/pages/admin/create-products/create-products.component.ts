import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-create-products',
  imports: [CommonModule,FormsModule],
  templateUrl: './create-products.component.html',
  styleUrl: './create-products.component.css'
})
export class CreateProductsComponent {

  issidepanalvisible:boolean=false;

  opensidepanal(){
    this.issidepanalvisible=true;
  }
  closesidepanal(){
    this.issidepanalvisible=false;
  }

  productObj:any={
  "productId": 0,
  "productSku": "",
  "productName": "",
  "productPrice": 0,
  "productShortName": "",
  "productDescription": "",
  "createdDate": new Date(),
  "deliveryTimeSpan": "",
  "categoryId": 0,
  "productImageUrl": ""
  };



 
  categoryList: any [] = []; // add
  productList: any [] = []; // add

  constructor(private productSrv: ProductService) { }  // add



  ngOnInit(): void {  
    this.getAllproducts();
    // this.getAllcategory()
   }

  //  getAllcategory(){
  //   this.productSrv.getAllcategory().subscribe((res:any)=>{
  //    this.categoryList=res.data
  //   })
  // }


  getAllproducts(){ 
    this.productSrv.getAllproducts().subscribe((res:any)=>{ 
      this.productList=res.data;
    })
  };

  // onupdate() {
  //   console.log('Payload being sent:', this.productObj); // Debugging
  //   this.productSrv.updateproduct(this.productObj).subscribe((res: any) => {
  //     if (res.result) {
  //       alert('Product updated');
  //       this.getAllproducts(); 
  //     } else {
  //       alert(res.message);
  //     }
  //   });
  // }

  // onupdate(){
  //   this.productSrv.updateproduct(this.productObj).subscribe((res:any)=>{
  //     if(res.result){
  //       alert("product updated");
  //       this.getAllproducts();
  //     }else{
  //       alert(res.message)
  //     }
  //   })
  // }

  // onSave(){
  //   this.productSrv.saveproduct(this.productObj).subscribe((res:any)=>{
  //     debugger;
  //     if(res.result){
  //       this.getAllproducts();
  //     }else{
  //       alert(res.message)
  //     }
  //   })
  // }


  onIdit(item:any){
    this.productObj=item;
    this.opensidepanal()
  }

  // ondelete(item: any){
  //   const isdelete = confirm("are you sure");
  //   if(isdelete){
  //     this.productSrv.deleteproduct(item.productId).subscribe((res:any)=>{
  //       if(res.result){
  //         alert("product deleted");
  //         this.getAllproducts();
  //       }else{
  //         alert(res.message)
  //       }
  //     })
  //   }
  // }


}

