import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageByUserComponent } from '../app/components/messages/message-by-user/message-by-user.component';

describe('MessageByUserComponent', () => {
  let component: MessageByUserComponent;
  let fixture: ComponentFixture<MessageByUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageByUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
