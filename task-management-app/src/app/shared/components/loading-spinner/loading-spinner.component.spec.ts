// import { ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { LoadingSpinnerComponent } from './loading-spinner.component';
//
// describe('LoadingSpinnerComponent', () => {
//   let component: LoadingSpinnerComponent;
//   let fixture: ComponentFixture<LoadingSpinnerComponent>;
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ LoadingSpinnerComponent ]
//     })
//     .compileComponents();
//   });
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(LoadingSpinnerComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingSpinnerComponent } from './loading-spinner.component';

describe('LoadingSpinnerComponent', () => {
  let component: LoadingSpinnerComponent;
  let fixture: ComponentFixture<LoadingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingSpinnerComponent ],
      imports: [ MatProgressSpinnerModule ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display default message', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.loading-message').textContent).toContain('Loading...');
  });

  it('should display custom message', () => {
    component.message = 'Custom loading message';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.loading-message').textContent).toContain('Custom loading message');
  });

  it('should return correct diameter for small size', () => {
    component.size = 'small';
    expect(component.getSpinnerDiameter()).toBe(30);
  });

  it('should return correct diameter for medium size', () => {
    component.size = 'medium';
    expect(component.getSpinnerDiameter()).toBe(50);
  });

  it('should return correct diameter for large size', () => {
    component.size = 'large';
    expect(component.getSpinnerDiameter()).toBe(80);
  });

  it('should add overlay class when overlay is true', () => {
    component.overlay = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.loading-container').classList.contains('overlay')).toBe(true);
  });
});
