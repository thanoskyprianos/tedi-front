import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMessagesComponent } from '../app/components/messages/user-messages/user-messages.component';

describe('UserMessagesComponent', () => {
  let component: UserMessagesComponent;
  let fixture: ComponentFixture<UserMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMessagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
