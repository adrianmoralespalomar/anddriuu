import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BackgroundService {
  public readonly backgrounImage = signal<string | null>(null);

  setBackgroundImage = (urlImage: string) => this.backgrounImage.set(urlImage);
}
