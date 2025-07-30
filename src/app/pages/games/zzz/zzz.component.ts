import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import gsap from 'gsap';
import { BackgroundService } from 'src/app/services/background.service';
@Component({
  selector: 'app-zzz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './zzz.component.html',
  styleUrls: ['./zzz.component.css'],
})
export class ZzzComponent implements OnInit {
  private readonly backgroundService = inject(BackgroundService);
  private readonly domSanitizer = inject(DomSanitizer);
  ngOnInit() {
    this.changeBackgroundImage();
  }

  changeBackgroundImage = (): void => this.backgroundService.setBackgroundImage('/assets/images/background_games.webp');

  protected items = ['Tiradas por Version', 'Historial Tiradas', 'Anddriuu UID', 'Últimos Videos', 'Showcase']; // Lista circular de elementos
  private centerIndex = 2; // Índice fijo donde debe aparecer el elemento "seleccionado" (el que se agranda visualmente)

  // Referencia a los elementos del DOM generados por *ngFor
  @ViewChildren('itemRef') itemRefs!: QueryList<ElementRef<HTMLSpanElement>>;

  ngAfterViewInit() {
    // Asegura que el elemento inicialmente en centerIndex esté visualmente en el centro
    this.alignInitialSelectedToCenter();

    // Cuando el DOM cambia (por ejemplo, después de hacer scroll o clic), vuelve a aplicar animaciones
    this.itemRefs.changes.subscribe(() => this.animateItems());

    // Primera animación al cargar el componente
    setTimeout(() => this.animateItems(), 0);
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    event.preventDefault(); // Evita el scroll por defecto

    // Detecta dirección del scroll (1 hacia abajo, -1 hacia arriba)
    const delta = Math.sign(event.deltaY);

    // Calcula el nuevo índice visual (dónde estaría el nuevo elemento central si no rotamos el array)
    const nextIndex = (this.centerIndex + delta + this.items.length) % this.items.length;

    // Busca en el array cuál es el valor real de ese elemento para centrarlo
    const realIndex = this.items.indexOf(this.items[nextIndex]);

    // Rota el array circularmente para colocar ese elemento en el centro visual
    this.rotateListToCenter(realIndex);
  }

  // Al hacer clic en un item, lo rota hasta colocarlo en el centro
  onItemClick(clickedItem: string) {
    const index = this.items.indexOf(clickedItem);
    this.rotateListToCenter(index);
  }

  // Alinea el array inicialmente para que el elemento que ya está en centerIndex quede en el centro visual
  alignInitialSelectedToCenter() {
    const selectedItem = this.items[this.centerIndex]; // Elemento inicial en el centro
    const index = this.items.indexOf(selectedItem); // Índice real en el array
    const steps = (index - this.centerIndex + this.items.length) % this.items.length;

    // Rota el array a la izquierda las veces necesarias para alinear el centro
    for (let i = 0; i < steps; i++) {
      this.items.push(this.items.shift()!);
    }
  }

  // Rota el array circularmente para colocar el elemento seleccionado en el centro
  rotateListToCenter(selectedIndex: number) {
    const steps = (selectedIndex - this.centerIndex + this.items.length) % this.items.length;

    for (let i = 0; i < steps; i++) {
      this.items.push(this.items.shift()!); // Rota el primer elemento al final
    }

    // Llama directamente a animaciones en caso de no usar itemRefs.changes
    this.animateItems();
  }

  // (No se usa en este código final, puede eliminarse si no se llama en ningún lado)
  rotateList(selectedIndex: number) {
    const steps = (selectedIndex - this.centerIndex + this.items.length) % this.items.length;

    for (let i = 0; i < steps; i++) {
      this.items.push(this.items.shift()!);
    }
  }

  // Aplica animaciones con GSAP para resaltar el elemento central
  animateItems() {
    this.itemRefs.forEach((el, i) => {
      const scale = i === this.centerIndex ? 1.5 : 1;
      const opacity = i === this.centerIndex ? 1 : 0.6;

      gsap.to(el.nativeElement, {
        scale,
        opacity,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  }

  // Ejecuta animaciones después del render inicial (puede eliminarse si no se usa externamente)
  highlightCenter() {
    setTimeout(() => this.animateItems(), 0); // Esperar al renderizado
  }

  getUrl(url: string) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
