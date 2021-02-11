import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { Donate } from 'src/app/shared/models/donate.model';
import { IDonate } from 'src/app/shared/interface/donate.interface';
import { DonateService } from 'src/app/shared/services/donate.service';
import { HelpingService } from 'src/app/shared/services/helping.service';
import { IHelping } from 'src/app/shared/interface/helping.interface';

@Component({
  selector: 'app-helping',
  templateUrl: './helping.component.html',
  styleUrls: ['./helping.component.scss']
})
export class HelpingComponent implements OnInit {
  modalRef: BsModalRef;
  donates: Array<IDonate> = [];
  helpings: Array<IHelping> = []
  donateID = 1;
  userEmail: string;
  userAmount: number;
  userAmount120 = 120;
  userAmount240 = 240;
  userAmount550 = 550;
  userAmount1200 = 1200;
  userAmount2400 = 2400;
  userAmount3200 = 3200;
  constructor(private modalService: BsModalService, private donatesService: DonateService, private HService: HelpingService) {
    
   }

  ngOnInit(): void {
    this.getUserHelping();
  }
  private getUserHelping(): void{
    this.HService.getHelping().subscribe(data => {
      this.helpings = data;
    })
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

