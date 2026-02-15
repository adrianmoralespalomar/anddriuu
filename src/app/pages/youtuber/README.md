# Tech Review YouTuber Website

A modern, responsive website for a tech review YouTuber featuring multiple sections including hero, latest videos, about, and newsletter signup.

## Project Structure

```
youtuber/
├── components/
│   ├── hero-section/
│   │   ├── hero-section.component.ts
│   │   ├── hero-section.component.html
│   │   ├── hero-section.component.css
│   │   └── hero-section.component.spec.ts
│   ├── latest-videos/
│   │   ├── latest-videos.component.ts
│   │   ├── latest-videos.component.html
│   │   ├── latest-videos.component.css
│   │   └── latest-videos.component.spec.ts
│   ├── about-section/
│   │   ├── about-section.component.ts
│   │   ├── about-section.component.html
│   │   ├── about-section.component.css
│   │   └── about-section.component.spec.ts
│   └── newsletter/
│       ├── newsletter.component.ts
│       ├── newsletter.component.html
│       ├── newsletter.component.css
│       └── newsletter.component.spec.ts
├── services/
│   └── youtuber.service.ts
├── youtuber.component.ts
├── youtuber.component.html
├── youtuber.component.css
├── youtuber.component.spec.ts
└── README.md
```

## Features

### Hero Section

- Eye-catching gradient background with animated overlay
- Main headline and subtitle
- Call-to-action buttons (Subscribe & Watch Latest Video)
- Statistics display (Subscribers, Views, Reviews)
- Scroll indicator with animation

### Latest Videos

- Responsive grid layout (adapts from 1-4 columns)
- Video cards with thumbnail images
- Overlay with play button on hover
- Video metadata (views, date, duration)
- YouTube integration links

### About Section

- Personal introduction
- Key highlights with icons (Unbiased Reviews, Real Performance, Technical Knowledge, Expert Analysis)
- Subscribe CTA button
- Profile image placeholder

### Newsletter Signup

- Email input field with validation
- Subscribe button with loading state
- Success/error messages
- Privacy terms notice
- Feature highlights (Weekly reviews, Exclusive deals, Early access)

## Responsive Design

The website is fully responsive with breakpoints at:

- **Desktop**: 1024px+ (Full layout)
- **Tablet**: 768px - 1023px (Optimized for tablets)
- **Mobile**: Below 768px (Single column layout)
- **Small Mobile**: Below 480px (Minimal spacing)

All components adapt their font sizes, spacing, and layouts based on screen size.

## Color Scheme

- **Primary Background**: Dark gradient (#0f0f0f to #1a1a1a)
- **Accent Color**: Red (#ff6b6b)
- **Text Primary**: White (#fff)
- **Text Secondary**: Light gray (#aaa, #888)
- **Borders**: Semi-transparent white/red

## Animations

- Fade-in animations on scroll
- Hover effects on buttons and cards
- Smooth transitions
- Loading animations
- Bounce and pulse animations

## Usage

### Integrating the Component

Add the YouTuber component to your routing:

```typescript
import { YoutuberComponent } from "./pages/youtuber/youtuber.component";

// In your routing module or config
const routes = [{ path: "youtuber", component: YoutuberComponent }];
```

### Customization

#### Update Channel Information

Edit [services/youtuber.service.ts](services/youtuber.service.ts) to update:

- Video data
- Subscriber counts
- Channel statistics

#### Modify Colors

Update the CSS files to change the color scheme. Key color variables:

- Primary accent: `#ff6b6b`
- Text colors: `#fff`, `#aaa`, `#888`
- Backgrounds: `#0f0f0f`, `#1a1a1a`, `#2d2d2d`

#### Update YouTube Links

Replace YouTube links throughout components:

- Hero section: Subscribe and watch buttons
- Latest videos: Video ID lookup and YouTube channel link
- About section: Channel subscription link

### Newsletter Integration

The newsletter component currently simulates an API call. To integrate with a real backend:

1. Inject an HTTP service
2. Update the `onSubscribe()` method to call your API
3. Handle the response accordingly

Example:

```typescript
onSubscribe(): void {
  if (!this.email || !this.isValidEmail(this.email)) {
    this.errorMessage = 'Please enter a valid email address';
    return;
  }

  this.isLoading = true;
  this.emailService.subscribe(this.email).subscribe(
    () => {
      this.isSubscribed = true;
      this.isLoading = false;
      this.email = '';
    },
    (error) => {
      this.errorMessage = 'Subscription failed. Please try again.';
      this.isLoading = false;
    }
  );
}
```

## Performance Optimizations

- Standalone components for better tree-shaking
- Lazy loading ready
- CSS animations optimized for performance
- Efficient grid layouts
- Image placeholder optimization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Add video filtering/search
- Implement comment system
- Add social media integration
- Create blog section
- Add analytics tracking
- Implement video recommendations
