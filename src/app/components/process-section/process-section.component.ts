// cosmic-process.component.ts
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener, Renderer2 } from '@angular/core';
import { trigger, transition, style, animate, query, stagger, state } from '@angular/animations';
import * as THREE from 'three';
import { CommonModule } from '@angular/common';

// Define interfaces for userData to fix type errors
interface OrbitalParticleUserData {
  type: string;
  centerSphere: THREE.Mesh;
  process: any;
}

interface ProcessNodeUserData {
  id: string;
  index: number;
}

// Define interfaces for userData to fix type errors
interface OrbitalParticleUserData {
  type: string;
  centerSphere: THREE.Mesh;
  process: any;
}

interface ProcessNodeUserData {
  id: string;
  index: number;
}

interface Integration {
  name: string;
  logo: string;
}

@Component({
  selector: 'app-process-section',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './process-section.component.html',
  styleUrls: ['./process-section.component.scss'],
 animations: [
    trigger('fadeScale', [
      state('inactive', style({
        opacity: 0.3,
        transform: 'scale(0.9)'
      })),
      state('active', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      transition('inactive => active', animate('400ms cubic-bezier(0.4, 0, 0.2, 1)')),
      transition('active => inactive', animate('300ms cubic-bezier(0.4, 0, 0.2, 1)'))
    ]),
    trigger('detailsPanel', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(30px)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('hidden => visible', animate('500ms cubic-bezier(0.4, 0, 0.2, 1)')),
      transition('visible => hidden', animate('300ms cubic-bezier(0.4, 0, 0.2, 1)'))
    ])
  ]
})
export class ProcessSectionComponent implements OnInit, AfterViewInit {
 currentIndex = 0;
  autoRotateInterval: any;
  logoAnimationTrigger = false;
  ngAfterViewInit(): void {
    
  }
  partners: Integration[] = [
    { 
      name: 'Yamaha', 
      logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f1-3qvUxYOvikiy0fwrPchuOqzwrHBLpN.png'
    },
    { 
      name: 'RØDE', 
      logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f2-CaTq4GplXM1rkvyu6DXOAOjiU5dawc.png'
    },
    { 
      name: 'Yaber', 
      logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f3-wVgbRh6rcMGQxH9ma8NyDcSBaqFSNY.png'
    },
    { 
      name: 'NEEWER', 
      logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f4-c5qvOGW9YQtAYXRzxqr8QHar9DAfyI.png'
    },
    { 
      name: 'Plum', 
      logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f5-DnDRnPqoD7uxqhwrxRCm7Iml92I1JV.png'
    },
    { 
      name: 'Marc Loire', 
      logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f6-r93bq0lYdKKoprmzOHN6tjiLafmLmC.png'
    },
    { 
      name: 'Urban Gabru', 
      logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f7-ZUZT59FIzaFFPT1UbyXvBOQRYtfWSC.png'
    },
    { 
      name: 'REDTIGER', 
      logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f8-L7ATvv7G1U8NGCIbhi69NHmetuCejY.png'
    },
    { 
      name: 'Ajanta Quartz', 
      logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f9-CJep0GnkhZsVHOhoeNeqj0MfRfDYkt.png'
    },
    { 
      name: 'USTRAA', 
      logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f10-n69ls7GoOW0gnqOfFTcBhPgIn1qglf.png'
    }
  ];
  
  get currentIntegration(): Integration {
    return this.partners[this.currentIndex];
  }
  
  constructor() {}

  ngOnInit(): void {
    this.startAutoRotate();
  }
  
  ngOnDestroy(): void {
    this.stopAutoRotate();
  }
  
  startAutoRotate(): void {
    this.autoRotateInterval = setInterval(() => {
      this.nextIntegration();
    }, 3000); // Change integration every 3 seconds
  }
  
  stopAutoRotate(): void {
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
    }
  }
  
  setCurrentIntegration(index: number): void {
    if (index === this.currentIndex) return;
    
    this.currentIndex = index;
    this.triggerLogoAnimation();
    this.stopAutoRotate(); // Stop auto-rotation when user manually selects
    this.startAutoRotate(); // Restart auto-rotation
  }
  
  setCurrentIntegrationByLogo(logo: Integration): void {
    const index = this.partners.findIndex(p => p.name === logo.name);
    if (index !== -1) {
      this.setCurrentIntegration(index);
    }
  }
  
  triggerLogoAnimation(): void {
    this.logoAnimationTrigger = true;
    setTimeout(() => {
      this.logoAnimationTrigger = false;
    }, 500);
  }
  
  nextIntegration(): void {
    const nextIndex = (this.currentIndex + 1) % this.partners.length;
    this.setCurrentIntegration(nextIndex);
  }
  
  prevIntegration(): void {
    const prevIndex = (this.currentIndex - 1 + this.partners.length) % this.partners.length;
    this.setCurrentIntegration(prevIndex);
  }
  
  // Get logos for the left side (5 logos)
  getLeftSideLogos(): Integration[] {
    const result: Integration[] = [];
    const totalLogos = this.partners.length;
    const visibleLogos = window.innerWidth < 768 ? 2 : 5; // Show fewer logos on mobile
    
    for (let i = 1; i <= visibleLogos; i++) {
      const index = (this.currentIndex - i + totalLogos) % totalLogos;
      result.push(this.partners[index]);
    }
    
    return result;
  }
  
  // Get logos for the right side (5 logos)
  getRightSideLogos(): Integration[] {
    const result: Integration[] = [];
    const totalLogos = this.partners.length;
    const visibleLogos = window.innerWidth < 768 ? 2 : 5; // Show fewer logos on mobile
    
    for (let i = 1; i <= visibleLogos; i++) {
      const index = (this.currentIndex + i) % totalLogos;
      result.push(this.partners[index]);
    }
    
    return result;
  }
}
