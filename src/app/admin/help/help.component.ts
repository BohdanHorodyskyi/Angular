import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, config } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { IHelping } from 'src/app/shared/interface/helping.interface';
import { HelpingService } from 'src/app/shared/services/helping.service';
import { Helping } from 'src/app/shared/models/hulping.model';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  helpings: Array<IHelping> = [];
  adminHelpings: Array<IHelping> = [];
  helpingID = 1;
  helpingDescription: string;
  helpingImage: string;
  helpingPlace: string;
  imageStatus: boolean;
  uploadProgress: Observable<number>;
  modalRef: BsModalRef;
  editStatus = false;
  constructor(private HService: HelpingService, private afStorage: AngularFireStorage, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getHelpings();
  }
  private getHelpings(): void {
    this.HService.getHelping().subscribe(data => {
      this.adminHelpings = data;
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
        this.helpingImage = url;
        this.imageStatus = true;
      });
    });
  }
  deleteImage(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }
  confirmImage(): void {
    this.afStorage.storage.refFromURL(this.helpingImage).delete();
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
    this.helpingID = 1;
    this.helpingDescription = '';
    this.helpingImage = '';
    this.helpingPlace = '';
  }
addHelping(): void {
  const newH = new Helping(this.helpingID,
    this.helpingDescription,
    this.helpingImage,
    this.helpingPlace);
  if (!this.editStatus) {
    delete newH.id;
    this.modalRef.hide();
    this.HService.addHelping(newH).subscribe(() => {
      this.getHelpings();
    });
  }
  else {
    this.HService.updateHelping(newH).subscribe(() => {
      this.getHelpings();
    });
    this.editStatus = false;
  }
  this.resetForm();
}
editHelping(template: TemplateRef<any>, helping: IHelping): void {
  this.modalRef = this.modalService.show(template);
  this.helpingID = helping.id;
  this.helpingDescription = helping.description;
  this.helpingImage = helping.image;
  this.helpingPlace = helping.place;
  this.imageStatus = true;
  this.editStatus = true;
}

deleteHelping(helping: IHelping): void {
  if (confirm('Are you sure')) {
    this.HService.deleteHelping(helping.id).subscribe(() => {
      this.getHelpings();
    });
    this.afStorage.storage.refFromURL(helping.image).delete();
  }
}
}
