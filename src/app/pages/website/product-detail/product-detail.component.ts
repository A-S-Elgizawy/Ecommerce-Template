
import { Component, AfterViewInit, OnInit, ViewEncapsulation ,Renderer2, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../../filter/filter.pipe';
// import { Constant } from '../services/constant/constant';
@Component({
  selector: 'app-product-detail',
  imports: [CommonModule,FilterPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  // encapsulation: ViewEncapsulation.ShadowDom
  })



export class ProductDetailComponent implements OnInit , AfterViewInit{
  productdata:any={};
  router: any;
  constructor(private activatedroute:ActivatedRoute, private productSrv:ProductService,private route:Router, private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.updateSize()
    this.updateColor()
    this.updateVeiw()
    // this.addDynamicElements()
  }
  ngOnInit(): void {
    this.getproductId()
    this.getproducts()
  }

  productList:any[]=[]
filtercategory: any[] = []; 
getproducts(){
  this.productSrv.getAllproducts().subscribe((res:any)=>{
  this.productList=res
  // this.filtercategory=this.productList.slice(0,4);
  })
 }


// openBroductDetail(productId: number): void {
//   // Fetch the product details based on the productId
//   this.productSrv.getproductbyid(productId).subscribe((product: any) => {
//     this.productdata = product; // Update the productdata object
//     this.cdr.detectChanges();
//   });
// }
openBroductDetail(id: number){
  this.route.navigate(['/product-detail', id]);
  setTimeout(() => {
    this.getproductId();
  }, 0);
}
  getproductId(){
    const productid = this.activatedroute.snapshot.paramMap.get('id')
       productid && this.productSrv.getproductbyid(Number(productid)).subscribe((res:any)=>{
         this.productdata = res
         console.log(this.productdata);
   })
}




// getproductId() {
//   const productid = this.activatedroute.snapshot.paramMap.get('id');
//     productid && this.productSrv.getproductbyid(Number(productid)).subscribe((res: any) => {
//       this.productdata = res;
//     });
  
// }
// getproductId2() {
//   const productid = this.activatedroute.snapshot.paramMap.get('id');
//   console.log('Product ID:', productid); // Check if the ID is being retrieved
//   if (productid) {
//     this.productSrv.getproductbyid2(Number(productid)).subscribe((res: any) => {
//       console.log('Product Data:', res); // Check if the API returns the correct data
//       this.productdata = res.data;
//     });
//   } else {
//     console.error('Product ID not found in the route');
//   }
// }




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
//  ===================add to favorit=====================
// =====================adjust size======================== 
  updateSize(){
    const sizes =document.querySelectorAll(".size")
    sizes.forEach(ele=>{
      ele.addEventListener("click",()=>{
        sizes.forEach(ele=>{
          ele.classList.remove("active")
        })
        ele.classList.add("active")
      })
    })
  }
  // =====================adjust size======================== 
// =====================adjust color======================== 
  updateColor(){
    const colo =document.querySelectorAll(".col")
    colo.forEach(ele=>{
      ele.addEventListener("click",()=>{
        colo.forEach(ele=>{
          ele.classList.remove("active")
        })
        ele.classList.add("active")
      })
    })
  }
  // =====================adjust color======================== 

  updateVeiw(){

    const stars = document.querySelector(".stars");
    const test: any = stars?.innerHTML;
   test.slice(2, 28)
    let numberangular=test.slice(2, 28)
    
    
    const additionlInfoEl = document.querySelector(".additionl-info");
const reviews = document.querySelector(".reviews");
const addtionalReviresEl = document.querySelectorAll(".choise");
addtionalReviresEl.forEach((item) => {
  item.addEventListener("click", (event) => {
    addtionalReviresEl.forEach((item) => {
      item.classList.remove("active");
    });
    item.classList.add("active");
    if (event.target && (event.target as HTMLElement).id === "additional") {
      window.scrollTo({
        top: 0,
      });
      setTimeout(() => {
        additionlInfoEl?.classList.add("active");
        reviews?.classList.remove("active");
      }, 500);
    }
    if (event.target && (event.target as HTMLElement).id === "reviews") {
      window.scrollTo({
        top: 0,
      });
      setTimeout(() => {
        reviews?.classList.add("active");
        additionlInfoEl?.classList.remove("active");
      }, 500);
    }
  });
});

const reviewsEl = document.querySelector(".reviews-content");
const addOpinion = document.querySelector(".add-opinion");
const inputName = document.querySelector(".input-name");
const inputEmail = document.querySelector(".input-email");
const textarea = document.querySelector("textarea");
const mumbers = document.querySelector(".mumbers");

let Allstars = document.querySelectorAll(".Allstars");
let createstars = 1;
let notactivestars = 4;
Allstars.forEach((ele) => {
  ele.addEventListener("click", (event) => {
    if (event.target && (event.target as HTMLElement).classList.contains("star2")) {
      createstars = 2;
      notactivestars = 3;
      if ((event.target as HTMLElement).nextElementSibling?.classList.contains("active")) {
        (event.target as HTMLElement).classList.add("active");
      } else {
        (event.target as HTMLElement).classList.toggle("active");
      }
    }
    if ((event.target as HTMLElement).classList.contains("star3")) {
      createstars = 3;
      notactivestars = 2;
      if ((event.target as HTMLElement).nextElementSibling?.classList.contains("active")) {
        if (event.target) {
          (event.target as HTMLElement).classList.add("active");
        }
      } else {
        if (event.target) {
          (event.target as HTMLElement).classList.toggle("active");
        }
      }
      if (event.target && (event.target as HTMLElement).previousElementSibling) {
        ((event.target as HTMLElement).previousElementSibling as HTMLElement).classList.add("active");
      }
    }
    if ((event.target as HTMLElement).classList.contains("star4")) {
      createstars = 4;
      notactivestars = 1;
      if (event.target && (event.target as HTMLElement).nextElementSibling?.classList.contains("active")) {
        (event.target as HTMLElement).classList.add("active");
      } else {
        if (event.target) {
          (event.target as HTMLElement).classList.toggle("active");
        }
      }
      (event.target as HTMLElement).previousElementSibling?.classList.add("active");
      (event.target as HTMLElement).previousElementSibling?.previousElementSibling?.classList.add(
        "active"
      );
    }
    if (event.target && (event.target as HTMLElement).classList.contains("star5")) {
      createstars = 5;
      notactivestars = 0;
      (event.target as HTMLElement).classList.toggle("active");
      (event.target as HTMLElement).previousElementSibling?.classList.add("active");
      (event.target as HTMLElement).previousElementSibling?.previousElementSibling?.classList.add(
        "active"
      );
      ((event.target as HTMLElement).previousElementSibling?.previousElementSibling?.previousElementSibling as HTMLElement)?.classList.add(
        "active"
      );
    }
  });
});


addOpinion?.addEventListener("click", () => {
  const currentdate = new Date();
  let monthname = currentdate.toLocaleString("en", { month: "long" });
  let daynumber = currentdate.getDate();
  let yearnumber = currentdate.getFullYear();
  let hours = currentdate.getHours();
  let minuts = currentdate.getMinutes();
  let daynight = "Am";
  if (hours > 12) {
    hours = hours - 12;
    daynight = "pm";
  }
  minuts = minuts < 10 ? Number("0" + minuts) : minuts;
  // const newopinion = document.createElement("div");
  // newopinion.setAttribute(`numberangular`, numberangular)
  // newopinion.className = "opinions";

  // const existingElement = document.querySelector('.opinions'); // Replace with a class from your component
  // if (existingElement) {
  //   const ngContentAttribute = Array.from(existingElement.attributes).find(attr =>
  //     attr.name.startsWith('_ngcontent-')
  //   );
  //   if (ngContentAttribute) {
  //     newopinion.setAttribute(ngContentAttribute.name, '');
  //   }
  // }
  // const existingElement = document.querySelector(".opinions");
  // if (existingElement) {
  //   const ngContentAttribute = Array.from(existingElement.attributes).find(attr =>
  //     attr.name.startsWith("_ngcontent-")
  //   );
  //   if (ngContentAttribute) {
  //     newopinion.setAttribute(ngContentAttribute.name, "");
  //   }
  // }

  // const imgname = document.createElement("div");
  // imgname.className = "img-name";
  // const existingElement2 = document.querySelector(".img-name");
  // const existingElement3 = document.querySelector(".img-name");
  // if (existingElement2 || existingElement3) {
  //   const ngContentAttribute = Array.from(existingElement2?.attributes || existingElement3?.attributes || []).find(attr =>
  //     attr.name.startsWith("_ngcontent-")
  //   );
  //   if (ngContentAttribute) {
  //     imgname.setAttribute(ngContentAttribute.name, "");
  //   }
  // }
  // const newElement = document.createElement('div');
  // newElement.className = 'dynamic-element';

  // Find an existing element with the _ngcontent-* attribute


  // Append the new element to the DOM
  // const container = document.querySelector('.container-class'); // Replace with your container class
  // if (container) {
  //   container.appendChild(newElement);
  // }

    // const imgname = document.createElement("div");
    // imgname.setAttribute('_ngcontent-ng-c2925089239', '')
  // imgname.className = "img-name";

  // const img = document.createElement("img");
  // // img.setAttribute('_ngcontent-ng-c2925089239', '')
  // img.src='/img/username.jpg';

  // const paragraph = document.createElement("p");
  // paragraph.setAttribute('_ngcontent-ng-c2925089239', '')
  // const paragraph = document.createElement("p");
  // paragraph.setAttribute('_ngcontent-ng-c2925089239', '')

// // test 
// const newopinion = this.renderer.createElement('div');
//   this.renderer.addClass(newopinion, 'opinions');

//   const imgname = this.renderer.createElement('div');
//   this.renderer.addClass(imgname, 'img-name');

//   const img = this.renderer.createElement('img');
//   this.renderer.setAttribute(img, 'src', '/img/username.jpg');

//   const paragraph = this.renderer.createElement('p');
//   const text = this.renderer.createText('Username');
//   this.renderer.appendChild(paragraph, text);

//   this.renderer.appendChild(imgname, img);
//   this.renderer.appendChild(imgname, paragraph);
//   this.renderer.appendChild(newopinion, imgname);

//   const reviewsEl = this.el.nativeElement.querySelector('.reviews-content');
//   this.renderer.appendChild(reviewsEl, newopinion);
// // test 


  // paragraph.innerText = (inputName as HTMLInputElement)?.value || '';
  // imgname.appendChild(img);
  // imgname.appendChild(paragraph);
  // newopinion.appendChild(imgname);

  // const commentcontainer = document.createElement("div");
  // commentcontainer.setAttribute('_ngcontent-ng-c2925089239', '')
  // commentcontainer.className = "comment-container";

  // const stars = document.createElement("div");
  // stars.setAttribute('_ngcontent-ng-c2925089239', '')
  // stars.className = "stars starscontainer";
  for (let i = 0; i < createstars; i++) {
    // const iconEle = document.createElement("i");
    // iconEle.setAttribute('_ngcontent-ng-c2925089239', '')
    // iconEle.className = "bx bx-star";
    // stars.appendChild(iconEle);
  }
  for (let i = 0; i < notactivestars; i++) {
    // const iconEle = document.createElement("i");
    // iconEle.setAttribute('_ngcontent-ng-c2925089239', '')
    // iconEle.className = "bx bx-star";
    // iconEle.style.color = "black";
    // stars.appendChild(iconEle);
  }
  // commentcontainer.appendChild(stars);
  // newopinion.appendChild(commentcontainer);
  // const comment = document.createElement("p");
  // comment.setAttribute('_ngcontent-ng-c2925089239', '')
  // comment.className = "comment";
  // comment.innerText = textarea?.value || '';

  // const date = document.createElement("p");
  // date.setAttribute('_ngcontent-ng-c2925089239', '')
  // date.className = "date";
  // date.innerText = `${monthname} ${daynumber}. ${yearnumber} at ${hours}:${minuts} ${daynight}`;
  // commentcontainer.appendChild(comment);
  // commentcontainer.appendChild(date);
  // if (reviewsEl) {
  //   reviewsEl.appendChild(newopinion);
  // }

  if (inputName) {
    (inputName as HTMLInputElement).value = "";
  }
  if (inputEmail) {
    (inputEmail as HTMLInputElement).value = " ";
  }
  if (textarea) {
    textarea.value = "";
  }
  if (reviewsEl) {
    if (mumbers) {
      mumbers.innerHTML = "(" + reviewsEl.children.length + ")";
    }
  }
  Allstars.forEach((ele) => {
    ele.classList.remove("active");
    Allstars[0].classList.add("active");
  });
  createstars = 1;
  notactivestars = 4;
});
  }

  
    applyNgContentAttribute(existingElement: HTMLElement, newElements: HTMLElement[]) {
      // Find the _ngcontent-* attribute from the existing element
      const ngContentAttribute = Array.from(existingElement.attributes).find(attr =>
        attr.name.startsWith('_ngcontent-')
      );
    
      // Apply the _ngcontent-* attribute to all new elements
      if (ngContentAttribute) {
        newElements.forEach(element => {
          element.setAttribute(ngContentAttribute.name, '');
        });
      }
    }
    addDynamicElements() {
    const existingElement = document.querySelector('.opinions'); // Replace with a class from your component
    if (!existingElement) {
      console.error('Existing element with _ngcontent-* attribute not found.');
      return;
    }
          // adjuct evaluate

let Allstars = document.querySelectorAll(".Allstars");
let createstars = 1;
let notactivestars = 4;
Allstars.forEach((ele) => {
  ele.addEventListener("click", (event) => {
    if (event.target && (event.target as HTMLElement).classList.contains("star2")) {
      createstars = 2;
      notactivestars = 3;
      if ((event.target as HTMLElement).nextElementSibling?.classList.contains("active")) {
        (event.target as HTMLElement).classList.add("active");
      } else {
        (event.target as HTMLElement).classList.toggle("active");
      }
    }
    if ((event.target as HTMLElement).classList.contains("star3")) {
      createstars = 3;
      notactivestars = 2;
      if ((event.target as HTMLElement).nextElementSibling?.classList.contains("active")) {
        if (event.target) {
          (event.target as HTMLElement).classList.add("active");
        }
      } else {
        if (event.target) {
          (event.target as HTMLElement).classList.toggle("active");
        }
      }
      if (event.target && (event.target as HTMLElement).previousElementSibling) {
        ((event.target as HTMLElement).previousElementSibling as HTMLElement).classList.add("active");
      }
    }
    if ((event.target as HTMLElement).classList.contains("star4")) {
      createstars = 4;
      notactivestars = 1;
      if (event.target && (event.target as HTMLElement).nextElementSibling?.classList.contains("active")) {
        (event.target as HTMLElement).classList.add("active");
      } else {
        if (event.target) {
          (event.target as HTMLElement).classList.toggle("active");
        }
      }
      (event.target as HTMLElement).previousElementSibling?.classList.add("active");
      (event.target as HTMLElement).previousElementSibling?.previousElementSibling?.classList.add(
        "active"
      );
    }
    if (event.target && (event.target as HTMLElement).classList.contains("star5")) {
      createstars = 5;
      notactivestars = 0;
      (event.target as HTMLElement).classList.toggle("active");
      (event.target as HTMLElement).previousElementSibling?.classList.add("active");
      (event.target as HTMLElement).previousElementSibling?.previousElementSibling?.classList.add(
        "active"
      );
      ((event.target as HTMLElement).previousElementSibling?.previousElementSibling?.previousElementSibling as HTMLElement)?.classList.add(
        "active"
      );
    }
  });
});

const stars = document.createElement("div");
stars.className = "stars starscontainer";  
  for (let i = 0; i < createstars; i++) {
    const iconEle = document.createElement('i'); // Declare and initialize iconEle
    iconEle.className = 'bx bx-star'; // Example initialization
    stars.appendChild(iconEle);
  }
  for (let i = 0; i < notactivestars; i++) {
    const iconEle = document.createElement('i'); // Declare and initialize iconEle
    iconEle.className = 'bx bx-star'; // Example initialization
    iconEle.style.color = "black";
    stars.appendChild(iconEle);
  }
  const commentContainer = document.createElement('div');
  commentContainer.className = 'comment-container';
  commentContainer.appendChild(stars);

  const newOpinion = document.createElement('div');
  newOpinion.className = 'opinions';
      // adjuct evaluate

    // Get current date and time
    const currentdate = new Date();
    const monthname = currentdate.toLocaleString("en", { month: "long" });
    const daynumber = currentdate.getDate();
    const yearnumber = currentdate.getFullYear();
    let hours = currentdate.getHours();
    let minuts = currentdate.getMinutes();
    let daynight = "Am";
    if (hours > 12) {
      hours = hours - 12;
      daynight = "pm";
    }
    minuts = minuts < 10 ? Number("0" + minuts) : minuts;

    // Create multiple elements
    

    const imgName = document.createElement('div');
    imgName.className = 'img-name';
    
    
    const img = document.createElement('img');
    img.src = '/img/username.jpg';
    
    const inputName = document.querySelector(".input-name") as HTMLInputElement;
    const paragraph = document.createElement('p');
    paragraph.innerText = inputName?.value || '';

    const comment = document.createElement('p');
    comment.className = 'comment';
    const textarea = document.querySelector("textarea") as HTMLTextAreaElement;
    comment.innerText = textarea?.value || '';

    const date = document.createElement('p');
    date.className = 'date';
    date.innerText = `${monthname} ${daynumber}. ${yearnumber} at ${hours}:${minuts} ${daynight}`;
    
      // Apply _ngcontent-* attribute to all created elements


      // const iconEle = document.createElement('i'); // Declare and initialize iconEle
      // iconEle.className = 'bx bx-star'; // Example initialization

      this.applyNgContentAttribute(existingElement as HTMLElement, [
        newOpinion,
        imgName,
        img,
        paragraph,
        commentContainer,
        comment,
        date,
        stars,
        // iconEle,
      ]);
    
      // Append elements to the DOM
      imgName.appendChild(img);
      imgName.appendChild(paragraph);
      newOpinion.appendChild(imgName);
      commentContainer.appendChild(comment);
      commentContainer.appendChild(date);
      // commentContainer.appendChild(stars);
      newOpinion.appendChild(commentContainer);
    
      const reviewsEl = document.querySelector('.reviews-content'); // Replace with your container class
      if (reviewsEl) {
        reviewsEl.appendChild(newOpinion);
      }
    }

  }

