// src/app/components/services-section/services-section.component.ts
import { Component, AfterViewInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { trigger, transition, style, animate, query, stagger } from "@angular/animations";
import { ScrollAnimationDirective } from "../../directives/scroll-animation.directive";
import { HeadingComponent } from "../heading/heading.component";
import AOS from "aos";

interface Service {
  icon: string;
  title: string;
  description: string;
  content: string;
  color: string;
}

@Component({
  selector: "app-services-section",
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective, HeadingComponent],
  templateUrl: "./services-section.component.html",
  styleUrls: ["./services-section.component.scss"],
  animations: [
    trigger("fadeInUp", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(30px)" }),
        animate("800ms ease-out", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
    ]),
    trigger("staggerFadeIn", [
      transition(":enter", [
        query(
          ":enter",
          [
            style({ opacity: 0, transform: "translateY(30px)" }),
            stagger("100ms", [
              animate("800ms ease-out", style({ opacity: 1, transform: "translateY(0)" }))
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class ServicesSectionComponent implements AfterViewInit {
  services: Service[] = [
    {
      icon: "globe",
      title: "SEO Optimization",
      description: "Boost your rankings with modern SEO techniques.",
      content: "We improve your visibility on search engines using keyword strategy, backlinks, and performance audits.",
      color: "purple",
    },
    {
      icon: "code",
      title: "Website Development",
      description: "Build custom, scalable, high-performance sites.",
      content: "Our developers craft fast, responsive websites tailored to your business needs and brand identity.",
      color: "indigo",
    },
    {
      icon: "layers",
      title: "Social Media Marketing",
      description: "Grow your brand with strategic social campaigns.",
      content: "From content to ads, we manage and scale your social media presence across platforms effectively.",
      color: "blue",
    },
    {
      icon: "globe",
      title: "E-commerce Management",
      description: "Manage and scale your online store with ease.",
      content: "We provide complete setup, product management, and sales optimization for your e-commerce business.",
      color: "purple",
    },
    {
      icon: "layers",
      title: "Creative Imaging",
      description: "Visual storytelling through stunning designs.",
      content: "We produce captivating graphics, visuals, and brand assets to leave a lasting impression.",
      color: "indigo",
    },
  ];

  get hasServices(): boolean {
  return this.services.length > 0;
}


  ngAfterViewInit(): void {
    AOS.init({ duration: 800, once: true });
  }
}
