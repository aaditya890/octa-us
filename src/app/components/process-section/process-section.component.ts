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
  steps: ProcessStep[] = [
    {
      number: 1,
      title: "Discovery",
      description: "We start by understanding your business, goals, target audience, and project requirements.",
      color: "purple",
      align: "right",
      image: "assets/images/discovery.jpg",
    },
    {
      number: 2,
      title: "Planning & Design",
      description: "We create wireframes and design mockups that align with your brand and project objectives.",
      color: "blue",
      align: "left",
      image: "assets/images/planning.jpg",
    },
    {
      number: 3,
      title: "Development",
      description:
        "Our developers bring the designs to life, creating a functional, responsive, and optimized website.",
      color: "indigo",
      align: "right",
      image: "assets/images/development.jpg",
    },
    {
      number: 4,
      title: "Launch & Support",
      description: "After thorough testing, we launch your site and provide ongoing support and maintenance.",
      color: "purple",
      align: "left",
      image: "assets/images/launch.jpg",
    },
  ]
}
