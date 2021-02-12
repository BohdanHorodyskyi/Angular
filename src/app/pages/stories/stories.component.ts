import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IStory } from 'src/app/shared/interface/story.interface';
import { StoryService } from 'src/app/shared/services/story.service';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit{
  modalRef: BsModalRef;
  stories: Array<IStory> = [];
  constructor(private sService: StoryService, private modalService: BsModalService, private actRoute: ActivatedRoute,) { }
  
  ngOnInit(): void {
    this.getUserStory()
  }
  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }
  private getUserStory(): void{
    this.sService.getStory().subscribe(data => {
      this.stories = data;
    })
  }

}
