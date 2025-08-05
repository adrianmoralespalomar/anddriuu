import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output, type OnDestroy, type OnInit } from '@angular/core';
export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  data?: any;
}
@Component({
  selector: 'app-revolver-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-options.component.html',
  styleUrls: ['./game-options.component.css'],
})
export class GameOptionsComponent implements OnInit, OnDestroy {
  @Input() items: MenuItem[] = [
    { id: '1', label: 'Inicio', icon: '🏠' },
    { id: '2', label: 'Perfil', icon: '👤' },
    { id: '3', label: 'Configuración', icon: '⚙️' },
    { id: '4', label: 'Estadísticas', icon: '📊' },
    { id: '5', label: 'Contacto', icon: '📞' },
  ];

  @Output() itemSelected = new EventEmitter<{ item: MenuItem; index: number }>();
  @Output() itemChanged = new EventEmitter<{ item: MenuItem; index: number }>();

  currentActiveIndex = 2; // Elemento central seleccionado por defecto
  isAnimating = false;

  // Posiciones del arco del revólver
  positions = [
    { top: 50, left: 20 }, // Posición 0 - arriba izquierda
    { top: 120, left: 80 }, // Posición 1 - arriba centro
    { top: 200, left: 110 }, // Posición 2 - centro (activa)
    { top: 280, left: 80 }, // Posición 3 - abajo centro
    { top: 350, left: 20 }, // Posición 4 - abajo izquierda
  ];

  private itemPositions: number[] = [0, 1, 2, 3, 4];

  ngOnInit() {
    // Emitir el elemento inicial seleccionado
    this.emitCurrentItem();
  }

  ngOnDestroy() {
    // Cleanup si es necesario
  }

  @HostListener('window:wheel', ['$event'])
  onWheel(event: WheelEvent) {
    event.preventDefault();
    if (this.isAnimating) return;

    if (event.deltaY > 0) {
      this.rotateDown();
    } else {
      this.rotateUp();
    }
  }

  getItemPosition(itemIndex: number): number {
    return this.itemPositions[itemIndex];
  }

  getPaddingLeft(position: number): number {
    const paddings = [0, 20, 50, 20, 0];
    return paddings[position];
  }

  rotateUp() {
    this.animateMovement(-1);
  }

  rotateDown() {
    this.animateMovement(1);
  }

  selectItem(targetIndex: number) {
    if (targetIndex === this.currentActiveIndex || this.isAnimating) return;

    // Calcular la dirección más corta para llegar al centro
    const targetPosition = this.itemPositions[targetIndex];

    // Calcular cuántas posiciones necesitamos mover
    let steps = 2 - targetPosition; // 2 es la posición central

    // Ajustar para el movimiento circular
    if (steps > 2) steps -= 5;
    if (steps < -2) steps += 5;

    this.animateMovement(steps);
    this.itemSelected.emit({ item: this.items[targetIndex], index: targetIndex });
  }

  private animateMovement(direction: number) {
    if (this.isAnimating) return;

    this.isAnimating = true;

    // Crear efecto de partículas
    this.createParticles();

    // Actualizar posiciones
    this.itemPositions = this.itemPositions.map((pos) => {
      let newPos = (pos + direction + 5) % 5;
      if (newPos < 0) newPos += 5;
      return newPos;
    });

    // Encontrar el nuevo elemento activo
    this.currentActiveIndex = this.itemPositions.findIndex((pos) => pos === 2);

    setTimeout(() => {
      this.isAnimating = false;
      this.emitCurrentItem();
    }, 600);
  }

  private emitCurrentItem() {
    const currentItem = this.items[this.currentActiveIndex];
    this.itemChanged.emit({ item: currentItem, index: this.currentActiveIndex });
  }

  private createParticles() {
    // Implementación simplificada de partículas para Angular
    // En una implementación real, podrías usar una librería de animaciones
    console.log('Creating particles effect');
  }
}
