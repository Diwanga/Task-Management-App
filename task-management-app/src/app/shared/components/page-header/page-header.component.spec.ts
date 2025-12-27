// import { ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { PageHeaderComponent } from './page-header.component';
//
// describe('PageHeaderComponent', () => {
//   let component: PageHeaderComponent;
//   let fixture: ComponentFixture<PageHeaderComponent>;
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ PageHeaderComponent ]
//     })
//     .compileComponents();
//   });
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(PageHeaderComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PageHeaderComponent } from './page-header.component';

describe('PageHeaderComponent', () => {
  let component: PageHeaderComponent;
  let fixture: ComponentFixture<PageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageHeaderComponent ],
      imports: [ MatIconModule, MatButtonModule ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title', () => {
    component.title = 'Test Title';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.page-title').textContent).toContain('Test Title');
  });

  it('should display subtitle when provided', () => {
    component.subtitle = 'Test Subtitle';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.page-subtitle').textContent).toContain('Test Subtitle');
  });

  it('should not display subtitle when not provided', () => {
    component.subtitle = '';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.page-subtitle')).toBeNull();
  });

  it('should show back button when showBackButton is true', () => {
    component.showBackButton = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.back-button')).toBeTruthy();
  });

  it('should not show back button when showBackButton is false', () => {
    component.showBackButton = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.back-button')).toBeNull();
  });

  it('should emit backClick event when back button is clicked', () => {
    spyOn(component.backClick, 'emit');
    component.showBackButton = true;
    fixture.detectChanges();

    const backButton = fixture.nativeElement.querySelector('.back-button');
    backButton.click();

    expect(component.backClick.emit).toHaveBeenCalled();
  });
});
