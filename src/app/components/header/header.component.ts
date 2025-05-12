import { Component, HostListener } from "@angular/core"
import { CommonModule } from "@angular/common"
import { trigger, transition, style, animate } from "@angular/animations"

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  animations: [
    trigger("mobileMenu", [
      transition(":enter", [
        style({ height: 0, opacity: 0 }),
        animate("300ms ease-out", style({ height: "*", opacity: 1 })),
      ]),
      transition(":leave", [
        style({ height: "*", opacity: 1 }),
        animate("300ms ease-in", style({ height: 0, opacity: 0 })),
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
export class HeaderComponent {
  isMenuOpen = false;

toggleMenu() {
  this.isMenuOpen = !this.isMenuOpen;
}

closeMenu() {
  this.isMenuOpen = false;
}


  @HostListener("window:scroll", [])
  onWindowScroll() {
    // You can add scroll effects for the header here if needed
  }
}
