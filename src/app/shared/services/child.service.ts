import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IChild } from '../interface/child.interface';

@Injectable({
  providedIn: 'root'
})
export class ChildService {
  private url: string;

  constructor(private http: HttpClient, private firecloud: AngularFirestore) { 
    this.url = 'http://localhost:3000/childs'
  }
  getJSONChild(): Observable<IChild[]>{
    return this.http.get<IChild[]>(this.url);
  }
  postJSONChild(child: IChild): Observable<IChild[]>{
    return this.http.post<IChild[]>(this.url, child);
  }
  deleteJSONChild(id: number): Observable<IChild[]>{
    return this.http.delete<IChild[]>(`${this.url}/${id}`);
  }
  getOneChild(id: number): Observable<IChild> {
    return this.http.get<IChild>(`${this.url}/${id}`);
  }
  updateJSONChild(product: IChild): Observable<IChild> {
    return this.http.put<IChild>(`${this.url}/${product.id}`, product);
  }

//   getFireCloudChild(): Observable<DocumentChangeAction<unknown>[]> {
//     return this.firecloud.collection('childs').snapshotChanges();
//   }
//   postFireCloudChild(child: IChild): Promise<DocumentReference>{
//     return this.firecloud.collection('childs').add(child);
//   }
//   deleteFireCloudChild(id: string): Promise<void> {
//     return this.firecloud.collection('childs').doc(id).delete();
//   }
//   updateFireCloudChild(child: IChild): Promise<void> {
//     return this.firecloud.collection('childs').doc(child.id.toString()).update(child);
//   }
//   getOneFireCloudChild(id: string): any {
//     return this.firecloud.collection('childs').doc(id).get();
//   }
}

