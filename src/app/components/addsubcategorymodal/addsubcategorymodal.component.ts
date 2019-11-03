import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { ICategory } from 'src/app/models/category';
import { ApiService } from 'src/app/services/apiservice.service';
import { ISubCategory } from 'src/app/models/subcategory';

@Component({
  selector: 'app-addsubcategorymodal',
  templateUrl: './addsubcategorymodal.component.html',
  styleUrls: ['./addsubcategorymodal.component.scss']
})
export class AddsubcategorymodalComponent implements OnInit, OnChanges {
  @Input()
  category: ICategory;

  @Input()
  subcategory: ISubCategory;

  @Output()
  update: EventEmitter<{}> = new EventEmitter<{}>();

  subCategoryName: string;
  subCategoryDesc: string;
  subCategoryType: string;
  subCategoryParentType: string;

  // tslint:disable-next-line: variable-name
  constructor(private _apiService: ApiService) {}

  ngOnInit() {}

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    if (this.category !== undefined) {
      this.subCategoryParentType = this.category.type;
    }
    if (this.subcategory !== undefined) {
      this.subCategoryName = this.subcategory.name;
      this.subCategoryDesc = this.subcategory.description;
      this.subCategoryParentType = this.subcategory.parentType;
      this.subCategoryType = this.subcategory.type;
    }
  }

  saveSubCategory = () => {
    console.log(
      this.subCategoryName,
      this.subCategoryDesc,
      this.subCategoryType,
      this.subCategoryParentType
    );
    if (this.subcategory !== undefined) {
      this._apiService
        .putSubCategory({
          id: this.subcategory.id,
          name: this.subCategoryName,
          description: this.subCategoryDesc,
          parentType: this.subCategoryParentType,
          type: this.subCategoryType
        })
        .subscribe(() => {
          const closeModal: HTMLElement = document.getElementById(
            'closeModal1'
          ) as HTMLElement;
          closeModal.click();
          this.update.emit();
        });
    } else {
      this._apiService
        .postSubCategoriesByCategoryId(
          {
            name: this.subCategoryName,
            description: this.subCategoryDesc,
            parentType: this.subCategoryParentType,
            type: this.subCategoryType
          },
          this.category.id
        )
        .subscribe((subcategory: ISubCategory) => {
          console.log(subcategory);
          const closeModal: HTMLElement = document.getElementById(
            'closeModal1'
          ) as HTMLElement;
          closeModal.click();
          this.update.emit();
        });
    }
  }
}
