 import { Component, ElementRef, ViewChild } from "@angular/core"
import { CommonModule } from "@angular/common"
import { trigger, transition, style, animate } from "@angular/animations"
import { ScrollAnimationDirective } from "../../directives/scroll-animation.directive"
import { ParallaxDirective } from "../../directives/parallax.directive"

interface Project {
  title: string
  category: string
  image: string
  type: "video" | "image"
}

@Component({
  selector: "app-work-section",
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective, ParallaxDirective],
  templateUrl: "./work-section.component.html",
  styleUrls: ["./work-section.component.scss"],
  animations: [
    trigger("fadeInUp", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(30px)" }),
        animate("800ms ease-out", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
    ]),
    trigger("fadeIn", [
      transition(":enter", [style({ opacity: 0 }), animate("1000ms ease-out", style({ opacity: 1 }))]),
    ]),
  ],
})
export class WorkSectionComponent {
 @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>;
  scrollInterval: any;
  rawProjects = [
    {
      title: 'Portfolio Website',
        description: 'Personal branding and resume showcase',
      company: 'John Doe',
      video:'assets/scroll-vid-01.mp4'
      // image: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"',
    },
    {
      title: 'SaaS Dashboard',
      description: 'Analytics and CRM system',
      company: 'DataX Solutions',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    },
    {
      title: 'Mobile App UI',
      description: 'User interface design for fitness app',
      company: 'FitTech',
      video: 'https://kzmpsrg0d7c74dibwdba.lite.vusercontent.net/placeholder.svg?height=300&width=500',
    },
    {
      title: 'E-Learning Portal',
      description: 'Education platform with live classes',
      company: 'OctaLearn',
      video: 'https://kzmpsrg0d7c74dibwdba.lite.vusercontent.net/placeholder.svg?height=300&width=500',
    },
    {
      title: 'Healthcare Booking',
      description: 'Appointment scheduling for doctors',
      company: 'MediTrack',
      video: 'assets/images/healthcare.jpg',
    },
     {
      title: 'Healthcare Booking',
      description: 'Appointment scheduling for doctors',
      company: 'MediTrack',
      video: 'assets/images/healthcare.jpg',
    },
     {
      title: 'Healthcare Booking',
      description: 'Appointment scheduling for doctors',
      company: 'MediTrack',
      video: 'assets/images/healthcare.jpg',
     }
  ];

  projects: any[] = [];

  ngAfterViewInit() {
    this.projects = [...this.rawProjects, ...this.rawProjects]; // duplicate for infinite scroll
    this.startAutoScroll();
  }

  scrollLeft() {
    this.carousel.nativeElement.scrollBy({ left: -350, behavior: 'smooth' });
  }

  scrollRight() {
    const carousel = this.carousel.nativeElement;
    carousel.scrollBy({ left: 350, behavior: 'smooth' });

    const maxScroll = carousel.scrollWidth / 2;
    if (carousel.scrollLeft >= maxScroll - carousel.clientWidth - 10) {
      setTimeout(() => {
        carousel.scrollTo({ left: 0, behavior: 'auto' });
      }, 500);
    }
  }

  startAutoScroll() {
    this.scrollInterval = setInterval(() => this.scrollRight(), 4000);
  }

  ngOnDestroy(): void {
    clearInterval(this.scrollInterval);
  }
}