import { HttpClient } from '@angular/common/http';
import {  Injectable } from '@angular/core';
// import { Constant } from './constant/constant';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

// json-server --watch D:\Others\Ahmed\angularecommerce\ecommerceapp\public\db.json --port 3000

interface products{
  id:number,
  productName:string,
  categoryName:string,
  productPrice:number,
  productDescription:string,
  productImageUrl:string,
}
interface productsItem {
  product:products[]
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  
  
  constructor(private http:HttpClient) {

  }
  public search = new BehaviorSubject<string>('')
  public cartaddsubject = new Subject<boolean>();
  public favoritsubject = new Subject<boolean>();

    private Savedproduct = ''




  private api = 'http://localhost:3000/products'

  // createCategory(category: any): Observable<any> {
  //   // return this.http.post(`${Constant.API_END_POINT}${Constant.CHILDREN.CREATE_CATEGORY}`, category);
  // }
  getAllproducts(){
    // return  this.http.get(Constant.API_END_POINT+Constant.CHILDREN.GET_PRODUCTS)
    return this.http.get<productsItem[]>(this.api)
  }
    getproductbyid(id:number):Observable<products>{
    return this.http.get<products>(`${this.api}/${id}`)
  }
  // getAllcategory(){
  //   // return  this.http.get(Constant.API_END_POINT+Constant.CHILDREN.GET_CATEGORY)
  // }
  // getproductsbyid(id:number){
  //   // return  this.http.get(Constant.API_END_POINT+Constant.CHILDREN.GET_CATEGORYBYID + id)
  //   return this.http.get<products>(`${this.api}/${id}`)
  // }
  // addtocart(obj:any){
  //   // return  this.http.post(Constant.API_END_POINT+Constant.CHILDREN.ADD_TOCART,obj)
  // }
  // customarid(custid:number){
  //   return  this.http.get(Constant.API_END_POINT+Constant.CHILDREN.CUSTMID + custid)
  // }
  // deleteid(cartid:number):Observable<any[]>{
  //   return  this.http.get<any[]>('/api/amazon/DeleteProductFromCartById?id=' + cartid)
  // }
  // getproductbyid(id:number):Observable<any>{
  //   return  this.http.get<any>('/api/amazon/GetProductById?id=' + id)
  // }


  // makesale(obj:any):Observable<any>{
  //   return  this.http.post<any>('/api/amazon/AddNewSale',obj)  this is for make sale 
  // }
  wishListItem:any[]=[] 
  IsWishlist(product:any):boolean{
    return this.wishListItem.some(item => item.id === product.id)
  }

  additemtowsihlist(product:any):void{
    this.wishListItem.push(product)
    // alert('item added to the favorit')
  }

  removeitemfromwsihlist(product:any):void{
    const index=this.wishListItem.findIndex(item => item.id == product.id)
    if(index !== -1){
      this.wishListItem.splice(index,1)
      // alert('item remove from the favorit')
    }
  }

  cartitems:any[]=[]
  IsAddedToCart(product:any):boolean{
    return this.cartitems.some(item => item.id === product.id)
  }

  AddToCart(product:any):void{
    this.cartitems.push(product)
  }

  RemoveFromCart(product:any):void{
    const index = this.cartitems.findIndex(item => item.id == product.id)
    if(index !== -1){
      this.cartitems.splice(index,1)
    }
  }

// create products ==========================================

saveproduct(obj:any){
  // return this.http.post(Constant.API_END_POINT+Constant.CHILDREN.CREATE_PRODUCT, obj);
}

updateproduct(obj:any){
  // return this.http.post(Constant.API_END_POINT+Constant.CHILDREN.UPDATE_PRODUCT, obj);
}

deleteproduct(id:any){
  // return this.http.get(Constant.API_END_POINT+Constant.CHILDREN.DELETE_PRODUCT + id);
}
// create products ==========================================

// to active shop when i click on shop now 
activeLink: string = ''; 

setActiveLink(link: string): void {
  this.activeLink = link;
}

getActiveLink(): string {
  return this.activeLink;
}
// to active shop when i click on shop now 
// toggletheme 
private isDarkMode = false;

setDarkMode(isDark: boolean): void {
  this.isDarkMode = isDark;
  localStorage.setItem('isDarkMode', JSON.stringify(isDark));
}

getDarkMode(): boolean {
  const savedTheme = localStorage.getItem('isDarkMode');
  return savedTheme ? JSON.parse(savedTheme) : this.isDarkMode;
}
// toggletheme 

// updatethequantity
  private cartItems: any[] = [];

  setCartItems(items: any[]): void {
    this.cartItems = items;
  }

  getCartItems(): any[] {
    return this.cartItems;
  }
// updatethequantity

// clearCart
clearCart(): void {
  this.cartitems = [];
}
// clearCart

updateQuantity(id: number, quantity: number): void {
  const product = this.cartitems.find(item => item.id === id);
  if (product) {
    product.quantity = quantity;
  }
  this.cartaddsubject.next(true); // Notify components
}
}

