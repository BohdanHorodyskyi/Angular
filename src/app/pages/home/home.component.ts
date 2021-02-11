import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IChild } from 'src/app/shared/interface/child.interface';
import { ChildService } from 'src/app/shared/services/child.service';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  modalRef: BsModalRef;
  childs: Array<IChild> = [];
  constructor(private modalService: BsModalService, private chiService: ChildService, private actRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getChild();
  }
  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }
  private getChild(): void{
    this.chiService.getJSONChild().subscribe(data => {
      this.childs = data;
    })
  }
  
}
