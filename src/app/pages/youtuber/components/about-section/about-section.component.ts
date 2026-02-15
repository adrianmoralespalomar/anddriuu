import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.css',
})
export class AboutSectionComponent {
  highlights = [
    {
      icon: '�',
      title: 'Gachas en Profundidad',
      description: 'Análisis detallado de mecánicas, personajes y meta en Genshin, HSR y ZZZ',
    },
    {
      icon: '📊',
      title: 'Estadísticas Personales',
      description: 'Tracking de pulls, 50/50 perdidos, y datos en tiempo real durante streams',
    },
    {
      icon: '🎙️',
      title: 'Streams en Vivo',
      description: 'Contenido diario en Twitch con gameplay, reacciones y interacción con comunidad',
    },
    {
      icon: '🌟',
      title: 'Comunidad Activa',
      description: 'Discord y redes sociales para conectar con otros players y collectors',
    },
  ];
}
