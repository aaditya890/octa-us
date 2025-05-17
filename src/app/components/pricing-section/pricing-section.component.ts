import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { trigger, transition, style, animate } from "@angular/animations"
import { ScrollAnimationDirective } from "../../directives/scroll-animation.directive"

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  quote: string;
}

@Component({
  selector: "app-pricing-section",
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective],
  templateUrl: "./pricing-section.component.html",
  styleUrls: ["./pricing-section.component.scss"],
  animations: [
    trigger('slideAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class PricingSectionComponent {
topRowTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Rohit Sharma',
    role: 'SEO Specialist',
    company: 'at Local Biz Boost',
    image: 'https://i.pravatar.cc/150?img=11',
    rating: 5,
    quote: 'OctaTech helped me master keyword research and technical SEO. Our local business now ranks #1 in Google!'
  },
  {
    id: 2,
    name: 'Anjali Mehta',
    role: 'Website Designer',
    company: 'Freelancer',
    image: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    quote: 'Their design system and Figma guides made me 3x faster at building stunning websites. Highly recommended!'
  },
  {
    id: 3,
    name: 'Kunal Verma',
    role: 'Marketing Executive',
    company: 'at Startup India',
    image: 'https://i.pravatar.cc/150?img=13',
    rating: 5,
    quote: 'From email funnels to Google Ads, OctaTech gave me full-stack marketing skills that deliver real ROI.'
  },
  {
    id: 4,
    name: 'Sneha Patil',
    role: 'Brand Consultant',
    company: '',
    image: 'https://i.pravatar.cc/150?img=14',
    rating: 5,
    quote: 'The content-first strategy from OctaTech completely changed how I pitch brands. My clients love the clarity!'
  },
  {
    id: 5,
    name: 'Nitesh Gupta',
    role: 'Freelance Image Editor',
    company: '',
    image: 'https://i.pravatar.cc/150?img=15',
    rating: 5,
    quote: 'Thanks to OctaTech’s imaging module, I now deliver optimized visuals that actually convert!'
  },
  {
    id: 6,
    name: 'Divya Kapoor',
    role: 'Social Media Specialist',
    company: 'at Fashion Brand',
    image: 'https://i.pravatar.cc/150?img=16',
    rating: 5,
    quote: 'We turned our Instagram page into a lead engine with OctaTech’s real-world strategies.'
  }
];


  bottomRowTestimonials: Testimonial[] = [
  {
    id: 7,
    name: 'Abhishek Rana',
    role: 'WordPress Developer',
    company: '',
    image: 'https://i.pravatar.cc/150?img=17',
    rating: 5,
    quote: 'OctaTech taught me how to create dynamic WordPress sites that clients love — no bloated plugins needed!'
  },
  {
    id: 8,
    name: 'Ishita Sen',
    role: 'Performance Marketer',
    company: 'at D2C Startup',
    image: 'https://i.pravatar.cc/150?img=18',
    rating: 5,
    quote: 'After OctaTech, I run A/B tests, track ROAS, and scale Meta ads like a pro. Finally, marketing makes sense!'
  },
  {
    id: 9,
    name: 'Farhan Ali',
    role: 'Email Copywriter',
    company: '',
    image: 'https://i.pravatar.cc/150?img=19',
    rating: 5,
    quote: 'Their email marketing insights helped me boost open rates by 40% and land high-paying clients.'
  },
  {
    id: 10,
    name: 'Ritika Jain',
    role: 'Content Strategist',
    company: '',
    image: 'https://i.pravatar.cc/150?img=20',
    rating: 5,
    quote: 'OctaTech helped me turn my blog into a funnel. I now drive leads with storytelling, not guesswork.'
  },
  {
    id: 11,
    name: 'Sameer Desai',
    role: 'Landing Page Expert',
    company: '',
    image: 'https://i.pravatar.cc/150?img=21',
    rating: 5,
    quote: 'Their UX tips, CTA positioning, and CRO hacks turned my pages into money machines.'
  },
  {
    id: 12,
    name: 'Megha Thakur',
    role: 'Analytics Consultant',
    company: '',
    image: 'https://i.pravatar.cc/150?img=22',
    rating: 5,
    quote: 'I learned GA4, heatmaps, and behavior flows — OctaTech gave me the edge in data storytelling.'
  }
];


  constructor() {}

  ngOnInit(): void {
    this.startAutoScroll();
  }

  startAutoScroll(): void {
    setInterval(() => {
      // Move first testimonial to end for top row (left to right)
      const firstTopTestimonial = this.topRowTestimonials.shift();
      if (firstTopTestimonial) {
        this.topRowTestimonials.push(firstTopTestimonial);
      }

      // Move last testimonial to beginning for bottom row (right to left)
      const lastBottomTestimonial = this.bottomRowTestimonials.pop();
      if (lastBottomTestimonial) {
        this.bottomRowTestimonials.unshift(lastBottomTestimonial);
      }
    }, 3000);
  }

  getStarArray(rating: number): number[] {
    return Array(rating).fill(0).map((_, i) => i);
  }
}
