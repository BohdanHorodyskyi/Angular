import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { IStory } from 'src/app/shared/interface/story.interface';
import { Story } from 'src/app/shared/models/story.model';
import { StoryService } from 'src/app/shared/services/story.service';

@Component({
  selector: 'app-admin-story',
  templateUrl: './admin-story.component.html',
  styleUrls: ['./admin-story.component.scss']
})
export class AdminStoryComponent implements OnInit {
  stories: Array<IStory> = [];
  adminStories: Array<IStory> = [];
  sID = 1;
  sTitle: string;
  sDate: string;
  sImage: string;
  imageStatus: boolean;
  uploadProgress: Observable<number>;
  modalRef: BsModalRef;
  editStatus = false;
  constructor(private sService: StoryService, private modalService: BsModalService, private afStorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.getAdminStory()
  }
  private getAdminStory(): void {
    this.sService.getStory().subscribe(data => {
      this.adminStories = data;
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
        this.sImage = url;
        this.imageStatus = true;
      });
    });
  }
  deleteImage(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }
  confirmImage(): void {
    this.afStorage.storage.refFromURL(this.sImage).delete();
    this.modalRef.hide();
    this.imageStatus = false;
  }
  declineImage(): void {
    this.modalRef.hide();
  }
  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }
  addStory(): void {
    const newS = new Story(this.sID,
      this.sTitle,
      this.sDate,
      this.sImage);
    if (!this.editStatus) {
      delete newS.id;
      this.modalRef.hide();
      this.sService.addStory(newS).subscribe(() => {
        this.getAdminStory();
      });
    }
    else {
      this.sService.updateStory(newS).subscribe(() => {
        this.getAdminStory();
      });
      this.editStatus = false;
    }
    this.resetForm();
  }
  private resetForm(): void {
    this.sID = 1;
    this.sTitle = '';
    this.sDate = '';
    this.sImage = '';
  }
  editStory(template: TemplateRef<any>, story: IStory): void {
    this.modalRef = this.modalService.show(template);
    this.sID = story.id;
    this.sTitle = story.title;
    this.sDate = story.date;
    this.sImage = story.image;
    this.imageStatus = true;
    this.editStatus = true;
  }

  deleteStory(story: IStory): void {
    if (confirm('Are you sure')) {
      this.sService.deleteStory(story.id).subscribe(() => {
        this.getAdminStory();
      });
      this.afStorage.storage.refFromURL(story.image).delete();
    }
  }
}
