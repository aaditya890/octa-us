import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { trigger, transition, style, animate } from "@angular/animations"

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
  animations: [
    trigger("fadeInUp", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(20px)" }),
        animate("500ms ease-out", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
    ]),
    trigger("rotate", [
      transition(":enter", [
        style({ transform: "rotate(0deg)" }),
        animate("20s linear", style({ transform: "rotate(360deg)" })),
      ]),
    ]),
  ],
})
export class FooterComponent {
  currentYear = new Date().getFullYear()
}
