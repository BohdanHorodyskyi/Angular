import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IEvent } from 'src/app/shared/interface/event.interface';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  modalRef: BsModalRef;
  events: Array<IEvent> = [];
  constructor(private modalService: BsModalService, private eService: EventService) { }

  ngOnInit(): void {
    this.getUserEvent();
  }
  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }
  private getUserEvent(): void{
    this.eService.getEvent().subscribe(data => {
      this.events = data;
    })
  }
}
