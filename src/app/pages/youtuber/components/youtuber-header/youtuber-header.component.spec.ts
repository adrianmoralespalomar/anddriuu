import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YouTuberHeaderComponent } from './youtuber-header.component';

describe('YouTuberHeaderComponent', () => {
  let component: YouTuberHeaderComponent;
  let fixture: ComponentFixture<YouTuberHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YouTuberHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(YouTuberHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
