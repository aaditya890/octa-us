import { Component, Input, OnInit, OnDestroy, ElementRef, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-typed-text',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="typed-wrapper">
      {{ displayText }}
    </span>
  `,
  styles: [`
    :host {
      display: inline-block;
      vertical-align: bottom;
      overflow: visible;
      line-height: 1.2;
    }
    .typed-wrapper {
      display: inline-block;
      line-height: 1.2;
      overflow: visible;
      vertical-align: bottom;
    }
  `]
})
export class TypedTextComponent implements OnInit, OnDestroy {
  @Input() texts: string[] = [];
  @Input() typingSpeed = 100;
  @Input() deletingSpeed = 50;
  
  @Input() delayBetweenTexts = 2000;

  displayText = '';
  private currentIndex = 0;
  private isDeleting = false;
  private timeout: any;
  private observer!: IntersectionObserver;
  private isPaused = false;

  constructor(
    private elRef: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.observeHeroSection();
    this.startTyping();
  }

  ngOnDestroy(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }

 @Input() shouldType = true; // Receive from parent

private startTyping(): void {
  if (!this.shouldType) {
    this.timeout = setTimeout(() => this.startTyping(), 200);
    return;
  }

  const currentText = this.texts[this.currentIndex];
  const currentLength = this.displayText.length;

  if (this.isDeleting) {
    this.displayText = currentText.substring(0, currentLength - 1);
  } else {
    this.displayText = currentText.substring(0, currentLength + 1);
  }

  let typingSpeed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;

  if (!this.isDeleting && this.displayText === currentText) {
    typingSpeed = this.delayBetweenTexts;
    this.isDeleting = true;
  } else if (this.isDeleting && this.displayText === '') {
    this.isDeleting = false;
    this.currentIndex = (this.currentIndex + 1) % this.texts.length;
  }

  this.timeout = setTimeout(() => this.startTyping(), typingSpeed);
}



  private observeHeroSection(): void {
    const heroSection = this.document.querySelector('#heroSection');
    if (!heroSection || window.innerWidth >= 1024) return; // only apply for < lg

    this.observer = new IntersectionObserver(
      ([entry]) => {
        this.isPaused = !entry.isIntersecting;
      },
      { threshold: 0.2 }
    );

    this.observer.observe(heroSection);
  }
}
