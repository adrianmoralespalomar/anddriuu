import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, NgZone, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FloatingWindow, FloatingWindowService } from '../../../services/floating-window.service';
import { SafePipe } from '../../../shared/pipes/safe.pipe';

@Component({
  selector: 'app-floating-window',
  standalone: true,
  imports: [CommonModule, SafePipe],
  templateUrl: './floating-window.component.html',
  styleUrl: './floating-window.component.css',
})
export class FloatingWindowComponent implements OnInit, OnDestroy {
  @Input() window!: FloatingWindow;

  isDragging = false;
  isResizing = false;

  // Drag state
  private dragStartX = 0;
  private dragStartY = 0;
  private dragInitialTranslateX = 0;
  private dragInitialTranslateY = 0;

  // Resize state
  resizeStart = { x: 0, y: 0, width: 0, height: 0 };
  currentResizeWidth = 0;
  currentResizeHeight = 0;

  // Current position
  translateX = 0;
  translateY = 0;

  private mouseMoveListener: ((e: MouseEvent) => void) | null = null;
  private mouseUpListener: ((e: MouseEvent) => void) | null = null;

  constructor(
    private floatingWindowService: FloatingWindowService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private ngZone: NgZone,
  ) {}

  ngOnInit(): void {
    this.updateWindowStyle();
  }

  ngOnDestroy(): void {
    this.removeListeners();
  }

  private removeListeners(): void {
    if (this.mouseMoveListener) {
      document.removeEventListener('mousemove', this.mouseMoveListener, true);
      this.mouseMoveListener = null;
    }
    if (this.mouseUpListener) {
      document.removeEventListener('mouseup', this.mouseUpListener, true);
      this.mouseUpListener = null;
    }
  }

  private addListeners(): void {
    this.removeListeners();

    this.mouseMoveListener = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (this.isDragging) {
        const deltaX = event.clientX - this.dragStartX;
        const deltaY = event.clientY - this.dragStartY;
        this.translateX = this.dragInitialTranslateX + deltaX;
        this.translateY = this.dragInitialTranslateY + deltaY;
        this.applyTransform();
      } else if (this.isResizing) {
        const deltaX = event.clientX - this.resizeStart.x;
        const deltaY = event.clientY - this.resizeStart.y;
        this.currentResizeWidth = Math.max(300, this.resizeStart.width + deltaX);
        this.currentResizeHeight = Math.max(200, this.resizeStart.height + deltaY);
        this.applyResizeVisual();
      }
    };

    this.mouseUpListener = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();

      this.isDragging = false;
      this.isResizing = false;
      this.removeListeners();
    };

    this.ngZone.runOutsideAngular(() => {
      document.addEventListener('mousemove', this.mouseMoveListener as EventListener, true);
      document.addEventListener('mouseup', this.mouseUpListener as EventListener, true);
    });
  }

  private applyTransform(): void {
    const element = this.elementRef.nativeElement.querySelector('.floating-window');
    if (element) {
      this.renderer.setStyle(element, 'transform', `translate(${this.translateX}px, ${this.translateY}px)`);
    }
  }

  private applyResizeVisual(): void {
    const element = this.elementRef.nativeElement.querySelector('.floating-window');
    if (element) {
      this.renderer.setStyle(element, 'width', `${this.currentResizeWidth}px`);
      this.renderer.setStyle(element, 'height', `${this.currentResizeHeight}px`);
    }
  }

  updateWindowStyle(): void {
    const element = this.elementRef.nativeElement.querySelector('.floating-window');
    if (element) {
      this.renderer.setStyle(element, 'width', `${this.window.width}px`);
      this.renderer.setStyle(element, 'height', `${this.window.height}px`);
      this.renderer.setStyle(element, 'top', `${this.window.top}px`);
      this.renderer.setStyle(element, 'left', `${this.window.left}px`);
      this.renderer.setStyle(element, 'transform', 'translate(0, 0)');
      this.translateX = 0;
      this.translateY = 0;
    }
  }

  onMouseDownHeader(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;

    // Guardar la posición inicial del ratón
    this.dragStartX = event.clientX;
    this.dragStartY = event.clientY;

    // Guardar el translate actual como base
    this.dragInitialTranslateX = this.translateX;
    this.dragInitialTranslateY = this.translateY;

    this.addListeners();
  }

  onMouseDownResize(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isResizing = true;
    const element = this.elementRef.nativeElement.querySelector('.floating-window');
    const rect = element.getBoundingClientRect();
    this.resizeStart = {
      x: event.clientX,
      y: event.clientY,
      width: rect.width,
      height: rect.height,
    };
    this.currentResizeWidth = rect.width;
    this.currentResizeHeight = rect.height;
    this.addListeners();
  }

  closeWindow(): void {
    this.isDragging = false;
    this.isResizing = false;
    this.removeListeners();
    this.floatingWindowService.closeWindow(this.window.id);
  }
}
