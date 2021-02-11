import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { IEvent } from 'src/app/shared/interface/event.interface';
import { EventService } from 'src/app/shared/services/event.service';
import {Event} from 'src/app/shared/models/event.model';

@Component({
  selector: 'app-admin-event',
  templateUrl: './admin-event.component.html',
  styleUrls: ['./admin-event.component.scss']
})
export class AdminEventComponent implements OnInit {
  imageStatus: boolean;
  uploadProgress: Observable<number>;
  modalRef: BsModalRef;
  editStatus = false;
  events: Array<IEvent> = [];
  adminEvents: Array<IEvent> = [];
  eID = 1;
  eTitle: string;
  eDate: string;
  eImage: string;
  constructor(private modalService: BsModalService, private afStorage: AngularFireStorage, private eService: EventService) { }

  ngOnInit(): void {
    this.getAdminEvent();
  }
  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }
  private getAdminEvent(): void {
    this.eService.getEvent().subscribe(data => {
      this.adminEvents = data;
    });
  }
  uploadFile(event): void {
    const file = event.target.files[0];
    const type = file.type.slice(file.type.indexOf('/') + 1);
    const name = file.name.slice(0, file.name.lastIndexOf('.')).toLowerCase();
    const filePath = `images/${name}.${type}`;
    const upload = this.afStorage.upload(filePath, file);
    this.uploadProgress = upload.percentageChanges();
    upload.then(image => {
      this.afStorage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.eImage = url;
        this.imageStatus = true;
      });
    });
  }
  deleteImage(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-md'});
  }
  confirmImage(): void {
    this.afStorage.storage.refFromURL(this.eImage).delete();
    this.modalRef.hide();
    this.imageStatus = false;
  }
  declineImage(): void {
    this.modalRef.hide();
  }
  addEvent(): void {
    const newE = new Event(this.eID, this.eTitle, this.eDate, this.eImage);
    if (!this.editStatus) {
          delete newE.id;
          this.modalRef.hide();
          this.eService.addEvent(newE).subscribe(() => {
            this.getAdminEvent();
          });
        }
        else {
          this.eService.updateEvent(newE).subscribe(() => {
            this.getAdminEvent();
          });
          this.editStatus = false;
        }
        this.resetForm();
  }
  private resetForm(): void {
    this.eID = 1;
    this.eTitle = '';
    this.eDate = '';
    this.eImage = '';
  }
  editEvent(template: TemplateRef<any>, event: IEvent): void {
    this.modalRef = this.modalService.show(template);
    this.eID = event.id;
    this.eTitle = event.title;
    this.eDate = event.date;
    this.eImage = event.image;
    this.imageStatus = true;
    this.editStatus = true;
  }

  deleteEvent(event: IEvent): void {
    if (confirm('Are you sure')) {
      this.eService.deleteEvent(event.id).subscribe(() => {
        this.getAdminEvent();
      });
      this.afStorage.storage.refFromURL(event.image).delete();
    }
  }
 
}
