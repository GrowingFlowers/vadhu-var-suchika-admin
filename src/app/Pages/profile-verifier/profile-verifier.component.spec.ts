import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileVerifierComponent } from './profile-verifier.component';

describe('ProfileVerifierComponent', () => {
  let component: ProfileVerifierComponent;
  let fixture: ComponentFixture<ProfileVerifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileVerifierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileVerifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
