// src/app/components/hero-section/hero-section.component.ts
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { TypedTextComponent } from '../typed-text/typed-text.component';
import { FloatingElementsComponent } from '../floating-elements/floating-elements.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule,TypedTextComponent,FloatingElementsComponent],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1200ms 300ms ease-out', style({ opacity: 1 })),
      ]),
    ]),
    trigger('pulse', [
      state('normal', style({ transform: 'scale(1)' })),
      state('pulsed', style({ transform: 'scale(1.05)' })),
      transition('normal <=> pulsed', animate('1500ms ease-in-out')),
    ]),
    trigger('float', [
      state('up', style({ transform: 'translateY(-10px)' })),
      state('down', style({ transform: 'translateY(10px)' })),
      transition('up <=> down', animate('3000ms ease-in-out')),
    ]),
  ],
})
export class HeroSectionComponent implements OnInit, AfterViewInit {
  @ViewChild('heroCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('heroSection') heroSectionRef!: ElementRef;
  shouldType = true; // will be passed to <app-typed-text>

  
  pulseState = 'normal';
  floatState = 'up';
  isVisible = false;
  
  // Text that will be typed
 typingTexts = [
  'Modern Web Solutions',
  'Unique Online Presence',
  'Top-Class Interfaces'
];

  
  constructor() {}
  
  ngOnInit(): void {
    // Start animation states
    setInterval(() => {
      this.pulseState = this.pulseState === 'normal' ? 'pulsed' : 'normal';
    }, 1500);
    
    setInterval(() => {
      this.floatState = this.floatState === 'up' ? 'down' : 'up';
    }, 3000);
    
    // Set visible after a short delay
    setTimeout(() => {
      this.isVisible = true;
    }, 100);
  }
  
  ngAfterViewInit(): void {
  this.initCanvas();

  const observer = new IntersectionObserver(
    ([entry]) => {
      const isMobile = window.innerWidth < 1024;
      this.shouldType = isMobile ? entry.isIntersecting : true;
    },
    { threshold: 0.1 }
  );

  if (this.heroSectionRef?.nativeElement) {
    observer.observe(this.heroSectionRef.nativeElement);
  }
}

  
 private initCanvas(): void {
  const canvas = this.canvasRef.nativeElement;
  const ctx = canvas.getContext('2d')!;

  // Set canvas size
  const setCanvasSize = () => {
    canvas.width = window.innerWidth;
    canvas.height = this.heroSectionRef.nativeElement.offsetHeight;
  };

  setCanvasSize();
  window.addEventListener('resize', setCanvasSize);

  // Wave properties
  const waves = {
    count: 5,
    y: canvas.height - 250, // Raise base Y
    length: 0.008,
    amplitude: 40,
    frequency: 0.01,
  };

  const colors = [
    'rgba(255, 227, 61, 0.25)',
    'rgba(255, 200, 0, 0.22)',
    'rgba(255, 165, 0, 0.2)',
    'rgba(200, 200, 200, 0.12)',
    'rgba(100, 100, 100, 0.08)',
  ];

  let angle = 0;

  const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < waves.count; i++) {
      ctx.beginPath();

      const baseY = waves.y - i * 10; // Slight offset per wave
      ctx.moveTo(0, baseY);

      for (let x = 0; x <= canvas.width; x++) {
        const y =
          Math.sin(x * waves.length + angle + i * Math.PI / 2) *
            waves.amplitude *
            (1 - 0.1 * i) +
          baseY;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();

      // ✅ Gradient fade: top solid, bottom transparent
      const gradient = ctx.createLinearGradient(0, baseY - 100, 0, canvas.height);
      gradient.addColorStop(0, colors[i]);
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    angle += waves.frequency;
  };

  animate();
}

  
  // 
  scrollDown(): void {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}