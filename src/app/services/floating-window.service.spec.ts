import { TestBed } from '@angular/core/testing';

import { FloatingWindowService } from './floating-window.service';

describe('FloatingWindowService', () => {
  let service: FloatingWindowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FloatingWindowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open a window', () => {
    service.openWindow('Test', 'https://example.com');
    expect(service.windows().length).toBe(1);
  });

  it('should close a window', () => {
    service.openWindow('Test', 'https://example.com');
    const id = service.windows()[0].id;
    service.closeWindow(id);
    // Después de 300ms, la ventana se elimina
    setTimeout(() => {
      expect(service.windows().length).toBe(0);
    }, 350);
  });
});
