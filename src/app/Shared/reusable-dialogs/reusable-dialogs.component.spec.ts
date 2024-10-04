import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableDialogsComponent } from './reusable-dialogs.component';

describe('ReusableDialogsComponent', () => {
  let component: ReusableDialogsComponent;
  let fixture: ComponentFixture<ReusableDialogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReusableDialogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReusableDialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
