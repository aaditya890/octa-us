import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-floating-elements',
  standalone: true,
  imports: [],
  templateUrl: './floating-elements.component.html',
  styleUrl: './floating-elements.component.scss'
})
export class FloatingElementsComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private circles: any[] = [];
  private circleCount = 50;

  ngOnInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
    this.createCircles();
    this.animate();

    window.addEventListener('resize', () => {
      this.resizeCanvas();
      this.createCircles();
    });
  }

  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  private createCircles(): void {
    const canvas = this.canvasRef.nativeElement;
    this.circles = [];

    for (let i = 0; i < this.circleCount; i++) {
      const radius = Math.random() * 5 + 3; // small circles
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const dx = (Math.random() - 0.5) * 0.5;
      const dy = (Math.random() - 0.5) * 0.5;
      const opacity = Math.random() * 0.4 + 0.9;

      this.circles.push({ x, y, dx, dy, radius, opacity });
    }
  }

  private animate(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let circle of this.circles) {
      circle.x += circle.dx;
      circle.y += circle.dy;

      if (circle.x < 0 || circle.x > canvas.width) circle.dx *= -1;
      if (circle.y < 0 || circle.y > canvas.height) circle.dy *= -1;

      this.drawCircle(circle.x, circle.y, circle.radius, circle.opacity);
    }

    requestAnimationFrame(() => this.animate());
  }

  private drawCircle(x: number, y: number, radius: number, opacity: number): void {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`; // gray
    this.ctx.fill();
  }
}
