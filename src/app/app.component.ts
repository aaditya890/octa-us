import { Component, type OnInit, type AfterViewInit, type ElementRef, ViewChild, HostListener } from "@angular/core"
import { HeaderComponent } from "./components/header/header.component"
import { HeroSectionComponent } from "./components/hero-section/hero-section.component"
import { ServicesSectionComponent } from "./components/services-section/services-section.component"
import { WorkSectionComponent } from "./components/work-section/work-section.component"
import { ProcessSectionComponent } from "./components/process-section/process-section.component"
import { PricingSectionComponent } from "./components/pricing-section/pricing-section.component"
import { CtaSectionComponent } from "./components/cta-section/cta-section.component"
import { FooterComponent } from "./components/footer/footer.component"
import { IntoSectionComponent } from "./components/into-section/into-section.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    // RouterOutlet,
    HeaderComponent,
    HeroSectionComponent,
    ServicesSectionComponent,
    WorkSectionComponent,
    ProcessSectionComponent,
    PricingSectionComponent,
    CtaSectionComponent,
    FooterComponent,
    IntoSectionComponent
],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'OctaUs'
  @ViewChild("canvas", { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>

  private ctx!: CanvasRenderingContext2D
  private particles: any[] = []
  private animationFrameId = 0

  constructor() {}

  ngOnInit(): void {
    // Initialize any data or services
  }

  ngAfterViewInit(): void {
    this.initCanvas()
  }

  @HostListener("window:resize")
  onResize(): void {
    if (this.canvasRef && this.canvasRef.nativeElement) {
      this.canvasRef.nativeElement.width = window.innerWidth
      this.canvasRef.nativeElement.height = window.innerHeight
      this.particles = []
      this.createParticles()
    }
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement
    this.ctx = canvas.getContext("2d")!

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    this.createParticles()
    this.animate()
  }

  private createParticles(): void {
    const canvas = this.canvasRef.nativeElement
    const particleCount = Math.floor(window.innerWidth / 8)

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: `rgba(${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(
          Math.random() * 100 + 100,
        )}, ${Math.floor(Math.random() * 255)}, 1)`,
        opacity: Math.random() * 0.5 + 0.5,
        pulse: 0,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      })
    }
  }

  private connectParticles(): void {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x
        const dy = this.particles[i].y - this.particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 120) {
          this.ctx.beginPath()
          this.ctx.strokeStyle = `rgba(120, 120, 255, ${0.3 - distance / 400})`
          this.ctx.lineWidth = 0.6
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y)
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y)
          this.ctx.stroke()
        }
      }
    }
  }

  private animate(): void {
    this.animationFrameId = requestAnimationFrame(() => this.animate())
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height)

    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].x += this.particles[i].speedX
      this.particles[i].y += this.particles[i].speedY

      // Pulsating effect
      this.particles[i].pulse += this.particles[i].pulseSpeed
      const pulseFactor = Math.sin(this.particles[i].pulse) * 0.5 + 0.5
      const currentSize = this.particles[i].size * (0.8 + pulseFactor * 0.4)
      const currentOpacity = this.particles[i].opacity * (0.7 + pulseFactor * 0.3)

      if (this.particles[i].x > this.canvasRef.nativeElement.width || this.particles[i].x < 0) {
        this.particles[i].speedX = -this.particles[i].speedX
      }

      if (this.particles[i].y > this.canvasRef.nativeElement.height || this.particles[i].y < 0) {
        this.particles[i].speedY = -this.particles[i].speedY
      }

      this.ctx.beginPath()
      this.ctx.arc(this.particles[i].x, this.particles[i].y, currentSize, 0, Math.PI * 2)

      // Create a gradient for each particle
      const gradient = this.ctx.createRadialGradient(
        this.particles[i].x,
        this.particles[i].y,
        0,
        this.particles[i].x,
        this.particles[i].y,
        currentSize * 2,
      )
      gradient.addColorStop(0, this.particles[i].color.replace("1)", `${currentOpacity})`))
      gradient.addColorStop(1, this.particles[i].color.replace("1)", "0)"))

      this.ctx.fillStyle = gradient
      this.ctx.fill()
    }

    this.connectParticles()
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId)
    }
  }
}
