import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'aesy-nav-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="timeline">
      <article class="timeline-item" *ngFor="let item of sections; let last = last">
        <div class="dot" [ngStyle]="{ 'background-color': item.color || '#888' }">
          <span *ngIf="item.icon" class="icon">{{ item.icon }}</span>
        </div>
        <div class="line" *ngIf="!last"></div>
        <span (click)="scrollTo(item.id)">{{ item.title }}</span>
      </article>
    </section>
  `,
  styleUrls: ['./nav-section.component.css'],
})
export class NavSectionComponent {
  @Input() sections: TimelineItem[] = [];

  scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

export interface TimelineItem {
  icon?: string; // nombre del icono o path (puedes usar FontAwesome, Material, SVG o emojis)
  title: string;
  id: string;
  color?: string; // color del punto/icono
}
