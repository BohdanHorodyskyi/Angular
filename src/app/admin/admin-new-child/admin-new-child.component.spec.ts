import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewChildComponent } from './admin-new-child.component';

describe('AdminNewChildComponent', () => {
  let component: AdminNewChildComponent;
  let fixture: ComponentFixture<AdminNewChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNewChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
