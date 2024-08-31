import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeInterestCardComponent } from '../app/components/like-interest-card/like-interest-card.component';

describe('LikeInterestCardComponent', () => {
  let component: LikeInterestCardComponent;
  let fixture: ComponentFixture<LikeInterestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikeInterestCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikeInterestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
