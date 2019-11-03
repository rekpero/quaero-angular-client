import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/apiservice.service';
import { ICategory } from 'src/app/models/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categories: ICategory[];
  // tslint:disable-next-line: variable-name
  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    this._apiService.getCategories().subscribe((categories: ICategory[]) => {
      this.categories = categories;
      console.log(categories);
    });
  }

  deleteCategory = (id) => {
    const category: ICategory = this.categories.filter(sub => sub.id === id)[0];
    if (confirm('Do you want to delete ' + category.name)) {
      this._apiService.deleteCategory(id).subscribe((cat: ICategory) => {
        console.log(cat);
        this.ngOnInit();
      });
    }
  }

  updateUI = (event) => {
    // console.log('UI update');
    this.ngOnInit();
  }
}
