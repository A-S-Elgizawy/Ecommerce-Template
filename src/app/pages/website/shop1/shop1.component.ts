import { Component } from '@angular/core';
import { Router, RouterLink , NavigationEnd} from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../../filter/filter.pipe';

@Component({
  selector: 'app-shop1',
  imports: [CommonModule,FilterPipe,RouterLink],
  templateUrl: './shop1.component.html',
  styleUrl: './shop1.component.css'
})
export class Shop1Component {
  searchKey:string='';
  productList:any[]=[]
  filtercategory: any[] = []; 

  constructor(private productSrv:ProductService , private router:Router){}

  ngOnInit(): void {
    this.getproducts()
    // this.fetchProductData()
    // to do scroll for all pages when navigate to another page
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0); 
      }
    });
    // to do scroll for all pages when navigate to another page
  }
  loading: boolean = true; // Add a loading state
  getproducts(){
    this.loading = true;
    this.productSrv.getAllproducts().subscribe((res:any)=>{
    this.productList=res
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

      //  loading 
      // fetchProductData() {
      //   // Simulate fetching data from the server
      //   this.loading = true;
      //   this.productSrv.getAllproducts().subscribe((data: any) => {
      //     this.productList = data;
      //     this.loading = false; // Set loading to false once data is fetched
      //   });
      // }
      // onImageLoad() {
      //   console.log('Image loaded successfully');
      // }
      
      // onImageError(event: Event) {
      //   console.error('Image failed to load', event);
      //   const target = event.target as HTMLImageElement;
      //   target.src = 'assets/placeholder.png'; // Fallback to a placeholder image
      // }
      //  loading 
}
