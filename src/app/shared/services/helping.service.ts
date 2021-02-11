import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IHelping } from '../interface/helping.interface';

@Injectable({
  providedIn: 'root'
})
export class HelpingService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/helping'
  }

  addHelping(helping: IHelping): Observable<IHelping[]>{
    return this.http.post<IHelping[]>(this.url, helping);
  }
   getHelping(): Observable<Array<IHelping>>{
    return this.http.get<Array<IHelping>>(this.url);
   }

   updateHelping(helping: IHelping): Observable<IHelping>{
     return this.http.put<IHelping>(`${this.url}/${helping.id}`, helping);
   }
   deleteHelping(id: number): Observable<IHelping[]>{
    return this.http.delete<IHelping[]>(`${this.url}/${id}`);
  }
  getOneHelping(id: number): Observable<IHelping> {
    return this.http.get<IHelping>(`${this.url}/${id}`);
  }
}
