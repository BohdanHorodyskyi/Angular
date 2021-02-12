import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDonate } from '../interface/donate.interface';

@Injectable({
  providedIn: 'root'
})
export class DonateService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = "http://localhost:3000/donates"
   }
   addDonate(donate: IDonate): Observable<IDonate>{
    return this.http.post<IDonate>(this.url, donate);
   }
   getDonate(): Observable<Array<IDonate>>{
    return this.http.get<Array<IDonate>>(this.url);
   }
   updateDonate(donate: IDonate): Observable<IDonate>{
     return this.http.put<IDonate>(`${this.url}/${donate.id}`, donate);
   }
}
