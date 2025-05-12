import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { trigger, transition, style, animate, state } from "@angular/animations"
import { ScrollAnimationDirective } from "../../directives/scroll-animation.directive"

@Component({
  selector: "app-cta-section",
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective],
  templateUrl: "./cta-section.component.html",
  styleUrls: ["./cta-section.component.scss"],
  animations: [
    trigger("fadeInUp", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(30px)" }),
        animate("800ms ease-out", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
    ]),
    trigger("rocketAnimation", [
      state("start", style({ transform: "rotate(0deg)" })),
      state("end", style({ transform: "rotate(20deg)" })),
      transition("start <=> end", animate("2000ms ease-in-out")),
    ]),
  ],
})
export class CtaSectionComponent {
  rocketState = "start"

  ngOnInit() {
    setInterval(() => {
      this.rocketState = this.rocketState === "start" ? "end" : "start"
    }, 2000)
  }
}
