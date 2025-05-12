import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingElementsComponent } from './floating-elements.component';

describe('FloatingElementsComponent', () => {
  let component: FloatingElementsComponent;
  let fixture: ComponentFixture<FloatingElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatingElementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FloatingElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
