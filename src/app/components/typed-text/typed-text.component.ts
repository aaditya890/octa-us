// src/app/components/typed-text/typed-text.component.ts
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  
  ngOnInit(): void {
    this.startTyping();
  }

  ngOnDestroy(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  private startTyping(): void {
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
}
