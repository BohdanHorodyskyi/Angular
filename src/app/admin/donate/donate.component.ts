import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IDonate } from 'src/app/shared/interface/donate.interface';
import { DonateService } from 'src/app/shared/services/donate.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {
  adminDonates: Array<IDonate> = [];
  modalRef: BsModalRef;
  constructor(private donatesService: DonateService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getDonates();
  }
  private getDonates(): void {
    this.donatesService.getDonate().subscribe(
      data => {
        this.adminDonates = data;
      }
    );
  }
  openDetailsModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' });
  }
}

 
