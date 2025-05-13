import { CommonModule } from '@angular/common';
import { Component, type ElementRef, type OnInit, type OnDestroy, ViewChild } from "@angular/core"
import { trigger, state, style, animate, transition, stagger, query, animateChild } from "@angular/animations"
import Aos from 'aos';


@Component({
  selector: 'app-into-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './into-section.component.html',
  styleUrl: './into-section.component.scss',
  animations: [
    trigger("fadeIn", [
      state("hidden", style({ opacity: 0, transform: "translateY(20px)" })),
      state("visible", style({ opacity: 1, transform: "translateY(0)" })),
      transition("hidden => visible", animate("500ms ease-out")),
    ]),
    trigger("scaleIn", [
      state("hidden", style({ opacity: 0, transform: "scale(0.8)" })),
      state("visible", style({ opacity: 1, transform: "scale(1)" })),
      transition("hidden => visible", animate("600ms ease-out")),
    ]),
    trigger("staggerList", [
      transition("* => *", [query("@fadeIn", stagger(200, animateChild()), { optional: true })]),
    ]),
  ],
})
export class IntoSectionComponent {
  projects = 0;
  brands = 0;
  websites = 0;
  team = 0;
  private hasAnimated = false;

  images = [
    'assets/sl1.png',
    'assets/sl2.png',
    'assets/sl3.png'
  ];
  currentImage = 0;

  ngOnInit(): void {
    Aos.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      delay: 100,
      offset: 120
    });

     this.setupIntersectionObserver()
  
  }

  animateCounters() {
    this.countUp('projects', 300);
    this.countUp('brands', 180);
    this.countUp('websites', 200);
    this.countUp('team', 100);
  }

  countUp(prop: 'projects' | 'brands' | 'websites' | 'team', target: number) {
    let count = 0;
    const interval = setInterval(() => {
      if (count >= target) {
        clearInterval(interval);
      } else {
        count++;
        this[prop] = count;
      }
    }, 20);
  }



   @ViewChild("sectionRef") sectionRef!: ElementRef

  isVisible = false
  observer: IntersectionObserver | null = null

 

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect()
    }
  }

setupIntersectionObserver() {
  this.observer = new IntersectionObserver(
    ([entry]) => {
      const isNowVisible = entry.isIntersecting;

      if (isNowVisible && !this.hasAnimated) {
        this.isVisible = true;
        this.hasAnimated = true; // ✅ Ensure counter runs only once
        this.animateCounters();
      }
    },
    { threshold: 0.3 }
  );

  setTimeout(() => {
    if (this.sectionRef && this.sectionRef.nativeElement) {
      this.observer?.observe(this.sectionRef.nativeElement);
    }
  });
}




}
