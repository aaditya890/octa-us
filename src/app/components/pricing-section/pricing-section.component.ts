import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { trigger, transition, style, animate } from "@angular/animations"
import { ScrollAnimationDirective } from "../../directives/scroll-animation.directive"

interface PricingPlan {
  title: string
  description: string
  price: string
  features: string[]
  popular: boolean
  color: string
}

@Component({
  selector: "app-pricing-section",
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective],
  templateUrl: "./pricing-section.component.html",
  styleUrls: ["./pricing-section.component.scss"],
  animations: [
    trigger("fadeInUp", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(30px)" }),
        animate("800ms ease-out", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
    ]),
    trigger("featureAnimation", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateX(-10px)" }),
        animate("500ms {{delay}}ms ease-out", style({ opacity: 1, transform: "translateX(0)" })),
      ]),
    ]),
  ],
})
export class PricingSectionComponent {
  plans: PricingPlan[] = [
    {
      title: "Basic",
      description: "Perfect for small businesses",
      price: "$999",
      features: [
        "5-page responsive website",
        "Basic SEO optimization",
        "Contact form",
        "Mobile responsive design",
        "1 month of support",
      ],
      popular: false,
      color: "purple",
    },
    {
      title: "Professional",
      description: "For growing businesses",
      price: "$2,499",
      features: [
        "10-page custom website",
        "Advanced SEO optimization",
        "Content management system",
        "Blog setup",
        "Social media integration",
        "3 months of support",
      ],
      popular: true,
      color: "blue",
    },
    {
      title: "Enterprise",
      description: "For large businesses",
      price: "$4,999",
      features: [
        "Unlimited pages",
        "E-commerce functionality",
        "Custom animations",
        "Advanced analytics",
        "Priority support",
        "6 months of support",
      ],
      popular: false,
      color: "purple",
    },
  ]
}
