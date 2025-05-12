import { Injectable } from "@angular/core"

@Injectable({
  providedIn: "root",
})
export class IntersectionObserverService {
  createObserver(
    element: HTMLElement,
    callback: IntersectionObserverCallback,
    options: IntersectionObserverInit = { threshold: 0.1 },
  ): IntersectionObserver {
    const observer = new IntersectionObserver(callback, options)
    observer.observe(element)
    return observer
  }
}
