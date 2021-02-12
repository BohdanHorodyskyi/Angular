import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEvent } from '../interface/event.interface';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private url: string;
  constructor(private http: HttpClient) { 
    this.url = 'http://localhost:3000/events'
  }
  addEvent(event: IEvent): Observable<IEvent[]>{
    return this.http.post<IEvent[]>(this.url, event);
  }
   getEvent(): Observable<Array<IEvent>>{
    return this.http.get<Array<IEvent>>(this.url);
   }

   updateEvent(event: IEvent): Observable<IEvent>{
     return this.http.put< IEvent>(`${this.url}/${event.id}`, event);
   }
   deleteEvent(id: number): Observable<IEvent[]>{
    return this.http.delete<IEvent[]>(`${this.url}/${id}`);
  }
  getOneEvent(id: number): Observable<IEvent> {
    return this.http.get<IEvent>(`${this.url}/${id}`);
  }
}
