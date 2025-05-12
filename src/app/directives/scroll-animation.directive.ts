import { Directive, ElementRef, type OnInit, type OnDestroy } from "@angular/core"
import { IntersectionObserverService } from "../services/intersection-observer.service"
import { trigger, transition, style, animate, state } from "@angular/animations"
@Directive({
  selector: "[scrollAnimation]",
  standalone: true,
})
export class ScrollAnimationDirective implements OnInit, OnDestroy {
  private observer: IntersectionObserver | null = null

  constructor(private el: ElementRef,private intersectionObserverService: IntersectionObserverService) {}

  ngOnInit() {
    this.observer = this.intersectionObserverService.createObserver(this.el.nativeElement, (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated")
        }
      })
    })
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect()
    }
  }
}
