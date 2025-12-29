import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-category',
  imports:[CommonModule,FormsModule],
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent {
  categoryObj: any = {
    "categoryId": 0,
    "categoryName": "",
     "parentCategoryId": 0
  };

  constructor(private categoryService: ProductService) {}

  // onCreateCategory() {
  //   this.categoryService.createCategory(this.categoryObj).subscribe(
  //     (res: any) => {
  //       if (res.result) {
  //         alert('Category created successfully!');
  //         this.categoryObj = { categoryName: ''}; 
  //       } else {
  //         alert('Failed to create category: ' + res.message);
  //       }
  //     },
  //     (error) => {
  //       console.error('Error:', error);
  //       alert('An error occurred while creating the category.');
  //     }
  //   );
  // }
}