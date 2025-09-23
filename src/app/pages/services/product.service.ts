import { HttpClient } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { Constant } from './constant/constant';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  
  
  constructor(private http:HttpClient) {

  }
  public search = new BehaviorSubject<string>('')
  public cartaddsubject = new Subject<boolean>();
  public favoritsubject = new Subject<boolean>();


  // getAllproducts():Observable<any[]>{
  //   return  this.http.get<any[]>('/api/amazon/GetAllProducts')
  // }
  createCategory(category: any): Observable<any> {
    return this.http.post(`${Constant.API_END_POINT}${Constant.CHILDREN.CREATE_CATEGORY}`, category);
  }
  getAllproducts(){
    return  this.http.get(Constant.API_END_POINT+Constant.CHILDREN.GET_PRODUCTS)
  }
  getAllcategory(){
    return  this.http.get(Constant.API_END_POINT+Constant.CHILDREN.GET_CATEGORY)
  }
  getproductsbyid(id:number){
    return  this.http.get(Constant.API_END_POINT+Constant.CHILDREN.GET_CATEGORYBYID + id)
  }
  addtocart(obj:any){
    return  this.http.post(Constant.API_END_POINT+Constant.CHILDREN.ADD_TOCART,obj)
  }
  // customarid(custid:number){
  //   return  this.http.get(Constant.API_END_POINT+Constant.CHILDREN.CUSTMID + custid)
  // }
  // deleteproductid(cartid:number):Observable<any[]>{
  //   return  this.http.get<any[]>('/api/amazon/DeleteProductFromCartById?id=' + cartid)
  // }
  // getproductbyid(productid:number):Observable<any>{
  //   return  this.http.get<any>('/api/amazon/GetProductById?id=' + productid)
  // }
  getproductbyid(proid:number){
    return  this.http.get(Constant.API_END_POINT+Constant.CHILDREN.GET_PRODUCTID+proid)
  }

  // makesale(obj:any):Observable<any>{
  //   return  this.http.post<any>('/api/amazon/AddNewSale',obj)  this is for make sale 
  // }
  wishListItem:any[]=[] 
  IsWishlist(product:any):boolean{
    return this.wishListItem.some(item => item.productId === product.productId)
  }

  additemtowsihlist(product:any):void{
    this.wishListItem.push(product)
    // alert('item added to the favorit')
  }

  removeitemfromwsihlist(product:any):void{
    const index=this.wishListItem.findIndex(item => item.productId == product.productId)
    if(index !== -1){
      this.wishListItem.splice(index,1)
      // alert('item remove from the favorit')
    }
  }

  cartitems:any[]=[]
  IsAddedToCart(product:any):boolean{
    return this.cartitems.some(item => item.productId === product.productId)
  }

  AddToCart(product:any):void{
    this.cartitems.push(product)
  }

  RemoveFromCart(product:any):void{
    const index = this.cartitems.findIndex(item => item.productId == product.productId)
    if(index !== -1){
      this.cartitems.splice(index,1)
    }
  }

// create products ==========================================

saveproduct(obj:any){
  return this.http.post(Constant.API_END_POINT+Constant.CHILDREN.CREATE_PRODUCT, obj);
}

updateproduct(obj:any){
  return this.http.post(Constant.API_END_POINT+Constant.CHILDREN.UPDATE_PRODUCT, obj);
}

deleteproduct(id:any){
  return this.http.get(Constant.API_END_POINT+Constant.CHILDREN.DELETE_PRODUCT + id);
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

updateQuantity(productId: number, quantity: number): void {
  const product = this.cartitems.find(item => item.id === productId);
  if (product) {
    product.quantity = quantity;
  }
  this.cartaddsubject.next(true); // Notify components
}
}

