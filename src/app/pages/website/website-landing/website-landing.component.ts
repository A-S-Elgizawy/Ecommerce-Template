import { AfterViewInit, Component ,OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet ,RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Renderer2, ElementRef } from '@angular/core';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@Component({
  selector: 'app-website-landing',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './website-landing.component.html',
  styleUrl: './website-landing.component.css'
})
export class WebsiteLandingComponent implements OnInit ,AfterViewInit {
  public searchTerm: string = '';
  title = 'ecommerceapp';
    
  display:boolean=true;
  toggle(): void{
    this.searchToggle()
   this.display=!this.display;
  }
  categoryList:any[]=[]
   productbyid:any[]=[]
  cartproducts:any[]=[]
  fevoritproducts:any[]=[]
  constructor(private productSrv:ProductService,private router:Router , public activeShop:ProductService ,private renderer: Renderer2, private el: ElementRef) {
    // this.translate.setDefaultLang('en');
    this.productSrv.cartaddsubject.subscribe((res:any)=>{
      // this.loadcart()
      this.getcartproducts()
    })
    this.productSrv.favoritsubject.subscribe((res:any)=>{
      this.getfevoritproducts()
    })
  }
  ngAfterViewInit(): void {
    this.activeHeader()
    this.searchToggle()
    this.up()
    this.switch()
    this.activeLink()
    this.test() 
    this.animationup()
  }
  
  ngOnInit(): void {

    this.activeHeader()
    // this.getAllcategory()
    // this.loadcart()
    this.getfevoritproducts()
    this.getcartproducts()
    // this.activeLink()

const bar = document.querySelector(".bx-menu");
const smallscrean = document.querySelector(".small-screan");
if (bar) {
    bar.addEventListener("click", () => {
        smallscrean?.classList.toggle("active");
    });
}
  }

  // changeLanguage(lang: string): void {
  //   this.translate.use(lang);
  //   localStorage.setItem('language', lang);
  
  //   // Update the direction of the page
  //   const htmlTag = document.documentElement;
  //   htmlTag.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  // }
  
    // getAllcategory(){
    //   this.productSrv.getAllcategory().subscribe((res:any)=>{
    //     this.categoryList=res.data
    //    })
    // }
    
    // loadcart(){
    //   this.productSrv.customarid(1).subscribe((res:any)=>{
    //     this.cartproducts=res.data
    //   })
    // }


 
    getcategoryid(id:number){
      this.router.navigate(['/categories',id])
    }
    
  search(event:any){
    this.searchTerm=(event.target as HTMLInputElement).value
    this.productSrv.search.next(this.searchTerm)
  }

  getfevoritproducts() {
    this.fevoritproducts = this.productSrv.wishListItem.slice();
  }
  getcartproducts() {
    this.cartproducts = this.productSrv.cartitems.slice();
  }

  

  activeLink(){
    const links = document.querySelectorAll(".link")
    const smallscreen = document.querySelector(".small-screan")
    links.forEach((ele)=>{
      ele.addEventListener("click",()=>{
            if (smallscreen) {
              smallscreen.classList.remove("active");
        }
      })
    })

    window.addEventListener("scroll",()=>{
      if (smallscreen) {
        smallscreen.classList.remove("active");
      }
    })

  //   if (smallscreen) {
  //   smallscreen.addEventListener("click", (event) => {
  //     if (event.target !== smallscreen) {
  //       if (smallscreen) {
  //         smallscreen.classList.remove("active");
  //   }
  //     }
    
  //   });
  // }
    // console.log("Scroll Position:", window.scrollY);
    
  }

  searchToggle(){
   const searchbtn= document.querySelector(".searchButton") as HTMLElement
   const searchbox= document.querySelector(".searchBox") as HTMLElement
  //  const searchinput= document.querySelector(".searchInput") as HTMLInputElement
   searchbtn.addEventListener("click",()=>{ 
    searchbox.classList.toggle("active")
   })
  }
  activeHeader() {
    window.addEventListener("scroll", () => {
      const secondHeader = document.querySelector(".second-header") as HTMLElement ;
        secondHeader.classList.toggle("sticky", window.scrollY > 90);
    });
  }

  
  up(){
const upbtnel=document.querySelector(".up");
window.onscroll=function(){
    if(window.scrollY > 600){
        if (upbtnel) {
            (upbtnel as HTMLElement).style.display = "flex";
        }
    }else{
      if (upbtnel) {
        (upbtnel as HTMLElement).style.display = "none";
    }
    }
if (upbtnel) {
upbtnel.addEventListener("click",()=>{
    window.scrollTo({
        top:0,
        behavior:"smooth"
    })
})
}
  }
    } 
    switch(){
    const sunMoonEl =document.querySelector(".sunmoon")
    const iEl =document.querySelector(".switch")
    console.log(iEl);
    
    sunMoonEl?.addEventListener("click",()=>{
      sunMoonEl.classList.toggle("active")
      iEl?.classList.toggle("bxs-sun")
    })
    }

    isDarkMode: boolean = false;

    toggleTheme(): void {
      this.isDarkMode = !this.isDarkMode;
      // localStorage.setItem('isDarkMode', JSON.stringify(this.isDarkMode)); // Save theme state
    
      const header = document.querySelector('header') as HTMLElement;
      const subscribe = document.querySelector('.subscribe') as HTMLElement;
      const mutual = document.querySelectorAll('.mutual2') as NodeListOf<HTMLElement>;
      if (this.isDarkMode) {
        this.renderer.setStyle(document.body, 'background-color', 'rgb(34, 31, 31)');
        this.renderer.setStyle(document.body, 'color', 'white');
    
        if (header) {
          this.renderer.setStyle(header, 'background-color', 'rgb(34, 31, 31)');
          this.renderer.setStyle(header, 'color', 'white');
        }
        if (subscribe) {
          this.renderer.setStyle(subscribe, 'background-color', 'var(--main-color)');
          this.renderer.setStyle(subscribe, 'color', 'white');
        }
        // connectionhomeshop.forEach(element => {
        //   if (element) {
        //     this.renderer.setStyle(element, 'background-color', '#008080');
        //     this.renderer.setStyle(element, 'color', 'white');
        //   }
        // });

        mutual.forEach(element => {
          if (element) {
            this.renderer.setStyle(element, 'color', 'white');
          }
        });
      } else {
        this.renderer.setStyle(document.body, 'background-color', 'white');
        this.renderer.setStyle(document.body, 'color', 'black');
    
        if (header) {
          this.renderer.setStyle(header, 'background-color', 'var(--second2-bg-color)');
          this.renderer.setStyle(header, 'color', 'black');
        }
        if (subscribe) {
          this.renderer.setStyle(subscribe, 'background-color', 'var(--second2-bg-color)');
          this.renderer.setStyle(subscribe, 'color', 'black');
        }
        // connectionhomeshop.forEach(element => {
        //   if (element) {
        //     this.renderer.setStyle(element, 'background-color', '#818181');
        //     this.renderer.setStyle(element, 'color', 'white');
        //   }
        // });
        mutual.forEach(element => {
          if (element) {
            this.renderer.setStyle(element, 'color', 'black');
          }
        });
      }
    }
    test(){
      const  container = document.querySelector(".cog-container") as HTMLElement;
      const  color = document.querySelector(".colors") as HTMLElement;
      const  span = document.querySelectorAll(".colors span") as NodeListOf<HTMLElement>;
      const  cog = document.querySelector(".bxs-cog") as HTMLElement;
      cog.addEventListener("click",()=>{
      container.classList.toggle("active")
      })
     span.forEach((ele)=>{
      ele.addEventListener("click",()=>{
        span.forEach((ele)=>{
          ele.classList.remove("active")
        })
        ele.classList.add("active")
      })
     })
     color.addEventListener("click",(event)=>{
      if((event.target as HTMLElement).classList.contains("string")){
        const root = document.documentElement; 
          root.style.setProperty('--main-color', '#008080'); 
          root.style.setProperty('--second2-bg-color', '#cdfff2'); 
      }
      if((event.target as HTMLElement).classList.contains("violet")){
        const root = document.documentElement; 
          root.style.setProperty('--main-color', '#754ef9'); 
          root.style.setProperty('--second2-bg-color', '#c8bbf5'); 
      }
      if((event.target as HTMLElement).classList.contains("red")){
        const root = document.documentElement; 
          root.style.setProperty('--main-color', '#f152a6'); 
          root.style.setProperty('--second2-bg-color', '#f7d1e5'); 
      }
      if((event.target as HTMLElement).classList.contains("blue")){
        const root = document.documentElement; 
          root.style.setProperty('--main-color', '#00abf0'); 
          root.style.setProperty('--second2-bg-color', '#aee6fd'); 
      }
     })
    
    
      // if (h1test) {
      //   h1test.addEventListener('click', () => {
      //     const root = document.documentElement; // Select the :root element
      //     root.style.setProperty('--main-color', 'red'); // Update the --main-color variable
      //     console.log('Main color changed to red');
      //   });
      // }
    }

    animationup(){
      window.addEventListener("scroll", () => {
        const upbtnel=document.querySelector(".up");
        const scrollTop = window.scrollY; // Current vertical scroll position
        const scrollHeight = document.documentElement.scrollHeight; // Total scrollable height
        const clientHeight = document.documentElement.clientHeight; // Viewport height
        const totalScrollable = scrollHeight - clientHeight; // Total scrollable distance
      
        // Calculate the percentage scrolled
        const scrollPercent = (scrollTop / totalScrollable) * 100;
      
        // Update the progress bar or any element using the percentage
        if (upbtnel) {
          (upbtnel as HTMLElement).style.setProperty("--progress", `${scrollPercent.toFixed(2)}%`);
        }
      });
    }
}
