import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { SafePipe } from './safe.pipe';

describe('SafePipe', () => {
  let pipe: SafePipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SafePipe],
    });
    sanitizer = TestBed.inject(DomSanitizer);
    pipe = new SafePipe(sanitizer);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should bypass security for URLs', () => {
    const url = 'https://example.com';
    const result = pipe.transform(url);
    expect(result).toBeTruthy();
  });
});
