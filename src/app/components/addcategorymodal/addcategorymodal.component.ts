import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/apiservice.service';
import { ICategory } from 'src/app/models/category';

@Component({
  selector: 'app-addcategorymodal',
  templateUrl: './addcategorymodal.component.html',
  styleUrls: ['./addcategorymodal.component.scss']
})
export class AddcategorymodalComponent implements OnInit, OnChanges {


  @Input()
  category: ICategory;

  @Output()
  update: EventEmitter<{}> = new EventEmitter<{}>();

  categoryName: string;
  categoryDesc: string;
  categoryType: string;


  // tslint:disable-next-line: variable-name
  constructor(private _apiService: ApiService) { }

  ngOnInit() {
  }

  saveCategory = () => {
    // console.log(this.categoryName, this.categoryType, this.categoryDesc);
    if (this.category !== undefined) {
      this._apiService.putCategory(
        {id: this.category.id, name: this.categoryName, description: this.categoryDesc, type: this.categoryType}
      ).subscribe((category: ICategory) => {
        console.log(category);
        const closeModal: HTMLElement = document.getElementById('closeModal') as HTMLElement;
        closeModal.click();
        this.update.emit();
      });
    } else {
      this._apiService.putCategory(
        {name: this.categoryName, description: this.categoryDesc, type: this.categoryType}
      ).subscribe((category: ICategory) => {
        console.log(category);
        const closeModal: HTMLElement = document.getElementById('closeModal') as HTMLElement;
        closeModal.click();
        this.update.emit();
      });
    }

  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    if (this.category !== undefined) {
      this.categoryName = this.category.name;
      this.categoryDesc = this.category.description;
      this.categoryType = this.category.type;
    }
  }

}
