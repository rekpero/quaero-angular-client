import { Component, OnInit } from '@angular/core';
import { ISubCategory } from 'src/app/models/subcategory';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/apiservice.service';
import { ICategory } from 'src/app/models/category';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss']
})
export class SubcategoryComponent implements OnInit {
  subCategory: ISubCategory;
  subCategoryName: string;
  subCategoryType: string;
  subCategoryParentType: string;
  subCategoryDesc: string;

  category: ICategory;
  categoryName: string;
  categoryType: string;
  categoryDesc: string;

  // tslint:disable-next-line: variable-name
  constructor(private _route: ActivatedRoute, private _apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this._apiService
      .getSubCategory(+this._route.snapshot.paramMap.get('id'))
      .subscribe((subcategory: ISubCategory) => {
        this.subCategory = subcategory;
        this.subCategoryName = subcategory.name;
        this.subCategoryType = subcategory.type;
        this.subCategoryParentType = subcategory.parentType;
        this.subCategoryDesc = subcategory.description;
        console.log(subcategory);
      });
    this._apiService
      .getCategoryBySubCategory(+this._route.snapshot.paramMap.get('id'))
      .subscribe((category: ICategory) => {
        this.category = category;
        this.categoryName = category.name;
        this.categoryType = category.type;
        this.categoryDesc = category.description;
        console.log(category);
      });
  }

  deleteSubCategory = () => {
    this._apiService.deleteSubCategory(this.subCategory.id).subscribe(() => {
      this.navigateToCategory();
    });
  }

  navigateToCategory = () => {
    this.router.navigate(['/categories', this.category.id]);
  }

  updateUI = (event) => {
    this.ngOnInit();
  }
}
