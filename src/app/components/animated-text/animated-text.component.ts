import { Component, Input, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { trigger, transition, style, animate } from "@angular/animations"

@Component({
  selector: "app-animated-text",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overflow-hidden" [ngClass]="class">
      <span *ngFor="let word of words; let i = index" 
            class="inline-block mr-1"
            [@wordAnimation]="{ value: '', params: { delay: i * 120 } }">
        {{ word }}
      </span>
    </div>
  `,
  styles: [
    `
    :host {
      display: block;
    }
  `,
  ],
  animations: [
    trigger("wordAnimation", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(20px)" }),
        animate("600ms {{delay}}ms ease-out", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
    ]),
  ],
})
export class AnimatedTextComponent implements OnInit {
  @Input() text = ""
  @Input() class = ""

  words: string[] = []

  ngOnInit(): void {
    this.words = this.text.split(" ")
  }
}
