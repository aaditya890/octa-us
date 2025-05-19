import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  scrollToAnchor(anchorId: string) {
    const el = document.getElementById(anchorId);
    if (el) {
      const offset = -80; // Adjust if navbar is fixed
      const y = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
}
