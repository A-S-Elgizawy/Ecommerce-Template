import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../../filter/filter.pipe';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
// import Swiper from 'swiper';
import Swiper from 'swiper';
// import Pagination from 'swiper';;
import { Keyboard } from 'swiper/modules';
import { Navigation } from 'swiper/modules';
import { Pagination } from 'swiper/modules';
import { Mousewheel } from 'swiper/modules';
import { EffectCoverflow } from 'swiper/modules';

Swiper.use([Navigation, Pagination, EffectCoverflow, Keyboard, Mousewheel]);


@Component({
  selector: 'app-home',
  standalone:true,
  imports: [CommonModule,FilterPipe,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit , AfterViewInit{
searchKey:string='';

   productObj:any={
    "productId": 0,
    "productSku": "",
    "productName": "",
    "productPrice": 0,
    "productShortName": "",
    "productDescription": " ",
    "createdDate": new Date(),
    "deliveryTimeSpan": "",
    "categoryId": 0,
    "productImageUrl": "",
    "categoryName": ""
   }


     

   cartobj:any={
  "CartId": 0,
  "CustId": 1,
  "ProductId": 0,
  "Quantity": 0,
  "AddedDate": "2025-03-30T00:19:18.592Z"
   }


   cartlist:any[]=[]
   productList:any[]=[]
   filtercategory: any[] = []; 
   SwiperItems: any[] = []; 
   displayLimit: number = 6;
   constructor(private productSrv:ProductService , private router:Router){}
  ngAfterViewInit(): void {
    this.swiperactive()
    // this.swiper();
  }

 
  ngOnInit(): void {
    this.updateTime()
    this.swiper();
    this.getproducts()
    this.sug()
    this.productSrv.search.subscribe((res:any)=>{
    this.searchKey=res;
        // to do scroll for all pages when navigate to another page
        this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd) {
            window.scrollTo(0, 0);
          }
        });
        // to do scroll for all pages when navigate to another page
  })



   }

  //  addtocart(productId:number){
  //   this.cartobj.ProductId=productId
  //   this.productSrv.addtocart(this.cartobj).subscribe((res:any)=>{
  //   this.cartlist=res.data
  //    if(res.result){
  //     alert('product added to cart')
  //     this.productSrv.cartaddsubject.next(true)
  //    }
  //   })
  //  } 

//  ===================get all product from api=====================
Deals:any[]=[]
Selleing:any[]=[]
Trendy:any[]=[]
Releases:any[]=[]
loading: boolean = true; // Add a loading state
isviewed:boolean=true
   getproducts(){
    this.loading = true;
    this.productSrv.getAllproducts().subscribe((res:any)=>{
    this.productList=res
    this.filtercategory=this.productList.slice(0,16); 
    // this.SwiperItems=this.productList.slice(66,75);
    this.SwiperItems=this.productList.slice(0);

    this.Deals=this.productList.slice(0,4);
    this.Selleing=this.productList.slice(17,21);
    this.Trendy=this.productList.slice(24,28);
    this.Releases=this.productList.slice(33,37);
    setTimeout(() => {
      this.initializeSwiper();
    }, 0);
    this.loading = false;
    this.isviewed=false
    })
   }
  
   viewMore(): void {
    this.filtercategory=this.productList.slice(0); // Increase the limit by 6 (or any number you prefer)
    this.isviewed=true
  }

   //  ===================get all product from api=====================
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

   suggitions(action: string): void {
    if (action === 'Featured') {
      this.filtercategory = this.productList.slice(0,15); // Copy all items
      const viewedbtn =document.querySelector(".viewed")
      viewedbtn?.classList.remove("viewedbtn")
    } else if (action === 'New-added') {
      const viewedbtn =document.querySelector(".viewed")
      viewedbtn?.classList.add("viewedbtn")
      this.filtercategory = this.productList.filter((item: any) => item.productDescription === 'new');  
    } else if (action === 'Popular') {
      // Filter items with odd indices
      this.filtercategory = this.productList.filter((item: any, index: number) => index % 2 !== 0);
      const viewedbtn =document.querySelector(".viewed")
      viewedbtn?.classList.add("viewedbtn")
    }
  }

  sug(){
    const allsuggitionitems =document.querySelectorAll(".sug");
    allsuggitionitems.forEach(item=>{
      item.addEventListener("click",()=>{
        allsuggitionitems.forEach(item=>{
          item.classList.remove("active")
        })
        item.classList.add("active")
      })
    })
  }

  // [ngClass]="{'active': activeShop.getActiveLink() === 'Shop'}"  => this write whithin shop link in app.html
  activateShop(): void {
    this.productSrv.setActiveLink('Shop');
  }

  // new swiper 
  swiper(){
    var swiper = new Swiper(".swiper-Home", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 3,
        slideShadows: true
      },
      keyboard: {
        enabled: true
      },
      mousewheel: {
      releaseOnEdges: true, 
      sensitivity: 1, 
      },
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      breakpoints: {
        640: {
          slidesPerView: 2
        },
        768: {
          slidesPerView: 1
        },
        1024: {
          slidesPerView: 2
        },
        1560: {
          slidesPerView: 3
        }
      }
    });
        var swipercatigories = new Swiper(".options-box", {
          spaceBetween:24,
          loop:true,
          grabCursor:true,
          navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          },
      
          breakpoints: {
              640: {
              slidesPerView: 2,
              spaceBetween: 20,
              },
              768: {
              slidesPerView: 4,
              spaceBetween: 15,
              },
              1000: {
              slidesPerView: 4,
              spaceBetween: 20,
              },
          },
      });
  }
  initializeSwiper(): void {
    var swipercatigorie = new Swiper(".arrival-swiper", {
      spaceBetween:24,
      loop:true,
      // grabCursor:true,
      navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
      },
      breakpoints: {
          640: {
          slidesPerView: 2,
          spaceBetween: 20,
          },
          768: {
          slidesPerView: 3,
          spaceBetween: 18,
          },
          1000: {
          slidesPerView: 4,
          spaceBetween: 18,
          },
      },
    });
  }
  // new swiper 
swiperactive(){
const swiperslid = document.querySelectorAll(".options-box .swiper-slide") as NodeListOf<HTMLElement>;
const swiperslidp = document.querySelectorAll(".options-content .swiper-slide .p") as NodeListOf<HTMLElement>;
console.log(swiperslidp[1].innerHTML);

swiperslid.forEach((item:any,index)=>{
 item.addEventListener("click",()=>{
  swiperslid.forEach((item:any)=>{
    item.classList.remove("active")
  })
  item.classList.add("active")
  swiperslidp.forEach((item:any)=>{
item.classList.remove("active")
  })
swiperslidp[index].classList.add("active")
  })
 })
}
// swiperslidp.forEach((item:any)=>{
//   item.addEventListener("click",()=>{
//     swiperslidp.forEach((item:any)=>{
//       item.classList.remove("active")
//     })
//     item.classList.add("active")
//   })
// })

day: string = '00';
hour: string = '00';
minute: string = '00';
second: string = '00';

targetDate: Date = new Date(new Date().getTime() + 3 * 60 * 60 * 1000); // 3 hours from now

  updateTime(): void {
    const nowDate = new Date();
    const timeDiff = this.targetDate.getTime() - nowDate.getTime();
  
    if (timeDiff <= 0) {
      this.day = '00';
      this.hour = '00';
      this.minute = '00';
      this.second = '00';
      return; // Stop the timer when the countdown ends
    }
  
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDiff / 1000) % 60);
  
    this.day = days < 10 ? '0' + days : days.toString();
    this.hour = hours < 10 ? '0' + hours : hours.toString();
    this.minute = minutes < 10 ? '0' + minutes : minutes.toString();
    this.second = seconds < 10 ? '0' + seconds : seconds.toString();
  
    // Update the timer every second
    setTimeout(() => {
      this.updateTime();
    }, 1000);
  }
      

}
  



  