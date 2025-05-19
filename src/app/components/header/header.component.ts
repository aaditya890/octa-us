import { Component, HostListener } from "@angular/core";
import { CommonModule } from "@angular/common";
import { trigger, transition, style, animate } from "@angular/animations";
import { ScrollService } from "../../services/scroll.service";

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

  constructor(private scrollService: ScrollService) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  scrollToSection(id: string) {
    this.scrollService.scrollToAnchor(id);
  }

  scrollAndClose(id: string) {
    this.scrollToSection(id);
    this.closeMenu();
  }
}
