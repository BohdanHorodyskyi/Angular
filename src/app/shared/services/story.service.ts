import { Injectable } from '@angular/core';
import { IStory } from '../interface/story.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Story } from '../models/story.model';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/stories'

   }
  addStory(story: IStory): Observable<IStory[]>{
    return this.http.post<IStory[]>(this.url, story);
  }
   getStory(): Observable<Array<IStory>>{
    return this.http.get<Array<IStory>>(this.url);
   }

   updateStory(story: IStory): Observable<IStory>{
     return this.http.put< IStory>(`${this.url}/${story.id}`, story);
   }
   deleteStory(id: number): Observable<IStory[]>{
    return this.http.delete<IStory[]>(`${this.url}/${id}`);
  }
  getOneStory(id: number): Observable<IStory> {
    return this.http.get<IStory>(`${this.url}/${id}`);
  }
}
