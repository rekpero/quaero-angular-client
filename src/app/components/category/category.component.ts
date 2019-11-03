import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/apiservice.service';
import { ISubCategory } from 'src/app/models/subcategory';
import { ICategory } from 'src/app/models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  category: ICategory;
  categoryName: string;
  categoryType: string;
  categoryDesc: string;
  subcategories: ISubCategory[];

  // tslint:disable-next-line: variable-name
  constructor(private _route: ActivatedRoute, private _apiService: ApiService, private _router: Router) { }

  ngOnInit() {
    this._apiService.getCategory(+this._route.snapshot.paramMap.get('id')).subscribe((category: ICategory) => {
      this.category = category;
      this.categoryName = category.name;
      this.categoryType = category.type;
      this.categoryDesc = category.description;
      console.log(category);
    });
    this._apiService.getSubCategoriesByCategoryId(+this._route.snapshot.paramMap.get('id')).subscribe((subcategories: ISubCategory[]) => {
      this.subcategories = subcategories;
      console.log(subcategories);
    });
  }

  deleteSubCategory = (id) => {
    const subcategory: ISubCategory = this.subcategories.filter(sub => sub.id === id)[0];
    if (confirm('Do you want to delete ' + subcategory.name)) {
      this._apiService.deleteSubCategoryOfCategory(id, this.category.id).subscribe(() => {
        this.ngOnInit();
      });
    }
  }

  deleteCategory = () => {
    if (confirm('Do you want to delete ' + this.category.name)) {
      this._apiService.deleteCategory(this.category.id).subscribe((category: ICategory) => {
        console.log(category);
        this._router.navigate(['/categories']);
      });
    }
  }

  updateUI = (event) => {
    // console.log('category UI update');
    this.ngOnInit();
  }

}
