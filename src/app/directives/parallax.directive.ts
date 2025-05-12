import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from "@angular/core"

@Directive({
  selector: "[appParallax]",
  standalone: true,
})
export class ParallaxDirective implements OnInit {
  @Input() ratio = 0.1
  private initialTop = 0
  private element: HTMLElement

  constructor(
    public el: ElementRef,
    private renderer: Renderer2,
  ) {
    this.element = el.nativeElement
  }

  ngOnInit() {
    this.initialTop = this.element.getBoundingClientRect().top
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    const scrollPosition = window.scrollY
    const elementPosition = this.initialTop - window.innerHeight

    if (scrollPosition >= elementPosition) {
      const distance = scrollPosition - elementPosition
      const translation = distance * this.ratio

      this.renderer.setStyle(this.element, "transform", `translateY(${-translation}px)`)
    }
  }
}
