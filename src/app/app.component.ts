import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import Lenis from '@studio-freight/lenis';
import { filter } from 'rxjs/internal/operators/filter';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,RouterModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit {
    title = 'testapp';
 
  currentActiveLink: string = '';

  constructor(private router: Router) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      const currentUrl = event.urlAfterRedirects;
      this.setActiveLinkFromUrl(currentUrl);
    });
  }

  setActiveLinkFromUrl(url: string) {
    const path = url.split('/')[1] || 'home'; // افتراضي لو لم يوجد مسار
    this.currentActiveLink = path;
  }

  

  ngOnInit(): void {
    this.window()
    this.navigation()
    this.menu()
  }

  window(){
    const header = document.querySelector("header")
    const HeaderContent = document.querySelector(".header-content")
    const imgCon = document.querySelector(".img-con")
    const nav = document.querySelector("nav")

let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {


  const currentScrollY = window.scrollY;
  if(window.scrollY > 10){
    header?.classList.add("sticky")
  }else{
    header?.classList.remove("sticky")
  }
  
  // HeaderContent?.classList.toggle("background-white", window.scrollY > 2000);

  if(window.scrollY > 100){
  if (currentScrollY > lastScrollY) {
    // التمرير لأسفل
        header?.classList.add("sticky-dots")
        // nav?.classList.add("active")
  } else {
    // التمرير لأعلى
    header?.classList.add("sticky")
  }
  }



  lastScrollY = currentScrollY;
});
  }

  navigation(){
    const navigate = document.querySelectorAll(".navigate")
    const contactCon = document.querySelector(".contact-con")
    const activenav = document.querySelector(".activenav") as HTMLElement;
    
    contactCon?.addEventListener("click",()=>{
      if(activenav){
        activenav.style.opacity = "0";
      }
    })




const navClasses = ["Home", "About", "service", "projects"];


// activenav?.classList.add(window.sessionStorage.getItem("activeNavigate") || "Home");

// navigate.forEach(link => {
//   link.addEventListener("click", (event) => {
//     activenav.style.opacity = "1";
//     const target = (event.target as HTMLElement);

//     // البحث عن أقرب عنصر يحتوي على أحد الكلاسات المستهدفة
//     const matchedClass = navClasses.find(cls =>
//       target.closest(`.${cls}`)
//     );

//     if (matchedClass && activenav) {
//       // إزالة جميع الكلاسات السابقة
//       navClasses.forEach(cls => activenav.classList.remove(cls));

//       // إضافة الكلاس الجديد فقط
//       activenav.classList.add(matchedClass);
//       console.log(matchedClass);
//       window.sessionStorage.setItem("activeNavigate", matchedClass);
      
//     }
//   });
// });




  }


  menu(){
    const menu = document.querySelector(".menu")
    const HeaderContent = document.querySelector(".header-content")
    const nav = document.querySelector("nav")
    const imgCon = document.querySelector(".img-con")

    menu?.addEventListener("click",()=>{
          HeaderContent?.classList.add("background-white")
          menu.classList.toggle("active")
          HeaderContent?.classList.add("active")
          if(menu?.classList.contains("active")){
          setTimeout(()=>{
            nav?.classList.add("active")
          },550)
          }else{
            nav?.classList.remove("active")
          setTimeout(()=>{
            HeaderContent?.classList.remove("active")
                         HeaderContent?.classList.remove("background-white")
          },550)
          }



          if(window.scrollY > 10 ){
            imgCon?.classList.add("translateTop")
          } 
          if(!(menu?.classList.contains("active"))){
            setTimeout(()=>{
            imgCon?.classList.remove("translateTop")
          },550)
          }

          if (!(menu?.classList.contains("active")) && window.scrollY > 10){
          setTimeout(()=>{
            imgCon?.classList.add("active")
          },550)
          }else{
            imgCon?.classList.remove("active")

          }

        window.addEventListener("scroll",()=>{
          if(nav?.classList.contains("active")){
            imgCon?.classList.add("translateTop")
          } 
          if(window.scrollY < 10){
            imgCon?.classList.remove("translateTop")
          }
        })
      })
  }



























  // const textElement = document.querySelector(".animatedText");
// const text = textElement?.textContent ?? "";
// if(textElement){
//   textElement.textContent = "";
// }

// [...text].forEach(char => {
//   const span = document.createElement("span");
//   span.textContent = char
//   textElement?.appendChild(span);
// });

// const spans = textElement?.querySelectorAll("span");

// if (spans && spans.length > 0) {
//   const tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: ".H",     
//       start: "top top",                   
//       end: "+=1800",                   
//       scrub: true,                     
//       pin: false,                       
//       anticipatePin: 1,              
//     }
//   });
  
//   tl.to(spans, {
//     color: "red",                     
//     stagger: 0.5,                    
//     ease: "none"                
//   });
  
// }

}
