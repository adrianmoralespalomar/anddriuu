import { Component, computed, Input } from '@angular/core';

@Component({
  selector: 'aesy-svg',
  standalone: true,
  template: `
    <svg class="responsive-svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100">
      <use [attr.xlink:href]="imagePath()" width="100" height="100"></use>
    </svg>
  `,
  styles: [
    `
      .responsive-svg {
        width: 100%;
        height: auto;
        display: block;
        color: inherit;
      }
    `,
  ],
})
export class SvgComponent {
  protected imagesPath = 'assets/images/icons';
  @Input() iconName!: string;
  protected imagePath = computed(() => `${this.imagesPath}/${this.iconName}.svg`);
}
