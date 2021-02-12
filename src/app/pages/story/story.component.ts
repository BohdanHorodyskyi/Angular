import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IStory } from 'src/app/shared/interface/story.interface';
import { StoryService } from 'src/app/shared/services/story.service';
@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  story: IStory;
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private sService: StoryService, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getViewChild();
  }
  private getViewChild(): void{
    const id = +this.actRoute.snapshot.paramMap.get('id');
    this.sService.getOneStory(id).subscribe(data => {
      this.story = data;
      console.log(this.story);
    });
  }
  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

}
