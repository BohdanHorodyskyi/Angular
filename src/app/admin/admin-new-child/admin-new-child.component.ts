import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { IChild } from 'src/app/shared/interface/child.interface';
import { Child } from 'src/app/shared/models/child.model';
import { ChildService } from 'src/app/shared/services/child.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, config } from 'rxjs';


@Component({
  selector: 'app-admin-new-child',
  templateUrl: './admin-new-child.component.html',
  styleUrls: ['./admin-new-child.component.scss']
})
export class AdminNewChildComponent implements OnInit{
  childs: Array<IChild> = [];
  adminChilds: Array<IChild> = [];
  childID = 1;
  childPlace: string;
  childName: string;
  childDescription: string;
  childImage: string;
  imageStatus: boolean;
  uploadProgress: Observable<number>;
  modalRef: BsModalRef;
  editStatus = false;
  constructor(private chiService: ChildService, private afStorage: AngularFireStorage, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getChilds();

  }
  private getChilds(): void {
    this.chiService.getJSONChild().subscribe(data => {
      this.adminChilds = data;
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
        this.childImage = url;
        this.imageStatus = true;
      });
    });
  }
  deleteImage(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }
  confirmImage(): void {
    this.afStorage.storage.refFromURL(this.childImage).delete();
    this.modalRef.hide();
    this.imageStatus = false;
  }
  declineImage(): void {
    this.modalRef.hide();
  }
  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }
  private resetForm(): void{
    this.childID = 1;
    this.childPlace = '';
    this.childName = '';
    this.childDescription = '';
    this.childImage = '';
  }
addChild(): void {
  const newC = new Child(this.childID,
    this.childPlace,
    this.childName,
    this.childDescription,
    this.childImage);
  if (!this.editStatus) {
    delete newC.id;
    this.modalRef.hide();
    this.chiService.postJSONChild(newC).subscribe(() => {
      this.getChilds();
    });
  }
  else {
    this.chiService.updateJSONChild(newC).subscribe(() => {
      this.getChilds();
    });
    this.editStatus = false;
  }
  this.resetForm();
}
editChild(template: TemplateRef<any>, child: IChild): void {
  this.modalRef = this.modalService.show(template);
  this.childID = child.id;
  this.childPlace = child.place;
  this.childName = child.name;
  this.childDescription = child.description;
  this.childImage = child.image;
  this.imageStatus = true;
  this.editStatus = true;
}

deleteChild(child: IChild): void {
  if (confirm('Are you sure')) {
    this.chiService.deleteJSONChild(child.id).subscribe(() => {
      this.getChilds();
    });
    this.afStorage.storage.refFromURL(child.image).delete();
  }
}


}
