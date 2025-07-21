import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
@Component({
  selector: 'app-service',
  imports: [RouterLink],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent implements OnInit , AfterViewInit {
    ngAfterViewInit(): void {
      // this.service();
    }
    constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationStart) {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }
    })
    this.service();
  }



    service(){
    const imgaecontent = document.querySelector(".image-content")

      const topimgaecontent = imgaecontent?.getBoundingClientRect().top;
      if (typeof topimgaecontent === "number" && topimgaecontent < window.innerHeight - 10) {
        imgaecontent?.classList.add("active");
      }
// ================================
gsap.registerPlugin(ScrollTrigger);
  const imgConsrv = document.querySelector(".image-content .imgsrv")

    if (imgConsrv) {
  const tl4 = gsap.timeline({
    scrollTrigger: {
      trigger: ".service-content",
      start: "top top",
      end: "+=1000", 
      scrub: true,
      pin: false,
      pinSpacing: true,
    }
  });
tl4.to(imgConsrv, { y: "20rem"}, )

    }

// ================================

  const iconrotate =document.querySelectorAll(".rotate")
  const serviceItem =document.querySelectorAll(".service-item .item")
  const Ielement =document.querySelectorAll(".rotate i")

     const detailsSrv =document.querySelectorAll(".detailsSrv")


   iconrotate.forEach((ele,index)=>{
    ele.addEventListener("click",()=>{
    ele?.classList.toggle("active")
    Ielement[index]?.classList.toggle("fa-minus")
    Ielement[index]?.classList.toggle("fa-plus")
    serviceItem[index]?.classList.toggle("active")
    console.log("yes");
    
    

    const topdetailsSrv = detailsSrv[index].getBoundingClientRect().height

    
    if(serviceItem[index].classList.contains("active")){
      (serviceItem[index] as HTMLElement).style.height = `${topdetailsSrv + 128}px`
    }else{
      (serviceItem[index] as HTMLElement).style.height=`6.5rem`
    }
  })
   })

}
}
