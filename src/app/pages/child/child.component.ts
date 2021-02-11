import { Component, OnInit, TemplateRef } from '@angular/core';
import { IChild } from 'src/app/shared/interface/child.interface';
import { ChildService } from 'src/app/shared/services/child.service';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Donate } from 'src/app/shared/models/donate.model';
import { IDonate } from 'src/app/shared/interface/donate.interface';
import { DonateService } from 'src/app/shared/services/donate.service';
@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {
  child: IChild;
  modalRef: BsModalRef;
  donates: Array<IDonate> = [];
  donateID = 1;
  userEmail: string;
  userAmount: number;
  constructor(private modalService: BsModalService, private donatesService: DonateService, private chiService: ChildService, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getViewChild();
  }
  private getViewChild(): void{
    const id = +this.actRoute.snapshot.paramMap.get('id');
    this.chiService.getOneChild(id).subscribe(data => {
      this.child = data;
      console.log(this.child);
    });
  }
  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }
  addDonate(): void{
    const donate = new Donate(this.donateID, this.userEmail, this.userAmount);
    delete donate.id
    this.modalRef.hide();
    this.donatesService.addDonate(donate).subscribe(
      () => {
        this.resetDonate();
      }
    );
  }
  resetDonate(): void{
    this.donates = [];
  
  }
}
