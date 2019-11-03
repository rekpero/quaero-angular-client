import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { ICategory } from '../models/category';
import { ISubCategory } from '../models/subcategory';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  domain = 'quaero-loopback-server.herokuapp.com';
  // tslint:disable-next-line: variable-name
  constructor(private _http: HttpClient) {}

  public getCategories(): Observable<ICategory[]> {
    return this._http.get<ICategory[]>(`http://${this.domain}/api/Categories`);
  }

  public getCategory(id: number): Observable<ICategory> {
    return this._http.get<ICategory>(
      `http://${this.domain}/api/Categories/${id}`
    );
  }

  public getSubCategory(id: number): Observable<ISubCategory> {
    return this._http.get<ISubCategory>(
      `http://${this.domain}/api/Sub-categories/${id}`
    );
  }

  public getCategoryBySubCategory(id: number): Observable<ICategory> {
    return this._http.get<ICategory>(
      `http://${this.domain}/api/Sub-categories/${id}/category`
    );
  }

  public getSubCategoriesByCategoryId(id: number): Observable<ISubCategory[]> {
    return this._http.get<ISubCategory[]>(
      `http://${this.domain}/api/Categories/${id}/sub-categories`
    );
  }

  public postSubCategoriesByCategoryId(subcategory: any, id: number): Observable<ISubCategory> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `http://${this.domain}/api/Categories/${id}/sub-categories`;
    return this._http.post<ISubCategory>(url, subcategory, { headers }).pipe(
      tap(data =>
        console.log('Create Sub Category is successful ' + JSON.stringify(data))
      ),
      catchError(this.handleError)
    );
  }

  public registerUser(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `http://${this.domain}/api/Users`;
    return this._http.post<any>(url, user, { headers }).pipe(
      tap(data =>
        console.log('User Register is successfully ' + JSON.stringify(data))
      ),
      catchError(this.handleError)
    );
  }


  public loginUser(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `http://${this.domain}/api/Users/login`;
    return this._http.post<any>(url, user, { headers }).pipe(
      tap(data =>
        console.log('User Login is successfully ' + JSON.stringify(data))
      ),
      catchError(this.handleError)
    );
  }

  public putCategory(category: any): Observable<ICategory> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `http://${this.domain}/api/Categories`;
    return this._http.put<ICategory>(url, category, { headers }).pipe(
      tap(data =>
        console.log('Create Category is successful ' + JSON.stringify(data))
      ),
      catchError(this.handleError)
    );
  }

  public putSubCategory(subcategory: any): Observable<ISubCategory> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `http://${this.domain}/api/Sub-categories`;
    return this._http.put<ISubCategory>(url, subcategory, { headers }).pipe(
      tap(data =>
        console.log('Put Sub Category is successful ' + JSON.stringify(data))
      ),
      catchError(this.handleError)
    );
  }

  public deleteCategory(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `http://${this.domain}/api/Categories/${id}`;
    return this._http.delete<ICategory>(url, { headers })
    .pipe(
      tap(data => console.log('deleteCategory: ' + data)),
      catchError(this.handleError)
    );
  }


  public deleteSubCategory(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `http://${this.domain}/api/Sub-categories/${id}`;
    return this._http.delete<ICategory>(url, { headers })
    .pipe(
      tap(data => console.log('deleteCategory: ' + data)),
      catchError(this.handleError)
    );
  }

  public deleteSubCategoryOfCategory(subid: number, catid: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `http://${this.domain}/api/Categories/${catid}/sub-categories/${subid}`;
    return this._http.delete<ISubCategory>(url, { headers })
    .pipe(
      tap(data => console.log('deleteSubCategory: ' + subid)),
      catchError(this.handleError)
    );
  }

  private handleError(err: ErrorEvent) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.error.status}: ${err.error.body}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
