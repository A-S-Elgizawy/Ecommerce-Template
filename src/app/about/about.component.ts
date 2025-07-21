import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit , AfterViewInit{
    constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.about();
    //     this.router.events.subscribe((event) => {
    //   if(event instanceof NavigationEnd) {
    //     window.scrollTo(0, 0); // Scroll to top on navigation
    //     ScrollTrigger.refresh(); // Tell GSAP to re-evaluate positions
    //   }
    // })
  }


  ngOnInit(): void {

  }

  about() {
//     gsap.registerPlugin(ScrollToPlugin , ScrollTrigger);
// const h1 = document.querySelector(".about-content h1")
// const firstItem = document.querySelector(".firstItem")
// const secondItem = document.querySelector(".secondItem")

// this.router.events.subscribe((event) => {
//   if (event instanceof NavigationEnd) {
//     gsap.to(window, {
//       scrollTo: 0,
//       duration: 0,
//       onComplete: () => ScrollTrigger.refresh()
//     });
//   }
// });

  // if (h1) {
  // const tl2 = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: ".about",
  //     start: "top top",
  //     end: "+=3000", 
  //     scrub: true,
  //     pin: true,
  //     pinSpacing: true,
  //   }
  // });

 
  //   tl2.to(h1, { opacity: "0"}, )
  //   .to(firstItem, { y: "-50%" , opacity: "1"}, )
  //   .to(firstItem, { rotate: "0deg"}, )
  //   .to(secondItem, { y: "-50%" , opacity: "1"}, )
  //   .to(secondItem, { rotate: "0deg"}, )
  //   .to(secondItem, { color: "white"}, )
  //   }





  }

}
