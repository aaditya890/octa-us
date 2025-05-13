import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntoSectionComponent } from './into-section.component';

describe('IntoSectionComponent', () => {
  let component: IntoSectionComponent;
  let fixture: ComponentFixture<IntoSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntoSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntoSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
