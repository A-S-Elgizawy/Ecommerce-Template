import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,AfterViewInit{
  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.Gsap()
    // this.educationscroll()
    this.serviceGsap()
  }
  ngOnInit(): void {
    this.test()
    this.window()
    this.fadeIn()

      this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        window.scrollTo(0, 0); // Scroll to top on navigation
      }
    })
  }


test(){
const canvas = document.getElementById("trailCanvas") as HTMLCanvasElement | null;
if (!canvas) {
  console.error("Canvas element with id 'trailCanvas' not found.");
  return;
}
const ctx = canvas.getContext("2d");
if (!ctx) {
  console.error("2D context not available on canvas.");
  return;
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});

let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
document.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

const trail: any[] = [];
const maxPoints = 80;

for (let i = 0; i < maxPoints; i++) {
  trail.push({ x: mouse.x, y: mouse.y });
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function mixColor(alpha: number) {
  const r = 255;
  const g = Math.floor(100 + (255 - 100) * (1 - alpha));
  const b = Math.floor(180 + (255 - 180) * (1 - alpha));
  // return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    // return `rgba(0, 0, 0, ${alpha})`; // أسود متدرج الشفافية
    return `rgba(207, 24, 70, ${alpha})`;
}

function animate() {
  if (!ctx) {
    return;
  }
  // ctx.fillStyle = "rgba(0,0,0,0.08)";
  // ctx.fillStyle = "rgba(255,255,255,0.08)";
  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.fillRect(0, 0, canvas!.width, canvas!.height);

  // trail[0].x = lerp(trail[0].x, mouse.x, 0.2);
  // trail[0].y = lerp(trail[0].y, mouse.y, 0.2);

  // for (let i = 1; i < trail.length; i++) {
  //   trail[i].x = lerp(trail[i].x, trail[i - 1].x, 0.35);
  //   trail[i].y = lerp(trail[i].y, trail[i - 1].y, 0.35);
  // }

   // النقطة الأولى (الرأس) تتبع الماوس بشكل أسرع
trail[0].x = lerp(trail[0].x, mouse.x, 0.1);
trail[0].y = lerp(trail[0].y, mouse.y, 0.1);

// بقية النقاط تتبع بسرعة أكبر أيضًا
for (let i = 1; i < trail.length; i++) {
  trail[i].x = lerp(trail[i].x, trail[i - 1].x, 0.5);
  trail[i].y = lerp(trail[i].y, trail[i - 1].y, 0.5);
}


  for (let j = 0; j < 3; j++) { // رسم الخط أكثر من مرة لتأثير متوهج
    ctx.beginPath();
    for (let i = 0; i < trail.length - 1; i++) {
      const p = trail[i];
      const next = trail[i + 1];
      const alpha = i / trail.length;
      ctx.strokeStyle = mixColor(1 - alpha);
      // ctx.lineWidth = 1 + (1 - alpha) * 3;
      // يعطي شكل منحني: رفيع في البداية والنهاية، سميك في المنتصف
const bellShape = Math.sin(Math.PI * alpha); // دالة الجيب تعطي انحناء ناعم
ctx.lineWidth = 0.2 + bellShape * 1.0;

      ctx.shadowColor = mixColor(1 - alpha);
      // ctx.shadowBlur = 3;
      ctx.shadowBlur = 10 * Math.pow(alpha, 0.5);

      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(next.x, next.y);
      ctx.stroke();
    }
  }

  requestAnimationFrame(animate);
}

animate();
}

window(){
    const intro = document.querySelector(".intro")
    window.addEventListener("scroll",()=>{
      const scrollY = window.scrollY
      const half = (scrollY / 3)
      intro?.classList.toggle("active",window.scrollY > 199)

      if (intro) {
        (intro as HTMLElement).style.top = `${-half}px`;
      }
      
      
    })
}

fadeIn(){
      const elements = document.querySelectorAll('.fade-in');
      const abouttitle = document.querySelector('h1');
      const imageConetent = document.querySelectorAll('.image-content');

  window.addEventListener('scroll', () => {
  elements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 50) {
      el.classList.add('show');
    }

  });
      const toptitle = abouttitle?.getBoundingClientRect().top;
    if (toptitle !== undefined && toptitle < window.innerHeight - 60) {
      abouttitle?.classList.add("active")
    }

    imageConetent.forEach(ele=>{
      const top = ele.getBoundingClientRect().top
      if(top < window.innerHeight - 100){
        ele.classList.add("active")
      }
    })



});
}


Gsap(){
gsap.registerPlugin(ScrollTrigger);

const myData = document.querySelector(".mydata-con");
const partRight = document.querySelector(".part-right");
const home = document.querySelector(".home");

    if (myData && partRight ) {
  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".home",
      start: "top top",
      end: "+=900", 
      scrub: true,
      pin: true,
      pinSpacing: true,
    }
  });
tl1.to(myData, { x:"-160%"}, 0)
   .to(partRight, { x:"120%"}, 0)
  //  .to(home, { position: "fixed", top: 0, left: 0 },0)

    }
// ===================================

// const aboutContent = document.querySelector(".about-content")
const h1 = document.querySelector(".about-content h1")
const firstItem = document.querySelector(".firstItem")
const secondItem = document.querySelector(".secondItem")

  if (h1) {
  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".about",
      start: "top top",
      end: "+=2500", 
      scrub: true,
      pin: true,
      pinSpacing: true,
    }
  });

 
    tl2.to(h1, { opacity: "0"}, )
    .to(firstItem, { y: "-50%" , opacity: "1"}, )
    .to(firstItem, { rotate: "0deg"}, )
    .to(secondItem, { y: "-50%" , opacity: "1"}, )
    .to(secondItem, { rotate: "0deg"}, )
    .to(secondItem, { color: "white"}, )
    }

// ====================================
  const imgCon = document.querySelector(".image-content .imgedu")

    if (imgCon) {
  const tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".education-content",
      start: "top top",
      end: "+=1000", 
      scrub: true,
      pin: false,
      pinSpacing: true,
    }
  });
     tl3.to(imgCon, { y: "20rem"}, )

    }

    // ===================================

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

 // ==============================

  const title =document.querySelector(".ASG")
  const footer =document.querySelector(".footer")

    if (title && footer) {
  const tl5 = gsap.timeline({
    scrollTrigger: {
      trigger: ".footer",
      start: "top top",
      end: "+=1500", 
      scrub: true,
      pin: true,
      pinSpacing: true,
    }
  });

  tl5.to(title, {  y: "1rem" ,duration: 10},)
  // tl.to(title, {  color: "black" },)

    }
  }






educationscroll(){





const changedNumber = document.querySelector('.changed-number') as HTMLElement;
// const twonum = document.querySelector('.changed-number.twonum') as HTMLElement;
console.log();


 window.addEventListener("scroll",()=>{

const messureNumber = document.querySelector(".messure")?.getBoundingClientRect().height



const itemone = document.querySelector(".one")
const itemtwo = document.querySelector(".two")
const itemthree = document.querySelector(".three")
const items = document.querySelectorAll(".education-content .row .item")
const number = document.querySelector(".con-number .number")
const h1Ele = document.querySelector('.education-content h1') as HTMLElement;


const numberRect =number?.getBoundingClientRect().top
const oneRect =itemone?.getBoundingClientRect().top
const twoRect =itemtwo?.getBoundingClientRect().top
const threeRect =itemthree?.getBoundingClientRect().top

const h1Rect =h1Ele?.getBoundingClientRect().height;

  if (items) {
    items.forEach(ele => {
      (ele as HTMLElement).style.setProperty("--itemTop", `${h1Rect}px`);
    });
  }


  (number as HTMLElement)?.style.setProperty("--numbertop", `${h1Rect}px`);
  if (typeof messureNumber === "number") {
    (number as HTMLElement)?.style.setProperty("--numberHeight", `${messureNumber}px`);
    (changedNumber as HTMLElement)?.style.setProperty("--twoNum", `-${messureNumber}px`);
    (changedNumber as HTMLElement)?.style.setProperty("--threeNum", `-${messureNumber * 2}px`);
  }



  

if (numberRect === oneRect ) {
      changedNumber.classList.add("firstnum")
      changedNumber.classList.remove("twonum")
}
if (numberRect === twoRect ) {
      changedNumber.classList.remove("firstnum")
      changedNumber.classList.remove("threenum")
      changedNumber.classList.add("twonum")
}
if (numberRect === threeRect ) {
      changedNumber.classList.remove("twonum")
      changedNumber.classList.add("threenum")
}

 })
 const conitems = document.querySelector(".con-items")
const conitemsRect = conitems?.getBoundingClientRect().height

  if (conitems && typeof conitemsRect === "number") {
    const conitemsRectNum = Number(conitemsRect);
    (conitems as HTMLElement).style.setProperty("--conItemsHeight", `${conitemsRectNum + 100}px`);
    console.log(conitemsRectNum);
    
  }

  }


  serviceGsap(){




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
