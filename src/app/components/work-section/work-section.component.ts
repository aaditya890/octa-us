import { Component } from "@angular/core"
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
  projects: Project[] = [
    {
      title: "E-commerce Platform",
      category: "Web Development",
      image: "assets/videos/keyboard.mp4",
      type: "video",
    },
    {
      title: "Corporate Website",
      category: "UI/UX Design",
      image: "assets/images/project-2.jpg",
      type: "image",
    },
    {
      title: "Mobile App",
      category: "App Development",
      image: "assets/videos/smartphone.mp4",
      type: "video",
    },
    {
      title: "SaaS Dashboard",
      category: "Web Application",
      image: "assets/images/project-4.jpg",
      type: "image",
    },
    {
      title: "Brand Identity",
      category: "Branding",
      image: "assets/images/project-5.jpg",
      type: "image",
    },
    {
      title: "Marketing Website",
      category: "Web Development",
      image: "assets/videos/laptop.mp4",
      type: "video",
    },
  ]
}
