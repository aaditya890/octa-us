import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import Aos from 'aos';


@Component({
  selector: 'app-into-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './into-section.component.html',
  styleUrl: './into-section.component.scss'
})
export class IntoSectionComponent {
  projects = 0;
  brands = 0;
  websites = 0;

  images = [
    'https://dummyimage.com/600x400/000/fff&text=slide+1',
    'https://dummyimage.com/600x400/000/fff&text=slide+2',
    'https://dummyimage.com/600x400/000/fff&text=slide+3'
  ];
  currentImage = 0;

  ngOnInit(): void {
     Aos.init({
    duration: 1000,        // smoother duration (ms)
    easing: 'ease-in-out', // softer motion
    once: true,            // animate only once when in view
    delay: 100,            // slight delay to feel natural
    offset: 120            // trigger slightly before visible
  });
  setInterval(() => this.nextImage(), 5000);
    this.animateCounters();
    setInterval(() => this.nextImage(), 5000); // Auto-slide every 5s
  }

  animateCounters() {
    this.countUp('projects', 300);
    this.countUp('brands', 180);
    this.countUp('websites', 200);
  }

  countUp(prop: 'projects' | 'brands' | 'websites', target: number) {
    let count = 0;
    const interval = setInterval(() => {
      if (count >= target) {
        clearInterval(interval);
      } else {
        count++;
        this[prop] = count;
      }
    }, 20); // Adjust speed
  }

  nextImage() {
    this.currentImage = (this.currentImage + 1) % this.images.length;
  }

  changeImage(index: number) {
    this.currentImage = index;
  }
}
