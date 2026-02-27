# Bento Grid - Anddriuu

Diseño moderno estilo **Bento Grid** para mostrar el contenido de Anddriuu de forma visualmente atractiva.

## 🎨 Diseño

La página utiliza un diseño **Bento Grid** inspirado en interfaces modernas, con tarjetas de diferentes tamaños distribuidas en un grid responsive.

### Componentes

#### 1. **Bento Hero** (Centro - Tarjeta Principal)

- Logo animado de Anddriuu con efectos de glow y flotación
- Nombre del creador dividido en colores temáticos (morado, cian, azul)
- Tags con los juegos principales
- **Ubicación**: Centro del grid (tarjeta más grande)

#### 2. **Bento Videos** (Lateral Derecho Superior)

- Lista de últimos 3 videos de YouTube
- Thumbnails clickeables con efecto hover
- Integración con `YoutubeService`
- Auto-scroll en caso de overflow
- **Ubicación**: Top right

#### 3. **Bento Social** (Lateral Izquierdo)

- Enlaces a todas las redes sociales:
  - YouTube
  - Twitter (X)
  - Discord
  - TikTok
  - Instagram
- Botones animados con iconos y colores personalizados por red
- **Ubicación**: Left side

#### 4. **Bento Stats** (Lateral Derecho Inferior)

- Estadísticas del canal:
  - Suscriptores (50K+)
  - Videos (500+)
  - Streams (200+)
- Iconos animados con pulso
- Trends/etiquetas de crecimiento
- **Ubicación**: Bottom right

#### 5. **Bento About** (Inferior Completo)

- Descripción breve de Anddriuu
- Highlights con iconos:
  - Gacha Gaming Expert
  - Data & Analytics
  - Entertainment
- **Ubicación**: Bottom

## 🚀 Acceso

La página está disponible en la ruta: **`/bento`**

```
http://localhost:4200/bento
```

## 🎨 Estilo Visual

### Paleta de Colores

- **Morado Principal**: `#b151f3` (Color característico de Anddriuu)
- **Cian/Azul Claro**: `#66c7ce`
- **Azul Oscuro**: `#163fcf`
- **Background**: Gradiente oscuro (`#0a0a0a` → `#1a1a2e` → `#16213e`)

### Efectos

- **Glassmorphism**: Todas las tarjetas tienen backdrop-filter y transparencias
- **Animaciones**:
  - Float en el logo
  - Pulse en iconos de stats
  - Color shift en el título
  - Glow animado alrededor del logo
- **Transiciones suaves**: Hover effects en todas las tarjetas
- **Responsive**: Grid adaptativo para móviles, tablets y desktop

## 📐 Grid Layout

### Desktop (>1400px)

```
[Social]  [      Hero      ]  [Videos]
[Social]  [      Hero      ]  [Stats ]
[Social]  [      Hero      ]  [Stats ]
[        About             ]  [Stats ]
```

### Tablet (768px - 1400px)

```
[Social] [Stats ]
[ Hero - Center ]
[    Videos     ]
[     About     ]
```

### Mobile (<768px)

```
[   Hero   ]
[ Videos   ]
[ Social   ]
[  Stats   ]
[  About   ]
```

## 🛠️ Stack Técnico

- **Angular 18.2**
- **Standalone Components**
- **Signals** para estado reactivo
- **OnPush Change Detection**
- **HttpClient** para integración con YouTube API
- **CSS Modules** con custom properties

## 📦 Estructura de Archivos

```
src/app/pages/another/
├── another.component.ts          # Componente principal
├── another.component.html        # Template con grid
├── another.component.css         # Estilos del grid
├── another.component.spec.ts     # Tests
└── components/
    ├── bento-hero/
    │   ├── bento-hero.component.ts
    │   ├── bento-hero.component.html
    │   └── bento-hero.component.css
    ├── bento-videos/
    │   ├── bento-videos.component.ts
    │   ├── bento-videos.component.html
    │   └── bento-videos.component.css
    ├── bento-social/
    │   ├── bento-social.component.ts
    │   ├── bento-social.component.html
    │   └── bento-social.component.css
    ├── bento-stats/
    │   ├── bento-stats.component.ts
    │   ├── bento-stats.component.html
    │   └── bento-stats.component.css
    └── bento-about/
        ├── bento-about.component.ts
        ├── bento-about.component.html
        └── bento-about.component.css
```

## 🔧 Mejoras Futuras

- [ ] Conectar con API real de Twitter para tweets
- [ ] Añadir contador de viewers en vivo de Twitch
- [ ] Implementar animación de entrada con GSAP
- [ ] Añadir más estadísticas dinámicas
- [ ] Modo claro/oscuro
- [ ] Personalización de colores por usuario
- [ ] Integración con Discord para mostrar presence

## 📝 Notas

- Los errores del lenguaje del servidor de Angular pueden aparecer inicialmente debido a caché. Se resolverán al reiniciar el servidor.
- Las estadísticas son placeholder y pueden actualizarse con datos reales de las APIs correspondientes.
- El diseño sigue las convenciones del proyecto y las instrucciones de `angular-component` y `frontend-design`.

---

**Creado**: Febrero 2026
**Versión**: 1.0.0
