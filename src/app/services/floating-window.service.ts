import { Injectable, signal } from '@angular/core';

export interface FloatingWindow {
  id: string;
  title: string;
  url: string;
  width: number;
  height: number;
  top: number;
  left: number;
  isOpen: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class FloatingWindowService {
  windows = signal<FloatingWindow[]>([]);
  private windowCounter = 0;

  openWindow(title: string, url: string): void {
    const id = `window-${this.windowCounter++}`;
    const newWindow: FloatingWindow = {
      id,
      title,
      url,
      width: 900,
      height: 600,
      top: 100,
      left: 100,
      isOpen: true,
    };
    this.windows.update((windows) => [...windows, newWindow]);
  }

  closeWindow(id: string): void {
    this.windows.update((windows) => windows.map((w) => (w.id === id ? { ...w, isOpen: false } : w)));
    // Eliminar después de la animación
    setTimeout(() => {
      this.windows.update((windows) => windows.filter((w) => w.id !== id));
    }, 300);
  }

  updateWindowPosition(id: string, top: number, left: number): void {
    this.windows.update((windows) => windows.map((w) => (w.id === id ? { ...w, top, left } : w)));
  }

  updateWindowSize(id: string, width: number, height: number): void {
    this.windows.update((windows) => windows.map((w) => (w.id === id ? { ...w, width, height } : w)));
  }
}
