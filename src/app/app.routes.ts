
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/website/home/home.component';
import { CartComponent } from './pages/website/cart/cart.component';
import { SaleComponent } from './pages/website/sale/sale.component';
import { CategoriesComponent } from './pages/website/categories/categories.component';
import { FevoritComponent } from './pages/website/fevorit/fevorit.component';
import { ProductDetailComponent } from './pages/website/product-detail/product-detail.component';
import { Shop1Component } from './pages/website/shop1/shop1.component';
import { Shop2Component } from './pages/website/shop2/shop2.component';
import { Shop3Component } from './pages/website/shop3/shop3.component';
import { Shop4Component } from './pages/website/shop4/shop4.component';
import { LoginComponent } from './login/login.component';
import { CreateProductsComponent } from './pages/admin/create-products/create-products.component';
import { LayoutComponent } from './pages/admin/layout/layout.component';
import { CreateCategoryComponent } from './pages/admin/create-category/create-category.component';
import { Shop5Component } from './pages/website/shop5/shop5.component';
import { MyAccountComponent } from './pages/website/my-account/my-account.component'; // Ensure this file exists at the specified path
import { WebsiteLandingComponent } from './pages/website/website-landing/website-landing.component';
import {  ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CheckoutComponent } from './pages/website/checkout/checkout.component';
import { SignComponent } from './pages/website/sign/sign.component';
import { authGuard } from './pages/auth/auth.guard';
export const routes: Routes = [

    {
        path:'',
        redirectTo:'products',
        pathMatch:'full',
        // component:LoginComponent
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'forgot-password',
        component:ForgotPasswordComponent
    },
    {
        path:'',
        component:WebsiteLandingComponent,
        children:[
            {
                path:'products',
                component:HomeComponent
            },
            {
                path:'cart',
                component:CartComponent
            },
            {
                path:'fevorit',
                component:FevoritComponent
            },
            {
                path:'sale',
                component:SaleComponent
            },
            {
                path:'categories/:id',
                component:CategoriesComponent
            },
            {
                path:'search/:keyword',
                component:HomeComponent
            },
            {
                path:'product-detail/:id',
                component:ProductDetailComponent
            },
            {
                path:'shop1',
                component:Shop1Component
            },
            {
                path:'shop2',
                component:Shop2Component
            },
            {
                path:'shop3',
                component:Shop3Component
            },
            {
                path:'shop4',
                component:Shop4Component
            },
            {
                path:'shop5',
                component:Shop5Component
            },
            {
                path:'my-account',
                component:MyAccountComponent
            },
            {
                path:'checkout',
                component:CheckoutComponent
            },
            // {
            //     path:'sign',
            //     component:SignComponent
            // },
            {
            path: 'sign',
            loadChildren: () => import('./sign/sign.module').then(m => m.SignModule)
            }
        ]
    },









      {
        path:'',
        component:LayoutComponent,
        children:[
          {
            path:'create-products',
            component:CreateProductsComponent,
          },
          {
             path: 'create-category',
            component: CreateCategoryComponent ,
          },
        ]
        }

];



