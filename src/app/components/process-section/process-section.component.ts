import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { trigger, transition, style, animate } from "@angular/animations"
import { ScrollAnimationDirective } from "../../directives/scroll-animation.directive"

interface ProcessStep {
  number: number
  title: string
  description: string
  color: string
  align: "left" | "right"
  image: string
}

@Component({
  selector: "app-process-section",
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective],
  templateUrl: "./process-section.component.html",
  styleUrls: ["./process-section.component.scss"],
  animations: [
    trigger("fadeInUp", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(30px)" }),
        animate("800ms ease-out", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
    ]),
  ],
})
export class ProcessSectionComponent {
  steps = [
    {
      number: 1,
      title: 'Research & Planning',
      description: 'We begin with deep research and detailed planning to align with your brand goals.',
      image: 'https://dummyimage.com/600x400/000/fff',
      align: 'left',
      color: 'yellow',
    },
    {
      number: 2,
      title: 'Design & Build',
      description: '	We design eye-catching visuals and build websites or creatives that work perfectly.',
      image: 'https://dummyimage.com/600x400/000/fff',
      align: 'right',
      color: 'yellow',
    },
    {
      number: 3,
      title: 'Promote & Manage',
      description: 'We run campaigns on Google, social media, and more — and manage everything smoothly.',
      image: 'https://dummyimage.com/600x400/000/fff',
      align: 'left',
      color: 'yellow',
    },
    {
      number: 4,
      title: 'Grow & Support',
      description: '	We track results, improve performance, and support you as you grow.',
      image: 'https://dummyimage.com/600x400/000/fff',
      align: 'right',
      color: 'yellow',
    },
  ];
}

