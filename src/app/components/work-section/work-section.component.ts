import { Component, ElementRef, ViewChild, OnInit, AfterViewInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { trigger, transition, style, animate } from "@angular/animations";

interface Project {
  title: string;
  description: string;
  company: string;
  video?: string;
  category?: string;
}

interface Star {
  top: number;
  left: number;
  size: number;
  delay: number;
  opacity: number;
}

@Component({
  selector: "app-work-section",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./work-section.component.html",
  styleUrls: ["./work-section.component.scss"],
  animations: [
    trigger("fadeInUp", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(30px)" }),
        animate("800ms ease-out", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
    ])
  ],
})
export class WorkSectionComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>;
  scrollInterval: any;
  isPaused = false;
  stars: Star[] = [];

  rawProjects: Project[] = [
    {
      title: 'Portfolio Website',
      description: 'Personal branding and resume showcase',
      company: 'John Doe',
      video: 'assets/scroll-vid-01.mp4'
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
    }
  ];

  projects: Project[] = [];

  ngOnInit() {
    this.generateStars();
  }

  ngAfterViewInit() {
    this.projects = [...this.rawProjects, ...this.rawProjects]; // Duplicate for looping
    this.startAutoScroll();
  }

  ngOnDestroy() {
    clearInterval(this.scrollInterval);
  }

  generateStars() {
    for (let i = 0; i < 100; i++) {
      this.stars.push({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 3,
        delay: Math.random() * 5,
        opacity: Math.random()
      });
    }
  }

 startAutoScroll() {
  this.scrollInterval = setInterval(() => {
    if (!this.isPaused && this.carousel) {
      const el = this.carousel.nativeElement;
      el.scrollBy({ left: 450, behavior: 'smooth' }); // Scroll 1 card width

      // Reset to beginning for infinite loop
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollTo({ left: 0, behavior: 'auto' });
      }
    }
  }, 2000); // ⏱️ Every 3 seconds
}


  pauseAutoScroll() {
    this.isPaused = true;
  }

  resumeAutoScroll() {
    this.isPaused = false;
  }
}
