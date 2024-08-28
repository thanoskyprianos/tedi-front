import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostWithCommentsComponent } from '../app/components/post-with-comments/post-with-comments.component';

describe('PostWithCommentsComponent', () => {
  let component: PostWithCommentsComponent;
  let fixture: ComponentFixture<PostWithCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostWithCommentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostWithCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
